import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Trophy, Loader } from 'lucide-react';
import { useMatches } from '../hooks/useSupabase';

const Schedule = () => {
  const [selectedDay, setSelectedDay] = useState(1);
  const { matches, loading, error } = useMatches();

  const schedule = {
    1: {
      date: 'March 15, 2025',
      day: 'Friday',
      rounds: [1, 2, 3],
      events: [
        {
          time: '9:00 AM',
          event: 'Registration & Check-in',
          location: 'Lobby'
        },
        {
          time: '12:00 PM',
          event: 'Lunch Break',
          location: 'Cafeteria'
        },
        {
          time: '4:30 PM',
          event: 'Coffee Break',
          location: 'Lounge'
        }
      ]
    },
    2: {
      date: 'March 16, 2025',
      day: 'Saturday',
      rounds: [4, 5, 6, 7],
      events: [
        {
          time: '8:30 AM',
          event: 'Morning Coffee',
          location: 'Lounge'
        },
        {
          time: '11:00 AM',
          event: 'Short Break',
          location: 'Lounge'
        },
        {
          time: '2:00 PM',
          event: 'Lunch Break',
          location: 'Cafeteria'
        },
        {
          time: '6:00 PM',
          event: 'Dinner Break',
          location: 'Cafeteria'
        }
      ]
    },
    3: {
      date: 'March 17, 2025',
      day: 'Sunday',
      rounds: [8, 9],
      events: [
        {
          time: '9:30 AM',
          event: 'Morning Coffee',
          location: 'Lounge'
        },
        {
          time: '12:00 PM',
          event: 'Lunch Break',
          location: 'Cafeteria'
        },
        {
          time: '4:30 PM',
          event: 'Closing Ceremony',
          location: 'Main Hall A'
        },
        {
          time: '5:30 PM',
          event: 'Prize Distribution',
          location: 'Main Hall A'
        }
      ]
    }
  };

  const roundTimes = {
    1: '10:00 AM',
    2: '2:00 PM',
    3: '6:00 PM',
    4: '9:00 AM',
    5: '12:30 PM',
    6: '4:00 PM',
    7: '7:30 PM',
    8: '10:00 AM',
    9: '2:00 PM'
  };

  const currentSchedule = schedule[selectedDay as keyof typeof schedule];

  const getRoundMatches = (round: number) => {
    return matches.filter(match => match.round === round);
  };

  const getRoundStatus = (round: number) => {
    const roundMatches = getRoundMatches(round);
    if (roundMatches.length === 0) return 'upcoming';
    
    const completedMatches = roundMatches.filter(match => match.status === 'completed');
    const liveMatches = roundMatches.filter(match => match.status === 'live');
    
    if (completedMatches.length === roundMatches.length) return 'completed';
    if (liveMatches.length > 0) return 'live';
    return 'upcoming';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-12 w-12 text-green-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-300">Loading schedule...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Tournament Schedule</h1>
          <p className="text-xl text-gray-300">
            Complete schedule for Chess Masters Championship 2025
          </p>
        </div>

        {/* Day Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-[#383933]/60 rounded-lg p-1 border border-green-500/20">
            {[1, 2, 3].map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                  selectedDay === day
                    ? 'bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.3)]'
                    : 'text-gray-300 hover:text-green-400'
                }`}
              >
                Day {day}
              </button>
            ))}
          </div>
        </div>

        {/* Schedule Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Rounds */}
          <div className="lg:col-span-2">
            <div className="bg-[#383933]/80 backdrop-blur-sm rounded-xl p-6 border border-green-500/20">
              <div className="flex items-center space-x-3 mb-6">
                <Trophy className="h-6 w-6 text-green-400" />
                <h2 className="text-2xl font-bold text-white">
                  {currentSchedule.day}, {currentSchedule.date}
                </h2>
              </div>

              <div className="space-y-4">
                {currentSchedule.rounds.map((round) => {
                  const status = getRoundStatus(round);
                  const roundMatches = getRoundMatches(round);
                  
                  return (
                    <div 
                      key={round}
                      className="bg-gray-800/50 rounded-lg p-6 border border-green-500/10 hover:border-green-400/30 transition-all duration-300"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <h3 className="text-lg font-semibold text-white">
                          Round {round}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          status === 'completed' 
                            ? 'bg-green-500/20 text-green-400'
                            : status === 'live'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {status === 'completed' ? 'Completed' : 
                           status === 'live' ? 'Live' : 'Upcoming'}
                        </span>
                      </div>

                      <div className="grid sm:grid-cols-3 gap-4 text-gray-300 mb-4">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-green-400" />
                          <span>{roundTimes[round as keyof typeof roundTimes]}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-green-400" />
                          <span>90 minutes</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-green-400" />
                          <span>Main Hall A</span>
                        </div>
                      </div>

                      <p className="text-gray-300 mb-3">
                        {round === 1 ? 'Opening Round - Swiss System Pairing' :
                         round === 9 ? 'Final Round' :
                         `Round ${round} - Swiss System`}
                      </p>

                      {roundMatches.length > 0 && (
                        <div className="bg-gray-900/50 rounded-lg p-4">
                          <div className="text-sm text-gray-300 mb-2">
                            {roundMatches.length} matches scheduled
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                            {status === 'completed' && (
                              <div className="text-green-400">
                                ✓ All matches completed
                              </div>
                            )}
                            {status === 'live' && (
                              <div className="text-yellow-400">
                                ⚡ {roundMatches.filter(m => m.status === 'live').length} live matches
                              </div>
                            )}
                            {status === 'upcoming' && (
                              <div className="text-blue-400">
                                ⏳ Starting soon
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Events & Information */}
          <div className="space-y-6">
            {/* Daily Events */}
            <div className="bg-[#383933]/80 backdrop-blur-sm rounded-xl p-6 border border-green-500/20">
              <div className="flex items-center space-x-3 mb-6">
                <Calendar className="h-6 w-6 text-green-400" />
                <h3 className="text-xl font-bold text-white">Daily Events</h3>
              </div>

              <div className="space-y-4">
                {currentSchedule.events.map((event, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="bg-green-500/20 rounded-full p-2 mt-1">
                      <Clock className="h-4 w-4 text-green-400" />
                    </div>
                    <div>
                      <div className="text-green-400 font-medium">{event.time}</div>
                      <div className="text-white font-medium">{event.event}</div>
                      <div className="text-gray-300 text-sm">{event.location}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tournament Info */}
            <div className="bg-[#383933]/80 backdrop-blur-sm rounded-xl p-6 border border-green-500/20">
              <h3 className="text-xl font-bold text-white mb-4">Tournament Rules</h3>
              <div className="space-y-3 text-gray-300 text-sm">
                <div>• 90 minutes per player per game</div>
                <div>• 30 second increment per move</div>
                <div>• FIDE rules apply</div>
                <div>• Electronic scoresheet required</div>
                <div>• No draws before move 30</div>
                <div>• Fair play monitoring active</div>
              </div>
            </div>

            {/* Tournament Statistics */}
            <div className="bg-[#383933]/80 backdrop-blur-sm rounded-xl p-6 border border-green-500/20">
              <h3 className="text-xl font-bold text-white mb-4">Tournament Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Total Rounds:</span>
                  <span className="text-white font-medium">9</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Matches Played:</span>
                  <span className="text-white font-medium">{matches.filter(m => m.status === 'completed').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Live Matches:</span>
                  <span className="text-white font-medium">{matches.filter(m => m.status === 'live').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Upcoming:</span>
                  <span className="text-white font-medium">{matches.filter(m => m.status === 'upcoming').length}</span>
                </div>
              </div>
            </div>

            {/* Venue Information */}
            <div className="bg-[#383933]/80 backdrop-blur-sm rounded-xl p-6 border border-green-500/20">
              <div className="flex items-center space-x-3 mb-4">
                <MapPin className="h-6 w-6 text-green-400" />
                <h3 className="text-xl font-bold text-white">Venue</h3>
              </div>
              <div className="text-gray-300 space-y-2">
                <div className="font-medium text-white">Grand Chess Center</div>
                <div>123 Tournament Avenue</div>
                <div>Chess City, CC 12345</div>
                <div className="pt-2 text-sm">
                  Free parking available. Public transport: Metro Line 3, Chess Station.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;