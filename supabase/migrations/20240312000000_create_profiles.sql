-- Create profiles table
create table if not exists public.profiles (
    id uuid references auth.users on delete cascade primary key,
    email text not null,
    name text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    topics text[] default '{}',
    newsletter_name text,
    newsletter_pitch text,
    tone text,
    language text,
    target_audience text
);

-- Enable Row Level Security (RLS)
alter table public.profiles enable row level security;

-- Create policies
create policy "Users can view their own profile"
    on public.profiles for select
    using ( auth.uid() = id );

create policy "Users can insert their own profile"
    on public.profiles for insert
    with check ( auth.uid() = id );

create policy "Users can update their own profile"
    on public.profiles for update
    using ( auth.uid() = id );

-- Create indexes
create index profiles_id_idx on public.profiles(id);
create index profiles_email_idx on public.profiles(email);

-- Set up realtime
alter publication supabase_realtime add table public.profiles;