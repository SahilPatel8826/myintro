
import React from 'react';
import { motion } from 'framer-motion';
import {
  Compass,
  GraduationCap,
  Target,
  CheckCircle2,
} from 'lucide-react';
import { PORTFOLIO_CONTENT } from '../../data/content';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative w-full bg-transparent py-24 border-t border-slate-400/15"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-hud-cyan mb-2 font-mono text-xs">
              <span className="tracking-widest">
                // FLIGHT RECORD 0x02
              </span>
              <span className="h-px w-12 bg-hud-cyan/40" />
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight drop-shadow-lg">
              The Explorer Behind the Code
            </h2>
          </div>

          <p className="font-mono text-xs text-slate-300 drop-shadow-md">
            {PORTFOLIO_CONTENT.personal.academicSpec}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Core Directives */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <div className="bg-slate-950/20 backdrop-blur-[2px] p-6 sm:p-8 rounded-2xl border border-slate-400/20 shadow-lg flex flex-col gap-5">
              <div className="flex items-center gap-3 text-hud-cyan">
                <div className="p-2.5 rounded-xl bg-slate-900/30 border border-hud-cyan/30">
                  <Compass className="w-5 h-5 text-hud-cyan" />
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-white drop-shadow-md">
                  Core Directives
                </h3>
              </div>

              <p className="font-sans text-sm sm:text-base text-slate-200 leading-relaxed">
                {PORTFOLIO_CONTENT.about.coreDirectives}
              </p>

              <p className="font-sans text-sm sm:text-base text-slate-200 leading-relaxed">
                {PORTFOLIO_CONTENT.about.secondaryDirective}
              </p>

              {/* Academic & Target Horizon Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 font-mono">
                {/* Academic Expedition */}
                <div className="bg-slate-900/20 backdrop-blur-sm p-4 rounded-xl border border-slate-400/20 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-hud-cyan/10 text-hud-cyan shrink-0">
                    <GraduationCap className="w-4 h-4" />
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-300 block tracking-wider">
                      ACADEMIC_EXPEDITION
                    </span>

                    <span className="font-display font-bold text-base sm:text-lg text-hud-cyan">
                      {PORTFOLIO_CONTENT.about.academicExpedition.period}
                    </span>

                    <span className="text-xs text-slate-300 block">
                      {PORTFOLIO_CONTENT.about.academicExpedition.degree}
                    </span>
                  </div>
                </div>

                {/* Target Horizon */}
                <div className="bg-slate-900/20 backdrop-blur-sm p-4 rounded-xl border border-slate-400/20 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-hud-teal/10 text-hud-teal shrink-0">
                    <Target className="w-4 h-4" />
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-300 block tracking-wider">
                      TARGET_HORIZON
                    </span>

                    <span className="font-display font-bold text-base sm:text-lg text-hud-teal">
                      {PORTFOLIO_CONTENT.about.targetHorizon.title}
                    </span>

                    <span className="text-xs text-slate-300 block">
                      {PORTFOLIO_CONTENT.about.targetHorizon.subtitle}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Cosmonaut Portrait Card */}
            <div className="bg-slate-950/20 backdrop-blur-[2px] p-6 rounded-2xl border border-slate-400/20 shadow-lg flex flex-col sm:flex-row items-center gap-6 overflow-hidden relative">
              {/* Subtle cyan glow */}
              <div className="absolute -top-16 -right-16 w-40 h-40 bg-hud-cyan/10 rounded-full blur-3xl pointer-events-none" />

              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden shrink-0 border-2 border-hud-cyan/40 shadow-[0_0_20px_rgba(0,240,255,0.25)] relative z-10">
                <img
                  src={PORTFOLIO_CONTENT.personal.astronautImage}
                  alt="Cosmonaut Explorer"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col text-left relative z-10">
                <span className="font-mono text-[10px] text-hud-cyan tracking-widest uppercase">
                  {PORTFOLIO_CONTENT.about.crewDossier.callsign}
                </span>

                <span className="font-display text-xl sm:text-2xl font-bold text-white mt-0.5 drop-shadow-md">
                  {PORTFOLIO_CONTENT.about.crewDossier.name}
                </span>

                <p className="font-sans text-xs sm:text-sm text-slate-200 mt-2 leading-relaxed">
                  "{PORTFOLIO_CONTENT.about.crewDossier.bio}"
                </p>
              </div>
            </div>

            {/* Architecture Tenets Card */}
            <div className="bg-slate-950/20 backdrop-blur-[2px] p-6 rounded-2xl border border-slate-400/20 shadow-lg flex-1 flex flex-col justify-between font-mono text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-400/15">
                <span className="text-hud-cyan tracking-wider font-semibold">
                  ENGINEERING TENETS
                </span>

                <span className="text-slate-300">
                  BENCHMARK // STRICT
                </span>
              </div>

              <div className="space-y-3 my-4">
                <div className="flex items-center gap-2.5 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    Lock-free and striped sharding for zero mutex contention
                  </span>
                </div>

                <div className="flex items-center gap-2.5 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-hud-cyan shrink-0" />
                  <span>
                    Sub-millisecond P99 response budget on critical paths
                  </span>
                </div>

                <div className="flex items-center gap-2.5 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-hud-teal shrink-0" />
                  <span>
                    Zero-allocation buffer reuse across gRPC and WebSockets
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-400/15 flex items-center justify-between text-[11px] text-slate-300">
                <span>RUNTIME: GOLANG / NODE</span>

                <span className="text-emerald-400 font-semibold">
                  SLA: 99.999%
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
