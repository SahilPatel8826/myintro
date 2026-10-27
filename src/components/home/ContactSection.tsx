import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Shield, Terminal, Linkedin, Mail, Code, CheckCircle, ArrowUpRight, Radio, RefreshCw } from 'lucide-react';
import { PORTFOLIO_CONTENT } from '../../data/content';
import { soundEngine } from '../../audio/soundSystem';

export const ContactSection: React.FC = () => {
  const [isTransmitting, setIsTransmitting] = useState<boolean>(false);
  const [transmitted, setTransmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    priority: 'standard',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isTransmitting) return;

    setIsTransmitting(true);
    soundEngine.init();
    soundEngine.playButtonPress();

    setTimeout(() => {
      setIsTransmitting(false);
      setTransmitted(true);
      setFormData({ name: '', email: '', priority: 'standard', message: '' });
      setTimeout(() => setTransmitted(false), 8000);
    }, 1400);
  };

  const getChannelIcon = (icon: string) => {
    switch (icon) {
      case 'terminal':
        return <Terminal className="w-5 h-5 text-hud-cyan" />;
      case 'lan':
        return <Linkedin className="w-5 h-5 text-hud-teal" />;
      case 'mail':
        return <Mail className="w-5 h-5 text-hud-amber" />;
      case 'code':
        return <Code className="w-5 h-5 text-hud-orange" />;
      default:
        return <Radio className="w-5 h-5 text-hud-cyan" />;
    }
  };

  return (
    <section id="contact" className="w-full py-24 bg-surface-container-lowest/70 border-t border-slate-900 relative">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-hud-cyan mb-2 font-mono text-xs">
              <span className="tracking-widest">// COMMS ARRAY 0x06</span>
              <span className="h-px w-12 bg-hud-cyan/40" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Establish Communication
            </h2>
            <p className="font-sans text-sm sm:text-base text-slate-400 mt-2">
              Open secure channel for engineering opportunities, distributed system inquiries, or telemetry sync.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>ENCRYPTION: AES-256-GCM</span>
          </div>
        </div>

        {/* Transmission Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Comms Console Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-surface-container-low p-6 sm:p-8 rounded-2xl border border-slate-800/80 shadow-xl flex flex-col gap-6"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 font-mono text-xs">
              <span className="text-hud-cyan tracking-widest">// TRANSMISSION PROTOCOL: v2.4</span>
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                PORT: 443_SSL
              </span>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-400">CALL SIGN (FULL NAME)</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Commander Alex Vance"
                    className="w-full bg-surface-container px-4 py-3 rounded-xl text-white font-sans text-sm border border-slate-800 focus:border-hud-cyan focus:outline-none focus:ring-1 focus:ring-hud-cyan transition"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-400">FREQUENCY (EMAIL ADDRESS)</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@interstellar.net"
                    className="w-full bg-surface-container px-4 py-3 rounded-xl text-white font-sans text-sm border border-slate-800 focus:border-hud-cyan focus:outline-none focus:ring-1 focus:ring-hud-cyan transition"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-slate-400">PRIORITY DISPATCH LEVEL</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="w-full bg-surface-container px-4 py-3 rounded-xl text-white font-sans text-sm border border-slate-800 focus:border-hud-cyan focus:outline-none focus:ring-1 focus:ring-hud-cyan transition"
                >
                  <option value="standard">STANDARD DISPATCH (General Consultation)</option>
                  <option value="high">URGENT RADAR (Full-Time Engineering Mission)</option>
                  <option value="priority">MISSION CRITICAL (Contract / Architecture Advisory)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-slate-400">DIRECTIVE (MESSAGE PAYLOAD)</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Initiating contact regarding high-throughput distributed backend roles..."
                  className="w-full bg-surface-container px-4 py-3 rounded-xl text-white font-sans text-sm border border-slate-800 focus:border-hud-cyan focus:outline-none focus:ring-1 focus:ring-hud-cyan transition resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isTransmitting}
                className="w-full py-4 rounded-xl bg-hud-cyan text-slate-950 font-bold tracking-widest uppercase hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-1"
              >
                {isTransmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                    <span>TRANSMITTING FREQUENCY BEACON...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-slate-950" />
                    <span>TRANSMIT FREQUENCY BEACON</span>
                  </>
                )}
              </button>

              {transmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-mono text-xs flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>[BEACON_TRANSMITTED]: Transmission logged. Signals dispatch will acknowledge shortly.</span>
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Right Column: Verified Channels Directory & Node Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Channels Directory */}
            <div className="bg-surface-container-low p-6 rounded-2xl border border-slate-800/80 shadow-xl flex flex-col gap-4 font-mono text-xs">
              <span className="text-slate-400 tracking-widest">// VERIFIED CHANNELS</span>

              <div className="flex flex-col gap-3">
                {PORTFOLIO_CONTENT.socialChannels.map((channel) => (
                  <a
                    key={channel.name}
                    href={channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-surface-container border border-slate-800 hover:border-hud-cyan/50 hover:bg-slate-900 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center group-hover:border-hud-cyan/40 transition">
                        {getChannelIcon(channel.icon)}
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="font-display text-sm font-bold text-white group-hover:text-hud-cyan transition-colors">
                          {channel.name}
                        </span>
                        <span className="text-[11px] text-slate-400">{channel.handle}</span>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-hud-cyan transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Deep Space Node Badge */}
            <div className="bg-surface-container-high p-5 rounded-2xl border border-slate-800/80 shadow-md flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-hud-cyan animate-ping" />
                <div className="flex flex-col text-left">
                  <span className="text-white font-bold">SYS_BEACON: BROADCASTING</span>
                  <span className="text-[11px] text-slate-400">{PORTFOLIO_CONTENT.personal.location}</span>
                </div>
              </div>
              <span className="text-hud-cyan font-bold">ACK: READY</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
