import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Users, Award, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import NeonButton from '../components/NeonButton';
import { useContactMessages } from '../hooks/useSupabase';

const Contact = () => {
  const { sendMessage, loading } = useContactMessages();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await sendMessage(formData);
      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      category: '',
      message: '',
    });
    setIsSubmitted(false);
    setError(null);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      details: 'info@chessmasters.com',
      description: 'General inquiries and support'
    },
    {
      icon: Phone,
      title: 'Phone',
      details: '+1 (555) 123-4567',
      description: 'Tournament hotline (Mon-Fri 9AM-6PM)'
    },
    {
      icon: MapPin,
      title: 'Venue',
      details: 'Grand Chess Center',
      description: '123 Tournament Ave, Chess City, CC 12345'
    },
    {
      icon: Clock,
      title: 'Hours',
      details: 'Tournament Days',
      description: 'March 15-17, 2025 (8AM-10PM)'
    }
  ];

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Tournament Director',
      email: 'sarah@chessmasters.com',
      expertise: 'FIDE Arbiter, Tournament Organization'
    },
    {
      name: 'Michael Chen',
      role: 'Technical Coordinator',
      email: 'michael@chessmasters.com',
      expertise: 'Live Streaming, Chess Software'
    },
    {
      name: 'Dr. Elena Rodriguez',
      role: 'Medical Officer',
      email: 'elena@chessmasters.com',
      expertise: 'Player Health & Safety'
    }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-[#383933]/80 backdrop-blur-sm rounded-xl p-8 border border-green-500/20 max-w-md w-full text-center">
          <div className="text-green-400 mb-4">
            <CheckCircle className="h-16 w-16 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Message Sent!</h2>
          <p className="text-gray-300 mb-6">
            Thank you for contacting us. We'll get back to you within 24 hours during tournament dates, 
            or within 48 hours otherwise.
          </p>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6">
            <p className="text-green-400 font-semibold">Message ID: #{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            <p className="text-gray-300 text-sm mt-1">Reference this ID in future communications</p>
          </div>
          <NeonButton onClick={resetForm}>
            Send Another Message
          </NeonButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-xl text-gray-300">
            Get in touch with the Chess Masters Championship team
          </p>
        </div>

        {/* Contact Information Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info, index) => (
            <div 
              key={index}
              className="bg-[#383933]/80 backdrop-blur-sm rounded-xl p-6 border border-green-500/20 text-center hover:border-green-400/40 transition-all duration-300"
            >
              <div className="flex justify-center mb-4">
                <info.icon className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{info.title}</h3>
              <div className="text-green-400 font-medium mb-2">{info.details}</div>
              <p className="text-gray-300 text-sm">{info.description}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-[#383933]/80 backdrop-blur-sm rounded-xl p-8 border border-green-500/20">
            <div className="flex items-center space-x-3 mb-6">
              <MessageSquare className="h-6 w-6 text-green-400" />
              <h2 className="text-2xl font-bold text-white">Send us a message</h2>
            </div>

            {error && (
              <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <p className="text-red-400">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-green-500/20 rounded-lg text-white placeholder-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300 disabled:opacity-50"
                    placeholder="Enter your name"
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
                    disabled={loading}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-green-500/20 rounded-lg text-white placeholder-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300 disabled:opacity-50"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-green-500/20 rounded-lg text-white placeholder-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300 disabled:opacity-50"
                  placeholder="What is this regarding?"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-green-500/20 rounded-lg text-white focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300 disabled:opacity-50"
                >
                  <option value="">Select a category</option>
                  <option value="registration">Registration Issues</option>
                  <option value="tournament">Tournament Rules</option>
                  <option value="technical">Technical Support</option>
                  <option value="media">Media & Press</option>
                  <option value="sponsorship">Sponsorship</option>
                  <option value="general">General Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-green-500/20 rounded-lg text-white placeholder-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300 resize-none disabled:opacity-50"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <NeonButton 
                  type="submit" 
                  size="lg" 
                  className="flex-1"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader className="h-5 w-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </>
                  )}
                </NeonButton>
                <NeonButton 
                  variant="secondary" 
                  size="lg" 
                  type="button" 
                  className="flex-1"
                  onClick={resetForm}
                  disabled={loading}
                >
                  Clear Form
                </NeonButton>
              </div>
            </form>
          </div>

          {/* Team & Additional Info */}
          <div className="space-y-8">
            {/* Tournament Team */}
            <div className="bg-[#383933]/80 backdrop-blur-sm rounded-xl p-8 border border-green-500/20">
              <div className="flex items-center space-x-3 mb-6">
                <Users className="h-6 w-6 text-green-400" />
                <h3 className="text-2xl font-bold text-white">Tournament Team</h3>
              </div>

              <div className="space-y-6">
                {teamMembers.map((member, index) => (
                  <div key={index} className="border-b border-green-500/20 pb-4 last:border-b-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-lg font-semibold text-white">{member.name}</h4>
                        <div className="text-green-400 font-medium">{member.role}</div>
                      </div>
                      <a 
                        href={`mailto:${member.email}`}
                        className="text-green-400 hover:text-green-300 transition-colors"
                      >
                        <Mail className="h-5 w-5" />
                      </a>
                    </div>
                    <p className="text-gray-300 text-sm">{member.expertise}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Quick Links */}
            <div className="bg-[#383933]/80 backdrop-blur-sm rounded-xl p-8 border border-green-500/20">
              <div className="flex items-center space-x-3 mb-6">
                <Award className="h-6 w-6 text-green-400" />
                <h3 className="text-2xl font-bold text-white">Quick Help</h3>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-800/30 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Registration Problems?</h4>
                  <p className="text-gray-300 text-sm">Contact Sarah Johnson directly for immediate assistance with registration issues.</p>
                </div>

                <div className="bg-gray-800/30 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Technical Issues?</h4>
                  <p className="text-gray-300 text-sm">Michael Chen handles all technical support including live stream and chess software issues.</p>
                </div>

                <div className="bg-gray-800/30 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Emergency During Tournament?</h4>
                  <p className="text-gray-300 text-sm">Call our 24/7 tournament hotline or contact Dr. Rodriguez for medical emergencies.</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-[#383933]/80 backdrop-blur-sm rounded-xl p-8 border border-green-500/20">
              <h3 className="text-xl font-bold text-white mb-4">Follow the Tournament</h3>
              <div className="space-y-3 text-gray-300">
                <div>🐦 Twitter: @ChessMasters2025</div>
                <div>📘 Facebook: Chess Masters Championship</div>
                <div>📷 Instagram: @chessmasterschampionship</div>
                <div>▶️ YouTube: Chess Masters Official</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;