import React, { useState } from 'react';
import { Network, ArrowRight, Layers, Shield, Terminal, Zap, GitCommit } from 'lucide-react';

interface NodeDetail {
  id: string;
  name: string;
  tech: string;
  role: string;
  throughput: string;
  latency: string;
  description: string;
}

export const ArchitectureShowcase: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string>('gateway');

  const nodes: Record<string, NodeDetail> = {
    ingress: {
      id: 'ingress',
      name: 'Cloudflare Edge / Ingress',
      tech: 'Anycast DNS • TLS 1.3 Termination',
      role: 'DDoS mitigation and global edge routing',
      throughput: '85,000 req/sec',
      latency: '1.2ms',
      description: 'Terminates client TLS connections, validates rate-limiting quotas, and routes payloads to optimal regional cluster gateways.',
    },
    gateway: {
      id: 'gateway',
      name: 'Go API Gateway & Auth Mesh',
      tech: 'Go (Golang) • Fiber • JWT • eBPF',
      role: 'Sub-millisecond route dispatch & token verification',
      throughput: '320,000 req/sec',
      latency: '0.8ms',
      description: 'Stateless Go reverse-proxy with zero allocation routing, circuit breaking, dynamic upstream load balancing, and mutual TLS.',
    },
    eventbus: {
      id: 'eventbus',
      name: 'Event Stream Pipeline',
      tech: 'Apache Kafka • Go Sarama • Schema Registry',
      role: 'Durable append-only event log with partition replication',
      throughput: '1,200,000 msg/sec',
      latency: '2.4ms',
      description: 'Distributed event bus enabling event sourcing across consumer microservices with strict order guarantees and consumer group autoscaling.',
    },
    workers: {
      id: 'workers',
      name: 'Worker Daemon Fleet',
      tech: 'Go Goroutines • Node.js Worker Threads',
      role: 'Asynchronous task execution and heavy data compute',
      throughput: '45,000 jobs/sec',
      latency: '12ms',
      description: 'Concurrent worker pool with backpressure-regulated queues, automatic task retry with exponential jitter, and dead letter routing.',
    },
    storage: {
      id: 'storage',
      name: 'Hybrid Persistence Layer',
      tech: 'PostgreSQL 16 • Redis Cluster • Raft',
      role: 'ACID transaction store and sub-millisecond hot cache',
      throughput: '180,000 ops/sec',
      latency: '0.4ms (Cache) / 4.1ms (DB)',
      description: 'Multi-AZ PostgreSQL cluster with read replicas and connection pooling via PgBouncer, fronted by an in-memory Redis cluster for hot sessions.',
    },
  };

  const active = nodes[selectedNode];

  return (
    <section id="systems" className="py-24 px-6 border-t border-slate-900 bg-space-900/40 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <div className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-2">
              // DISTRIBUTED SYSTEMS TOPOLOGY
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white">
              High-Throughput Microservice Architecture
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md mt-3 md:mt-0 font-mono">
            Click on any node in the topology below to inspect internal metrics, protocols, and latency budgets.
          </p>
        </div>

        {/* Interactive Architecture Flow Graph */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Diagram Pipeline */}
          <div className="lg:col-span-7 bg-slate-950/80 p-6 sm:p-8 rounded-2xl border border-slate-800/80 flex flex-col justify-between space-y-4">
            <div className="text-xs font-mono text-slate-400 flex items-center justify-between pb-4 border-b border-slate-800/60">
              <span className="flex items-center space-x-2">
                <Network className="w-4 h-4 text-cyan-400" />
                <span>TOPOLOGY PIPELINE: REGION US-EAST-1</span>
              </span>
              <span className="text-emerald-400 font-semibold">STATUS: OPTIMAL</span>
            </div>

            <div className="flex flex-col space-y-3.5 my-4">
              {Object.values(nodes).map((node, index) => {
                const isSelected = selectedNode === node.id;
                return (
                  <div key={node.id} className="flex flex-col">
                    <button
                      onClick={() => setSelectedNode(node.id)}
                      className={`w-full p-4 rounded-xl text-left transition-all duration-200 cursor-pointer border flex items-center justify-between group ${
                        isSelected
                          ? 'bg-cyan-950/50 border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.2)]'
                          : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3.5">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                            isSelected
                              ? 'bg-cyan-400 text-slate-950'
                              : 'bg-slate-800 text-slate-300 group-hover:text-cyan-400'
                          }`}
                        >
                          0{index + 1}
                        </div>
                        <div>
                          <div className={`font-semibold text-sm ${isSelected ? 'text-cyan-300' : 'text-slate-200'}`}>
                            {node.name}
                          </div>
                          <div className="text-xs text-slate-400 font-mono mt-0.5">
                            {node.tech}
                          </div>
                        </div>
                      </div>

                      <div className="hidden sm:flex items-center space-x-4 font-mono text-xs">
                        <span className="text-cyan-400/90">{node.latency}</span>
                        <ArrowRight
                          className={`w-4 h-4 transition-transform ${
                            isSelected ? 'text-cyan-300 translate-x-1' : 'text-slate-600'
                          }`}
                        />
                      </div>
                    </button>

                    {index < Object.values(nodes).length - 1 && (
                      <div className="flex justify-center my-1">
                        <div className="w-0.5 h-3 bg-gradient-to-b from-cyan-500/40 to-slate-800" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Selected Node Inspector */}
          <div className="lg:col-span-5 bg-slate-950/90 p-6 sm:p-8 rounded-2xl border border-cyan-500/30 flex flex-col justify-between shadow-[0_0_30px_rgba(0,240,255,0.08)]">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs font-mono text-cyan-400 tracking-wider">
                  NODE INSPECTION // {active.id.toUpperCase()}
                </span>
                <span className="flex items-center space-x-1.5 text-xs font-mono text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>ONLINE</span>
                </span>
              </div>

              <div className="mt-6">
                <h3 className="text-2xl font-bold font-display text-white mb-2">
                  {active.name}
                </h3>
                <div className="inline-block px-3 py-1 rounded-md bg-slate-900 border border-slate-700 text-xs font-mono text-cyan-300 mb-4">
                  {active.tech}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6 font-sans">
                  {active.description}
                </p>
              </div>

              <div className="space-y-4 font-mono">
                <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <div className="text-xs text-slate-400 mb-1">MEASURED THROUGHPUT</div>
                  <div className="text-lg font-bold text-cyan-300">{active.throughput}</div>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <div className="text-xs text-slate-400 mb-1">LATENCY PROFILE (P99)</div>
                  <div className="text-lg font-bold text-emerald-400">{active.latency}</div>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <div className="text-xs text-slate-400 mb-1">CORE RESPONSIBILITY</div>
                  <div className="text-xs text-slate-200">{active.role}</div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-500">
              <span>ZERO ALLOCATION ENGINE</span>
              <span>TLS / GRPC / KAFKA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
