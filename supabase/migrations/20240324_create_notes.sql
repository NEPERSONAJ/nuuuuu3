create table public.notes (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  content text not null
);

-- Enable RLS
alter table public.notes enable row level security;

-- Create policies
create policy "Users can create their own notes"
  on public.notes
  for insert
  with check (auth.uid() = user_id);

create policy "Users can view their own notes"
  on public.notes
  for select
  using (auth.uid() = user_id);

create policy "Users can update their own notes"
  on public.notes
  for update
  using (auth.uid() = user_id);

create policy "Users can delete their own notes"
  on public.notes
  for delete
  using (auth.uid() = user_id);

-- Create indexes
create index notes_user_id_idx on public.notes(user_id);
create index notes_created_at_idx on public.notes(created_at desc);