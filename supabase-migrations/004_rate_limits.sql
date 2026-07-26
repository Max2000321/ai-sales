-- Fixed-window rate limiting, backed by Postgres so no extra infra (Upstash/
-- Redis) is needed. check_rate_limit() does the read-increment-compare in a
-- single atomic UPSERT to avoid race conditions between concurrent requests.
create table if not exists rate_limits (
  key text primary key,
  count int not null default 1,
  window_start timestamptz not null default now()
);

create or replace function check_rate_limit(p_key text, p_window_seconds int, p_max_requests int)
returns boolean
language plpgsql
as $$
declare
  v_count int;
begin
  insert into rate_limits (key, count, window_start)
  values (p_key, 1, now())
  on conflict (key) do update
    set count = case
        when rate_limits.window_start < now() - (p_window_seconds || ' seconds')::interval
          then 1
        else rate_limits.count + 1
      end,
      window_start = case
        when rate_limits.window_start < now() - (p_window_seconds || ' seconds')::interval
          then now()
        else rate_limits.window_start
      end
  returning count into v_count;

  return v_count <= p_max_requests;
end;
$$;
