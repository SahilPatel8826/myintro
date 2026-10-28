
import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Network, Database, Cloud, Zap } from 'lucide-react';
import { PORTFOLIO_CONTENT } from '../../data/content';

export const SkillsSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'terminal':
        return <Terminal className="w-5 h-5 text-hud-cyan" />;
      case 'hub':
        return <Network className="w-5 h-5 text-hud-teal" />;
      case 'database':
        return <Database className="w-5 h-5 text-hud-amber" />;
      case 'cloud':
        return <Cloud className="w-5 h-5 text-hud-orange" />;
      default:
        return <Zap className="w-5 h-5 text-hud-cyan" />;
    }
  };

  return (
    <section
      id="skills"
      className="relative w-full py-24 bg-transparent border-t border-slate-400/15"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-hud-teal mb-2 font-mono text-xs">
              <span className="tracking-widest">
                // PAYLOAD CALIBRATION 0x03
              </span>
              <span className="h-px w-12 bg-hud-teal/40" />
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight drop-shadow-lg">
              Technical Arsenal
            </h2>
          </div>

          <p className="font-mono text-xs text-slate-300 drop-shadow-md">
            ORBITAL RADAR: 4 DISCRETE ENGINE SUBSYSTEMS
          </p>
        </div>

        {/* Orbital Skill Arrays */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PORTFOLIO_CONTENT.skillCategories.map((category, idx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{
                y: -6,
                transition: { duration: 0.2 },
              }}
              className="bg-slate-950/65 backdrop-blur-[3px] p-6 rounded-2xl border border-slate-400/20 hover:border-hud-cyan/50 shadow-lg hover:shadow-[0_0_25px_rgba(0,240,255,0.12)] transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Card Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-950/60 border border-slate-400/20 flex items-center justify-center group-hover:border-hud-cyan/40 transition-colors">
                    {getIcon(category.icon)}
                  </div>

                  <span className="font-mono text-[10px] text-slate-300 tracking-wider">
                    {category.id}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-white group-hover:text-hud-cyan transition-colors drop-shadow-md">
                  {category.title}
                </h3>

                <p className="font-sans text-xs text-slate-300 mt-1 mb-6 leading-relaxed">
                  {category.desc}
                </p>

                {/* Skill Items with Animated Percentage Meters */}
                <div className="flex flex-col gap-3.5 font-mono text-xs">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-1 text-[11px]">
                        <span className="text-slate-100">
                          {skill.name}
                        </span>

                        <span className="font-bold text-hud-cyan">
                          {skill.pct}%
                        </span>
                      </div>

                      <div className="w-full h-1.5 bg-slate-800/80 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.pct}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1.2,
                            ease: 'easeOut',
                            delay: 0.2,
                          }}
                          className={`h-full ${
                            category.accent === 'cyan'
                              ? 'bg-hud-cyan shadow-[0_0_8px_rgba(0,240,255,0.6)]'
                              : category.accent === 'teal'
                              ? 'bg-hud-teal shadow-[0_0_8px_rgba(0,229,188,0.6)]'
                              : category.accent === 'amber'
                              ? 'bg-hud-amber shadow-[0_0_8px_rgba(255,183,3,0.6)]'
                              : 'bg-hud-orange shadow-[0_0_8px_rgba(255,107,53,0.6)]'
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Status */}
              <div className="mt-6 pt-4 border-t border-slate-400/15 flex items-center justify-between text-[10px] font-mono text-slate-300">
                <span>RADAR CALIBRATION</span>

                <span className="text-emerald-400 font-semibold">
                  OPTIMAL
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
