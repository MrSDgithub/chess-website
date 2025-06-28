import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Player {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country: string;
  rating: number;
  title: string;
  birth_date: string;
  emergency_contact: string;
  emergency_phone: string;
  registration_date: string;
  payment_status: string;
  created_at: string;
}

export interface Match {
  id: string;
  round: number;
  board: number;
  white_player_id: string;
  black_player_id: string;
  result: string;
  moves: number;
  status: string;
  start_time: string;
  end_time: string;
  last_move: string;
  evaluation: string;
  viewers: number;
  created_at: string;
  white_player?: Player;
  black_player?: Player;
}

export interface LeaderboardEntry {
  id: string;
  player_id: string;
  points: number;
  games_played: number;
  rank: number;
  tiebreak: number;
  performance_rating: number;
  trend: string;
  updated_at: string;
  player?: Player;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  category: string;
  message: string;
  status: string;
  created_at: string;
}