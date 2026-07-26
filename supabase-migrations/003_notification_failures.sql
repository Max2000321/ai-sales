-- Durable log for transactional emails (Resend) that failed to send, so a
-- lead can never silently disappear even when the provider errors or
-- misconfiguration (missing API key, unverified domain, etc.) blocks delivery.
create table if not exists notification_failures (
  id uuid primary key default gen_random_uuid(),
  kind text not null, -- 'chat_lead' | 'lead_form' | 'contact_form'
  agent_id uuid references agents(id) on delete set null,
  recipient text,
  subject text,
  payload jsonb,
  error text not null,
  created_at timestamptz not null default now(),
  acknowledged_at timestamptz
);

alter table notification_failures enable row level security;

-- Only failures tied to one of the user's own agents (chat leads) are
-- visible client-side. Marketing-site leads (contact/lead forms, agent_id
-- null) have no owning clinic and are intentionally left admin-only —
-- readable solely via the service-role key, never exposed to a customer.
create policy "Users view own agents' notification failures" on notification_failures
  for select using (agent_id in (select id from agents where user_id = auth.uid()));

create policy "Users acknowledge own agents' notification failures" on notification_failures
  for update using (agent_id in (select id from agents where user_id = auth.uid()));

create index if not exists notification_failures_unacked_idx on notification_failures (agent_id, created_at) where acknowledged_at is null;
