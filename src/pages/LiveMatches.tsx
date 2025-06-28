import React, { useState, useEffect } from 'react';
import { Play, Pause, Clock, Users, Zap, Eye, Star, Loader } from 'lucide-react';
import { useMatches } from '../hooks/useSupabase';

const LiveMatches = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { matches, loading, error } = useMatches();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getEvaluationColor = (evaluationValue: string) => {
    const value = parseFloat(evaluationValue);
    if (value > 0.5) return 'text-green-400';
    if (value < -0.5) return 'text-red-400';
    return 'text-gray-300';
  };

  const getCountryFlag = (country: string) => {
    const flags: { [key: string]: string } = {
      'US': '🇺🇸',
      'CA': '🇨🇦',
      'UK': '🇬🇧',
      'DE': '🇩🇪',
      'FR': '🇫🇷',
      'RU': '🇷🇺',
      'IN': '🇮🇳',
      'CN': '🇨🇳'
    };
    return flags[country] || '🏳️';
  };

  const liveMatches = matches.filter(match => match.status === 'live');
  const upcomingMatches = matches.filter(match => match.status === 'upcoming');
  const completedMatches = matches.filter(match => match.status === 'completed');

  const currentRound = Math.max(...matches.map(match => match.round), 0);
  const totalViewers = liveMatches.reduce((sum, match) => sum + match.viewers, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-12 w-12 text-green-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-300">Loading matches...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">Error loading matches: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Live Matches</h1>
          <p className="text-xl text-gray-300">
            Follow the action in real-time - Round {currentRound}
          </p>
          <div className="mt-4 text-green-400 font-medium">
            Live at {currentTime.toLocaleTimeString()}
          </div>
        </div>

        {/* Live Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#383933]/80 backdrop-blur-sm rounded-xl p-6 border border-green-500/20 text-center">
            <Zap className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{liveMatches.length}</div>
            <div className="text-gray-300">Live Games</div>
          </div>
          <div className="bg-[#383933]/80 backdrop-blur-sm rounded-xl p-6 border border-green-500/20 text-center">
            <Eye className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{totalViewers}</div>
            <div className="text-gray-300">Total Viewers</div>
          </div>
          <div className="bg-[#383933]/80 backdrop-blur-sm rounded-xl p-6 border border-green-500/20 text-center">
            <Clock className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">90+30</div>
            <div className="text-gray-300">Time Control</div>
          </div>
          <div className="bg-[#383933]/80 backdrop-blur-sm rounded-xl p-6 border border-green-500/20 text-center">
            <Users className="h-8 w-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">Round {currentRound}</div>
            <div className="text-gray-300">{currentRound === 9 ? 'Final Round' : 'Swiss System'}</div>
          </div>
        </div>

        {/* Live Matches */}
        {liveMatches.length > 0 && (
          <div className="space-y-6 mb-12">
            <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
              <Zap className="h-6 w-6 text-green-400" />
              <span>Live Games</span>
            </h2>

            {liveMatches.map((match) => (
              <div 
                key={match.id}
                className={`bg-[#383933]/80 backdrop-blur-sm rounded-xl p-6 border transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] ${
                  match.board <= 3
                    ? 'border-green-400/40 shadow-[0_0_20px_rgba(34,197,94,0.1)]' 
                    : 'border-green-500/20'
                }`}
              >
                {match.board <= 3 && (
                  <div className="flex items-center space-x-2 mb-4">
                    <Star className="h-5 w-5 text-yellow-400" />
                    <span className="text-yellow-400 font-medium">Top Board</span>
                  </div>
                )}

                <div className="grid lg:grid-cols-5 gap-6 items-center">
                  {/* Players */}
                  <div className="lg:col-span-2 space-y-4">
                    {/* White Player */}
                    <div className="flex items-center justify-between bg-gray-800/50 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{getCountryFlag(match.white_player?.country || '')}</span>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-white">
                              {match.white_player?.first_name} {match.white_player?.last_name}
                            </span>
                            {match.white_player?.title && (
                              <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">
                                {match.white_player.title}
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-300">{match.white_player?.rating}</div>
                        </div>
                      </div>
                      <div className="text-lg font-mono text-green-400">
                        {Math.floor(Math.random() * 60) + 30}:{String(Math.floor(Math.random() * 60)).padStart(2, '0')}
                      </div>
                    </div>

                    {/* Black Player */}
                    <div className="flex items-center justify-between bg-gray-800/50 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{getCountryFlag(match.black_player?.country || '')}</span>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-white">
                              {match.black_player?.first_name} {match.black_player?.last_name}
                            </span>
                            {match.black_player?.title && (
                              <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">
                                {match.black_player.title}
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-300">{match.black_player?.rating}</div>
                        </div>
                      </div>
                      <div className="text-lg font-mono text-green-400">
                        {Math.floor(Math.random() * 60) + 30}:{String(Math.floor(Math.random() * 60)).padStart(2, '0')}
                      </div>
                    </div>
                  </div>

                  {/* Game Info */}
                  <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{match.moves}</div>
                      <div className="text-gray-300 text-sm">Moves</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">Board {match.board}</div>
                      <div className="text-gray-300 text-sm">Round {match.round}</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${getEvaluationColor(match.evaluation)}`}>
                        {match.evaluation}
                      </div>
                      <div className="text-gray-300 text-sm">Eval</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">{match.viewers}</div>
                      <div className="text-gray-300 text-sm">Viewers</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="text-center space-y-2">
                    <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium inline-block">
                      {match.last_move || 'Starting...'}
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <Eye className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-300 text-sm">Watch Live</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upcoming Matches */}
        {upcomingMatches.length > 0 && (
          <div className="space-y-6 mb-12">
            <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
              <Clock className="h-6 w-6 text-yellow-400" />
              <span>Upcoming Matches</span>
            </h2>

            <div className="grid lg:grid-cols-2 gap-6">
              {upcomingMatches.slice(0, 6).map((match) => (
                <div 
                  key={match.id}
                  className="bg-[#383933]/60 backdrop-blur-sm rounded-xl p-6 border border-green-500/20"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-green-400 font-medium">Round {match.round} - Board {match.board}</span>
                    <span className="text-gray-400 text-sm">Starting Soon</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{getCountryFlag(match.white_player?.country || '')}</span>
                        <span className="text-white font-medium">
                          {match.white_player?.first_name} {match.white_player?.last_name}
                        </span>
                        <span className="text-gray-300">({match.white_player?.rating})</span>
                      </div>
                    </div>
                    
                    <div className="text-center text-gray-400">vs</div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{getCountryFlag(match.black_player?.country || '')}</span>
                        <span className="text-white font-medium">
                          {match.black_player?.first_name} {match.black_player?.last_name}
                        </span>
                        <span className="text-gray-300">({match.black_player?.rating})</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Completed Matches */}
        {completedMatches.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
              <Pause className="h-6 w-6 text-gray-400" />
              <span>Recently Completed</span>
            </h2>

            <div className="grid lg:grid-cols-2 gap-6">
              {completedMatches.slice(-6).map((match) => (
                <div 
                  key={match.id}
                  className="bg-[#383933]/60 backdrop-blur-sm rounded-xl p-6 border border-green-500/20"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-green-400 font-medium">Round {match.round} - Board {match.board}</span>
                    <span className="text-gray-400 text-sm">Completed</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{getCountryFlag(match.white_player?.country || '')}</span>
                        <span className="text-white font-medium">
                          {match.white_player?.first_name} {match.white_player?.last_name}
                        </span>
                        <span className="text-gray-300">({match.white_player?.rating})</span>
                      </div>
                      <div className="text-xl font-bold text-green-400">
                        {match.result ? match.result.split('-')[0] : '½'}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{getCountryFlag(match.black_player?.country || '')}</span>
                        <span className="text-white font-medium">
                          {match.black_player?.first_name} {match.black_player?.last_name}
                        </span>
                        <span className="text-gray-300">({match.black_player?.rating})</span>
                      </div>
                      <div className="text-xl font-bold text-green-400">
                        {match.result ? match.result.split('-')[1] : '½'}
                      </div>
                    </div>

                    <div className="flex justify-between text-sm text-gray-300 pt-2 border-t border-green-500/20">
                      <span>{match.moves} moves</span>
                      <span>{match.result || 'Draw'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No matches message */}
        {matches.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Matches Yet</h3>
            <p className="text-gray-300">
              Tournament matches will appear here once the tournament begins.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveMatches;