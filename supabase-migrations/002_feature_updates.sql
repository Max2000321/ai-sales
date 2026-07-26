-- Feature 1: chat auto-tagging & insights
alter table conversations add column if not exists tags text[] not null default '{}';
alter table conversations add column if not exists lead_score int;
alter table conversations add column if not exists ai_summary jsonb;
alter table conversations add column if not exists tagged_at timestamptz;

-- Feature 2: dynamic AI persona (tone + proactive scenarios)
alter table agents add column if not exists ai_tone text not null default 'warm';
alter table agents add column if not exists ai_scenarios jsonb not null default '[]';

-- Feature 3: post-care recovery check-ins
create table if not exists recovery_checkins (
  id uuid primary key default gen_random_uuid(),
  agent_id uuid references agents(id) on delete cascade not null,
  conversation_id uuid references conversations(id) on delete set null,
  patient_name text not null,
  patient_phone text not null,
  procedure text not null,
  checkin_stage text not null check (checkin_stage in ('4h', '24h')),
  scheduled_for timestamptz not null,
  sent_at timestamptz,
  status text not null default 'pending'
    check (status in ('pending', 'sent', 'feeling_great', 'mild_pain', 'request_doctor')),
  responded_at timestamptz,
  acknowledged_at timestamptz,
  created_at timestamptz default now()
);

alter table recovery_checkins enable row level security;

create policy "Users manage own recovery checkins" on recovery_checkins
  for all using (agent_id in (select id from agents where user_id = auth.uid()));

-- The WhatsApp webhook (no user session) needs to insert scheduled check-ins
-- and update status from patient replies via the service-role key, which
-- already bypasses RLS — these policies only cover the anon/authenticated path.
create index if not exists recovery_checkins_due_idx on recovery_checkins (status, scheduled_for) where status = 'pending';
create index if not exists recovery_checkins_phone_idx on recovery_checkins (patient_phone, status);
