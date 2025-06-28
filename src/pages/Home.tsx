import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Trophy, Users, Crown, Star, Award } from 'lucide-react';
import NeonButton from '../components/NeonButton';
import { usePlayers, useMatches, useLeaderboard } from '../hooks/useSupabase';

const Home = () => {
  const { players } = usePlayers();
  const { matches } = useMatches();
  const { leaderboard } = useLeaderboard();

  const features = [
    {
      icon: Crown,
      title: 'Elite Competition',
      description: 'Join the most prestigious chess tournament with grandmasters and rising talents.',
    },
    {
      icon: Trophy,
      title: 'Grand Prizes',
      description: 'Compete for substantial cash prizes and earn recognition in the chess community.',
    },
    {
      icon: Users,
      title: 'Expert Organization',
      description: 'Professionally managed tournament with FIDE-rated officials and fair play monitoring.',
    },
    {
      icon: Star,
      title: 'Live Coverage',
      description: 'Watch games live with expert commentary and real-time analysis.',
    },
  ];

  const registeredPlayers = players.length;
  const completedMatches = matches.filter(match => match.status === 'completed').length;
  const liveMatches = matches.filter(match => match.status === 'live').length;
  const currentRound = Math.max(...matches.map(match => match.round), 0);

  const stats = [
    { number: registeredPlayers.toString(), label: 'Registered Players', icon: Users },
    { number: '$50K', label: 'Prize Pool', icon: Award },
    { number: currentRound > 0 ? `${currentRound}/9` : '9', label: 'Rounds', icon: Calendar },
    { number: liveMatches > 0 ? liveMatches.toString() : '3', label: liveMatches > 0 ? 'Live Games' : 'Days', icon: Trophy },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#383933]/80 to-green-900/60"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Chess Masters
              <span className="block text-green-400 text-4xl md:text-6xl mt-2">
                Championship 2025
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              The ultimate chess tournament where strategy meets excellence. Join elite players 
              from around the world in this premier chess competition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/registration">
                <NeonButton size="lg">
                  Register Now
                </NeonButton>
              </Link>
              <Link to="/schedule">
                <NeonButton variant="secondary" size="lg">
                  View Schedule
                </NeonButton>
              </Link>
            </div>
            
            {/* Live Tournament Status */}
            {(liveMatches > 0 || completedMatches > 0) && (
              <div className="mt-8 bg-[#383933]/60 rounded-lg p-4 border border-green-500/20 max-w-md mx-auto">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-semibold">Tournament Live</span>
                </div>
                <p className="text-gray-300 text-sm">
                  {liveMatches > 0 
                    ? `${liveMatches} matches currently in progress`
                    : `Round ${currentRound} completed - ${matches.filter(m => m.status === 'upcoming').length} matches remaining`
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#383933]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <stat.icon className="h-12 w-12 text-green-400" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-300 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose Chess Masters?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience the pinnacle of competitive chess with world-class organization and unmatched prestige.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-[#383933]/60 backdrop-blur-sm rounded-xl p-6 border border-green-500/20 hover:border-green-400/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)]"
              >
                <div className="flex justify-center mb-4">
                  <feature.icon className="h-12 w-12 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tournament Info */}
      <section className="py-20 bg-[#383933]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Tournament Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-6 w-6 text-green-400" />
                  <span className="text-gray-300 text-lg">March 15-17, 2025</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Trophy className="h-6 w-6 text-green-400" />
                  <span className="text-gray-300 text-lg">Swiss System, 9 Rounds</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-6 w-6 text-green-400" />
                  <span className="text-gray-300 text-lg">
                    {registeredPlayers > 0 
                      ? `${registeredPlayers} Players Registered`
                      : '256 Player Limit'
                    }
                  </span>
                </div>
              </div>
              <p className="text-gray-300 mt-6 text-lg leading-relaxed">
                Join us for three days of intense competition in the heart of the chess world. 
                This FIDE-rated tournament offers both titled and amateur players the chance 
                to compete at the highest level.
              </p>
              
              {/* Quick Actions */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link to="/leaderboard">
                  <NeonButton variant="secondary">
                    View Standings
                  </NeonButton>
                </Link>
                {liveMatches > 0 && (
                  <Link to="/live-matches">
                    <NeonButton>
                      Watch Live Games
                    </NeonButton>
                  </Link>
                )}
              </div>
            </div>
            
            <div className="bg-[#383933]/80 rounded-xl p-8 border border-green-500/20">
              <h3 className="text-2xl font-bold text-white mb-6">Prize Distribution</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">1st Place</span>
                  <span className="text-green-400 font-bold text-xl">$15,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">2nd Place</span>
                  <span className="text-green-400 font-bold text-xl">$10,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">3rd Place</span>
                  <span className="text-green-400 font-bold text-xl">$7,500</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">4th-10th Place</span>
                  <span className="text-green-400 font-bold">$2,500 each</span>
                </div>
              </div>
              
              {/* Tournament Progress */}
              {(completedMatches > 0 || registeredPlayers > 0) && (
                <div className="mt-6 pt-6 border-t border-green-500/20">
                  <h4 className="text-lg font-semibold text-white mb-3">Tournament Progress</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Registered Players:</span>
                      <span className="text-green-400">{registeredPlayers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Completed Matches:</span>
                      <span className="text-green-400">{completedMatches}</span>
                    </div>
                    {currentRound > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-300">Current Round:</span>
                        <span className="text-green-400">{currentRound}/9</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;