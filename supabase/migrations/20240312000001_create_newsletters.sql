-- Create newsletters table
create table if not exists public.newsletters (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users on delete cascade not null,
    name text not null,
    status text not null default 'draft',
    content jsonb not null default '{
        "intro": null,
        "featured_story": null,
        "news": [],
        "outro": null
    }',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.newsletters enable row level security;

-- Create policies
create policy "Users can view their own newsletters"
    on public.newsletters for select
    using ( auth.uid() = user_id );

create policy "Users can insert their own newsletters"
    on public.newsletters for insert
    with check ( auth.uid() = user_id );

create policy "Users can update their own newsletters"
    on public.newsletters for update
    using ( auth.uid() = user_id );

create policy "Users can delete their own newsletters"
    on public.newsletters for delete
    using ( auth.uid() = user_id );

-- Create indexes
create index newsletters_user_id_idx on public.newsletters(user_id);
create index newsletters_status_idx on public.newsletters(status);

-- Set up realtime
alter publication supabase_realtime add table public.newsletters;