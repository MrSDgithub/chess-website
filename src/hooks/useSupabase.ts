import { useState, useEffect } from 'react';
import { supabase, Player, Match, LeaderboardEntry, ContactMessage } from '../lib/supabase';

export const usePlayers = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPlayers(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const registerPlayer = async (playerData: Omit<Player, 'id' | 'created_at' | 'registration_date'>) => {
    try {
      const { data, error } = await supabase
        .from('players')
        .insert([playerData])
        .select()
        .single();

      if (error) throw error;
      
      await fetchPlayers();
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Registration failed');
    }
  };

  return { players, loading, error, registerPlayer, refetch: fetchPlayers };
};

export const useMatches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMatches();
    
    // Subscribe to real-time updates
    const subscription = supabase
      .channel('matches')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'matches' }, () => {
        fetchMatches();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('matches')
        .select(`
          *,
          white_player:players!white_player_id(*),
          black_player:players!black_player_id(*)
        `)
        .order('round', { ascending: true })
        .order('board', { ascending: true });

      if (error) throw error;
      setMatches(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { matches, loading, error, refetch: fetchMatches };
};

export const useLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLeaderboard();
    
    // Subscribe to real-time updates
    const subscription = supabase
      .channel('leaderboard')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'leaderboard' }, () => {
        fetchLeaderboard();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('leaderboard')
        .select(`
          *,
          player:players(*)
        `)
        .order('rank', { ascending: true });

      if (error) throw error;
      setLeaderboard(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { leaderboard, loading, error, refetch: fetchLeaderboard };
};

export const useContactMessages = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (messageData: Omit<ContactMessage, 'id' | 'created_at' | 'status'>) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('contact_messages')
        .insert([messageData])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading, error };
};