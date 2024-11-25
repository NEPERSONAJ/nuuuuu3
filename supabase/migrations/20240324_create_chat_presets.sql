create table public.chat_presets (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  system_prompt text not null
);

-- Enable RLS
alter table public.chat_presets enable row level security;

-- Create policies
create policy "Users can create their own presets"
  on public.chat_presets
  for insert
  with check (auth.uid() = user_id);

create policy "Users can view their own presets"
  on public.chat_presets
  for select
  using (auth.uid() = user_id);

create policy "Users can update their own presets"
  on public.chat_presets
  for update
  using (auth.uid() = user_id);

create policy "Users can delete their own presets"
  on public.chat_presets
  for delete
  using (auth.uid() = user_id);

-- Create indexes
create index chat_presets_user_id_idx on public.chat_presets(user_id);
create index chat_presets_created_at_idx on public.chat_presets(created_at desc);