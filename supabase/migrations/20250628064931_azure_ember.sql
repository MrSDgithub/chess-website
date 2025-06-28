/*
  # Chess Tournament Database Schema

  1. New Tables
    - `players`
      - `id` (uuid, primary key)
      - `first_name` (text)
      - `last_name` (text)
      - `email` (text, unique)
      - `phone` (text)
      - `country` (text)
      - `rating` (integer)
      - `title` (text)
      - `birth_date` (date)
      - `emergency_contact` (text)
      - `emergency_phone` (text)
      - `registration_date` (timestamp)
      - `payment_status` (text)
      - `created_at` (timestamp)

    - `matches`
      - `id` (uuid, primary key)
      - `round` (integer)
      - `board` (integer)
      - `white_player_id` (uuid, foreign key)
      - `black_player_id` (uuid, foreign key)
      - `result` (text)
      - `moves` (integer)
      - `status` (text)
      - `start_time` (timestamp)
      - `end_time` (timestamp)
      - `last_move` (text)
      - `evaluation` (text)
      - `viewers` (integer)
      - `created_at` (timestamp)

    - `leaderboard`
      - `id` (uuid, primary key)
      - `player_id` (uuid, foreign key)
      - `points` (decimal)
      - `games_played` (integer)
      - `rank` (integer)
      - `tiebreak` (decimal)
      - `performance_rating` (integer)
      - `trend` (text)
      - `updated_at` (timestamp)

    - `contact_messages`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `subject` (text)
      - `category` (text)
      - `message` (text)
      - `status` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access and authenticated write access
*/

-- Players table
CREATE TABLE IF NOT EXISTS players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text NOT NULL,
  country text NOT NULL,
  rating integer DEFAULT 1200,
  title text DEFAULT '',
  birth_date date NOT NULL,
  emergency_contact text NOT NULL,
  emergency_phone text NOT NULL,
  registration_date timestamptz DEFAULT now(),
  payment_status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Matches table
CREATE TABLE IF NOT EXISTS matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  round integer NOT NULL,
  board integer NOT NULL,
  white_player_id uuid REFERENCES players(id),
  black_player_id uuid REFERENCES players(id),
  result text DEFAULT '',
  moves integer DEFAULT 0,
  status text DEFAULT 'upcoming',
  start_time timestamptz,
  end_time timestamptz,
  last_move text DEFAULT '',
  evaluation text DEFAULT '0.0',
  viewers integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Leaderboard table
CREATE TABLE IF NOT EXISTS leaderboard (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id uuid REFERENCES players(id) UNIQUE,
  points decimal DEFAULT 0,
  games_played integer DEFAULT 0,
  rank integer DEFAULT 0,
  tiebreak decimal DEFAULT 0,
  performance_rating integer DEFAULT 0,
  trend text DEFAULT 'stable',
  updated_at timestamptz DEFAULT now()
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  category text DEFAULT '',
  message text NOT NULL,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Players are viewable by everyone"
  ON players FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Matches are viewable by everyone"
  ON matches FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Leaderboard is viewable by everyone"
  ON leaderboard FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create policies for public insert access (registration and contact)
CREATE POLICY "Anyone can register as a player"
  ON players FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can send contact messages"
  ON contact_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create policies for authenticated users to update their own data
CREATE POLICY "Players can update their own data"
  ON players FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = id::text);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_players_email ON players(email);
CREATE INDEX IF NOT EXISTS idx_matches_round ON matches(round);
CREATE INDEX IF NOT EXISTS idx_matches_status ON matches(status);
CREATE INDEX IF NOT EXISTS idx_leaderboard_rank ON leaderboard(rank);
CREATE INDEX IF NOT EXISTS idx_leaderboard_points ON leaderboard(points DESC);