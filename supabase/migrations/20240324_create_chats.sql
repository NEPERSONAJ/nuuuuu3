create table public.chats (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  is_expanded boolean default false not null
);

create table public.chat_messages (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  chat_id uuid references public.chats(id) on delete cascade not null,
  role text not null check (role in ('user', 'assistant')),
  content text not null
);

-- Enable RLS
alter table public.chats enable row level security;
alter table public.chat_messages enable row level security;

-- Create policies for chats
create policy "Users can create their own chats"
  on public.chats
  for insert
  with check (auth.uid() = user_id);

create policy "Users can view their own chats"
  on public.chats
  for select
  using (auth.uid() = user_id);

create policy "Users can update their own chats"
  on public.chats
  for update
  using (auth.uid() = user_id);

create policy "Users can delete their own chats"
  on public.chats
  for delete
  using (auth.uid() = user_id);

-- Create policies for chat messages
create policy "Users can create messages in their chats"
  on public.chat_messages
  for insert
  with check (
    exists (
      select 1 from public.chats
      where id = chat_messages.chat_id
      and user_id = auth.uid()
    )
  );

create policy "Users can view messages in their chats"
  on public.chat_messages
  for select
  using (
    exists (
      select 1 from public.chats
      where id = chat_messages.chat_id
      and user_id = auth.uid()
    )
  );

create policy "Users can update messages in their chats"
  on public.chat_messages
  for update
  using (
    exists (
      select 1 from public.chats
      where id = chat_messages.chat_id
      and user_id = auth.uid()
    )
  );

create policy "Users can delete messages in their chats"
  on public.chat_messages
  for delete
  using (
    exists (
      select 1 from public.chats
      where id = chat_messages.chat_id
      and user_id = auth.uid()
    )
  );

-- Create indexes
create index chats_user_id_idx on public.chats(user_id);
create index chats_created_at_idx on public.chats(created_at desc);
create index chat_messages_chat_id_idx on public.chat_messages(chat_id);
create index chat_messages_created_at_idx on public.chat_messages(created_at desc);