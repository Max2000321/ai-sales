-- Agents (one per company/user)
create table agents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  description text,
  system_prompt text not null default 'Ты — AI-ассистент по продажам. Помогай клиентам, отвечай на вопросы и направляй к покупке.',
  widget_color text not null default '#6366f1',
  created_at timestamptz default now()
);

-- Knowledge base chunks
create table knowledge_chunks (
  id uuid primary key default gen_random_uuid(),
  agent_id uuid references agents(id) on delete cascade not null,
  source_name text not null,
  content text not null,
  created_at timestamptz default now()
);

-- Conversations
create table conversations (
  id uuid primary key default gen_random_uuid(),
  agent_id uuid references agents(id) on delete cascade not null,
  visitor_id text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Messages
create table messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references conversations(id) on delete cascade not null,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamptz default now()
);

-- RLS policies
alter table agents enable row level security;
alter table knowledge_chunks enable row level security;
alter table conversations enable row level security;
alter table messages enable row level security;

create policy "Users manage own agents" on agents
  for all using (auth.uid() = user_id);

create policy "Users manage own knowledge" on knowledge_chunks
  for all using (
    agent_id in (select id from agents where user_id = auth.uid())
  );

create policy "Public can read knowledge" on knowledge_chunks
  for select using (true);

create policy "Public can insert conversations" on conversations
  for insert with check (true);

create policy "Users read own conversations" on conversations
  for select using (
    agent_id in (select id from agents where user_id = auth.uid())
  );

create policy "Public can manage messages" on messages
  for all using (true);

create policy "Public can read agents" on agents
  for select using (true);
