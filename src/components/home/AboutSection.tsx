import React from 'react';
import { motion } from 'framer-motion';
import { Compass, GraduationCap, Target, Cpu, Activity, Database, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_CONTENT } from '../../data/content';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="w-full py-24 bg-surface-container-lowest/70 border-t border-slate-900 relative">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-hud-cyan mb-2 font-mono text-xs">
              <span className="tracking-widest">// FLIGHT RECORD 0x02</span>
              <span className="h-px w-12 bg-hud-cyan/40" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              The Explorer Behind the Code
            </h2>
          </div>
          <p className="font-mono text-xs text-slate-400">
            {PORTFOLIO_CONTENT.personal.academicSpec}
          </p>
        </div>

        {/* Bento Grid: Core Directives & Cosmonaut Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Directives & Academic Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <div className="bg-surface-container-low p-6 sm:p-8 rounded-2xl border border-slate-800/80 shadow-lg flex flex-col gap-5">
              <div className="flex items-center gap-3 text-hud-cyan">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-hud-cyan/30">
                  <Compass className="w-5 h-5 text-hud-cyan" />
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                  Core Directives
                </h3>
              </div>

              <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed">
                {PORTFOLIO_CONTENT.about.coreDirectives}
              </p>

              <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed">
                {PORTFOLIO_CONTENT.about.secondaryDirective}
              </p>

              {/* Academic & Target Horizon Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 font-mono">
                <div className="bg-surface-container p-4 rounded-xl border border-slate-800 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-hud-cyan/10 text-hud-cyan shrink-0">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block tracking-wider">ACADEMIC_EXPEDITION</span>
                    <span className="font-display font-bold text-base sm:text-lg text-hud-cyan">
                      {PORTFOLIO_CONTENT.about.academicExpedition.period}
                    </span>
                    <span className="text-xs text-slate-400 block">
                      {PORTFOLIO_CONTENT.about.academicExpedition.degree}
                    </span>
                  </div>
                </div>

                <div className="bg-surface-container p-4 rounded-xl border border-slate-800 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-hud-teal/10 text-hud-teal shrink-0">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block tracking-wider">TARGET_HORIZON</span>
                    <span className="font-display font-bold text-base sm:text-lg text-hud-teal">
                      {PORTFOLIO_CONTENT.about.targetHorizon.title}
                    </span>
                    <span className="text-xs text-slate-400 block">
                      {PORTFOLIO_CONTENT.about.targetHorizon.subtitle}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Cosmonaut Portrait Module & Engineering Principles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Cosmonaut Portrait Card */}
            <div className="bg-surface-container-low p-6 rounded-2xl border border-slate-800/80 shadow-lg flex flex-col sm:flex-row items-center gap-6 overflow-hidden relative">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden shrink-0 border-2 border-hud-cyan/40 shadow-[0_0_20px_rgba(0,240,255,0.25)]">
                <img
                  src={PORTFOLIO_CONTENT.personal.astronautImage}
                  alt="Cosmonaut Explorer"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-mono text-[10px] text-hud-cyan tracking-widest uppercase">
                  {PORTFOLIO_CONTENT.about.crewDossier.callsign}
                </span>
                <span className="font-display text-xl sm:text-2xl font-bold text-white mt-0.5">
                  {PORTFOLIO_CONTENT.about.crewDossier.name}
                </span>
                <p className="font-sans text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  "{PORTFOLIO_CONTENT.about.crewDossier.bio}"
                </p>
              </div>
            </div>

            {/* Architecture Tenets Card */}
            <div className="bg-surface-container-low p-6 rounded-2xl border border-slate-800/80 shadow-lg flex-1 flex flex-col justify-between font-mono text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-hud-cyan tracking-wider font-semibold">ENGINEERING TENETS</span>
                <span className="text-slate-400">BENCHMARK // STRICT</span>
              </div>

              <div className="space-y-3 my-4">
                <div className="flex items-center gap-2.5 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Lock-free and striped sharding for zero mutex contention</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-hud-cyan shrink-0" />
                  <span>Sub-millisecond P99 response budget on critical paths</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-hud-teal shrink-0" />
                  <span>Zero-allocation buffer reuse across gRPC and WebSockets</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span>RUNTIME: GOLANG / NODE</span>
                <span className="text-emerald-400 font-semibold">SLA: 99.999%</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
