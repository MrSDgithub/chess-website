import React, { useState } from 'react';
import { Trophy, Medal, Award, Crown, TrendingUp, Star, Users, Loader } from 'lucide-react';
import { useLeaderboard, usePlayers } from '../hooks/useSupabase';

const Leaderboard = () => {
  const [filter, setFilter] = useState('overall');
  const { leaderboard, loading, error } = useLeaderboard();
  const { players } = usePlayers();

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-400" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-300" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-400">#{rank}</span>;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-400" />;
      case 'down':
        return <TrendingUp className="h-4 w-4 text-red-400 rotate-180" />;
      default:
        return <div className="h-4 w-4 rounded-full bg-gray-400"></div>;
    }
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

  const filteredLeaderboard = leaderboard.filter(entry => {
    if (filter === 'overall') return true;
    if (filter === 'gm') return entry.player?.title === 'GM';
    if (filter === 'im') return entry.player?.title === 'IM';
    if (filter === 'amateur') return !entry.player?.title || entry.player.title === '';
    return true;
  });

  const totalPlayers = players.length;
  const averageRating = players.length > 0 
    ? Math.round(players.reduce((sum, player) => sum + player.rating, 0) / players.length)
    : 0;
  const grandmasters = players.filter(player => player.title === 'GM').length;
  const completedRounds = Math.max(...leaderboard.map(entry => entry.games_played), 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-12 w-12 text-green-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-300">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">Error loading leaderboard: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Tournament Leaderboard</h1>
          <p className="text-xl text-gray-300">
            Live standings - {completedRounds > 0 ? `After Round ${completedRounds}` : 'Tournament Starting Soon'}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#383933]/80 backdrop-blur-sm rounded-xl p-6 border border-green-500/20 text-center">
            <Trophy className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{totalPlayers}</div>
            <div className="text-gray-300">Total Players</div>
          </div>
          <div className="bg-[#383933]/80 backdrop-blur-sm rounded-xl p-6 border border-green-500/20 text-center">
            <Star className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{completedRounds}/9</div>
            <div className="text-gray-300">Rounds Complete</div>
          </div>
          <div className="bg-[#383933]/80 backdrop-blur-sm rounded-xl p-6 border border-green-500/20 text-center">
            <Award className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{averageRating}</div>
            <div className="text-gray-300">Avg Rating</div>
          </div>
          <div className="bg-[#383933]/80 backdrop-blur-sm rounded-xl p-6 border border-green-500/20 text-center">
            <Crown className="h-8 w-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{grandmasters}</div>
            <div className="text-gray-300">Grandmasters</div>
          </div>
        </div>

        {/* Filter Options */}
        <div className="flex justify-center mb-8">
          <div className="bg-[#383933]/60 rounded-lg p-1 border border-green-500/20">
            {['overall', 'gm', 'im', 'amateur'].map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-300 capitalize ${
                  filter === filterType
                    ? 'bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.3)]'
                    : 'text-gray-300 hover:text-green-400'
                }`}
              >
                {filterType === 'gm' ? 'Grandmasters' : filterType === 'im' ? 'Int\'l Masters' : filterType}
              </button>
            ))}
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-[#383933]/80 backdrop-blur-sm rounded-xl border border-green-500/20 overflow-hidden">
          {filteredLeaderboard.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Results Yet</h3>
              <p className="text-gray-300">
                {filter === 'overall' 
                  ? 'Tournament standings will appear here once matches begin.'
                  : `No players found in the ${filter} category.`
                }
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-green-500/10 border-b border-green-500/20">
                  <tr>
                    <th className="px-6 py-4 text-left text-green-400 font-semibold">Rank</th>
                    <th className="px-6 py-4 text-left text-green-400 font-semibold">Player</th>
                    <th className="px-6 py-4 text-center text-green-400 font-semibold">Rating</th>
                    <th className="px-6 py-4 text-center text-green-400 font-semibold">Points</th>
                    <th className="px-6 py-4 text-center text-green-400 font-semibold">Games</th>
                    <th className="px-6 py-4 text-center text-green-400 font-semibold">Performance</th>
                    <th className="px-6 py-4 text-center text-green-400 font-semibold">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeaderboard.map((entry, index) => (
                    <tr 
                      key={entry.id}
                      className={`border-b border-green-500/10 hover:bg-green-500/5 transition-all duration-300 ${
                        entry.rank <= 3 ? 'bg-gradient-to-r from-yellow-500/5 to-transparent' : ''
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          {getRankIcon(entry.rank)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{getCountryFlag(entry.player?.country || '')}</span>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold text-white">
                                {entry.player?.first_name} {entry.player?.last_name}
                              </span>
                              {entry.player?.title && (
                                <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-medium">
                                  {entry.player.title}
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-gray-300">{entry.player?.country}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center text-white font-medium">{entry.player?.rating}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-lg font-bold text-green-400">{entry.points}</span>
                        <span className="text-gray-300">/{entry.games_played}</span>
                      </td>
                      <td className="px-6 py-4 text-center text-gray-300">{entry.games_played}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`font-medium ${
                          entry.performance_rating > (entry.player?.rating || 0) ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {entry.performance_rating || '-'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {getTrendIcon(entry.trend)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Tournament Status */}
        <div className="mt-8 bg-[#383933]/60 rounded-xl p-6 border border-green-500/20">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
            <Trophy className="h-6 w-6 text-green-400" />
            <span>Tournament Status</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-gray-300">
            <div>
              <div className="font-medium text-white mb-2">Next Round</div>
              <div>
                {completedRounds < 9 
                  ? `Round ${completedRounds + 1} - ${completedRounds === 8 ? 'Final Round' : 'Swiss System'}`
                  : 'Tournament Complete'
                }
              </div>
              <div className="text-sm">
                {completedRounds < 9 ? 'Starting soon' : 'All rounds finished'}
              </div>
            </div>
            <div>
              <div className="font-medium text-white mb-2">Prize Distribution</div>
              <div>
                {completedRounds === 9 ? 'Final standings confirmed' : 'Top positions forming'}
              </div>
              <div className="text-sm">
                {completedRounds === 9 ? 'Prizes being distributed' : 'Final prizes to be determined'}
              </div>
            </div>
            <div>
              <div className="font-medium text-white mb-2">Live Updates</div>
              <div>Real-time scoring active</div>
              <div className="text-sm">Updates every 30 seconds</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;