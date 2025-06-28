import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Award, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import NeonButton from '../components/NeonButton';
import { usePlayers } from '../hooks/useSupabase';

const Registration = () => {
  const { registerPlayer } = usePlayers();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    country: '',
    rating: '',
    title: '',
    birth_date: '',
    emergency_contact: '',
    emergency_phone: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const playerData = {
        ...formData,
        rating: formData.rating ? parseInt(formData.rating) : 1200,
        payment_status: 'pending'
      };

      await registerPlayer(playerData);
      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      country: '',
      rating: '',
      title: '',
      birth_date: '',
      emergency_contact: '',
      emergency_phone: '',
    });
    setIsSubmitted(false);
    setError(null);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-[#383933]/80 backdrop-blur-sm rounded-xl p-8 border border-green-500/20 max-w-md w-full text-center">
          <div className="text-green-400 mb-4">
            <CheckCircle className="h-16 w-16 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Registration Successful!</h2>
          <p className="text-gray-300 mb-6">
            Welcome to Chess Masters Championship 2025! You'll receive a confirmation email shortly with tournament details and payment instructions.
          </p>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6">
            <p className="text-green-400 font-semibold">Registration ID: #{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            <p className="text-gray-300 text-sm mt-1">Please save this ID for your records</p>
          </div>
          <NeonButton onClick={resetForm}>
            Register Another Player
          </NeonButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Tournament Registration</h1>
          <p className="text-xl text-gray-300">
            Join the Chess Masters Championship 2025
          </p>
          <div className="mt-6 bg-[#383933]/60 rounded-lg p-4 border border-green-500/20">
            <p className="text-green-400 font-semibold">Registration Fee: $125</p>
            <p className="text-gray-300 text-sm mt-1">Includes all tournament games, refreshments, and certificate</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-center space-x-3">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <p className="text-red-400">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-[#383933]/80 backdrop-blur-sm rounded-xl p-8 border border-green-500/20">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white flex items-center space-x-2">
                <User className="h-5 w-5 text-green-400" />
                <span>Personal Information</span>
              </h3>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-green-500/20 rounded-lg text-white placeholder-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300"
                  placeholder="Enter your first name"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-green-500/20 rounded-lg text-white placeholder-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300"
                  placeholder="Enter your last name"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-green-500/20 rounded-lg text-white placeholder-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-green-500/20 rounded-lg text-white placeholder-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Country *
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-green-500/20 rounded-lg text-white focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300"
                >
                  <option value="">Select your country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                  <option value="RU">Russia</option>
                  <option value="IN">India</option>
                  <option value="CN">China</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  name="birth_date"
                  value={formData.birth_date}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-green-500/20 rounded-lg text-white focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300"
                />
              </div>
            </div>

            {/* Chess Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white flex items-center space-x-2">
                <Award className="h-5 w-5 text-green-400" />
                <span>Chess Information</span>
              </h3>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  FIDE Rating
                </label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  min="1000"
                  max="3000"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-green-500/20 rounded-lg text-white placeholder-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300"
                  placeholder="e.g., 1850"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  FIDE Title
                </label>
                <select
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-green-500/20 rounded-lg text-white focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300"
                >
                  <option value="">No title</option>
                  <option value="CM">Candidate Master</option>
                  <option value="FM">FIDE Master</option>
                  <option value="IM">International Master</option>
                  <option value="GM">Grandmaster</option>
                  <option value="WCM">Woman Candidate Master</option>
                  <option value="WFM">Woman FIDE Master</option>
                  <option value="WIM">Woman International Master</option>
                  <option value="WGM">Woman Grandmaster</option>
                </select>
              </div>

              <h3 className="text-xl font-semibold text-white flex items-center space-x-2 pt-6">
                <Phone className="h-5 w-5 text-green-400" />
                <span>Emergency Contact</span>
              </h3>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Emergency Contact Name *
                </label>
                <input
                  type="text"
                  name="emergency_contact"
                  value={formData.emergency_contact}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-green-500/20 rounded-lg text-white placeholder-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300"
                  placeholder="Contact person name"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Emergency Contact Phone *
                </label>
                <input
                  type="tel"
                  name="emergency_phone"
                  value={formData.emergency_phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-green-500/20 rounded-lg text-white placeholder-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mt-6">
                <p className="text-yellow-300 text-sm">
                  <strong>Note:</strong> Registration closes 48 hours before the tournament begins. 
                  Payment must be completed within 24 hours of registration to secure your spot.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-green-500/20">
            <div className="flex items-center space-x-2 mb-6">
              <input
                type="checkbox"
                id="terms"
                required
                className="w-4 h-4 text-green-400 bg-gray-800 border-green-500 rounded focus:ring-green-400"
              />
              <label htmlFor="terms" className="text-gray-300 text-sm">
                I agree to the tournament rules and conditions *
              </label>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <NeonButton 
                type="submit" 
                size="lg" 
                disabled={isLoading}
              >
                {isLoading ? 'Registering...' : 'Register for Tournament'}
              </NeonButton>
              <NeonButton 
                variant="secondary" 
                size="lg" 
                type="button"
                onClick={resetForm}
                disabled={isLoading}
              >
                Clear Form
              </NeonButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;