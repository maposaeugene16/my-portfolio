"use client";

import React, { useState, useEffect } from "react";
import { Server, Database, Shield, Layers, Radio, AlertTriangle, RefreshCw, Cpu, Activity, Play } from "lucide-react";
import { soundFx } from "./SoundManager";

interface ArchitectureNode {
  id: string;
  name: string;
  role: string;
  type: "gateway" | "loadbalancer" | "service" | "cache" | "raft-db" | "queue";
  status: "healthy" | "degraded" | "failed";
  tps: number;
  latency: string;
  details: string;
  tech: string;
}

export default function ArchitectureCanvas() {
  const [activeTab, setActiveTab] = useState<"flow" | "failover">("flow");
  const [isSimulatingSpike, setIsSimulatingSpike] = useState(false);
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode | null>(null);
  const [raftLeaderId, setRaftLeaderId] = useState<string>("db-node-1");
  const [isPartitioned, setIsPartitioned] = useState<boolean>(false);
  const [trafficPulse, setTrafficPulse] = useState<number>(0);

  const nodes: ArchitectureNode[] = [
    {
      id: "edge-waf",
      name: "Cloudflare Edge & WAF",
      role: "DDoS Mitigation & TLS Termination",
      type: "gateway",
      status: "healthy",
      tps: isSimulatingSpike ? 245000 : 42000,
      latency: "1.2ms",
      details: "Anycast routing, QUIC/HTTP3 termination, automated rate limiting using token bucket algorithm.",
      tech: "Rust / Cloudflare Workers"
    },
    {
      id: "envoy-lb",
      name: "Envoy Proxy L7 Mesh",
      role: "Dynamic Weighted Routing & Circuit Breaking",
      type: "loadbalancer",
      status: "healthy",
      tps: isSimulatingSpike ? 245000 : 42000,
      latency: "0.4ms",
      details: "Consistent hashing ring with virtual nodes, automatic health-checking and gRPC multiplexing.",
      tech: "Envoy / C++"
    },
    {
      id: "api-srv-1",
      name: "API Service Node A",
      role: "Stateless Execution Pod",
      type: "service",
      status: isPartitioned ? "degraded" : "healthy",
      tps: isSimulatingSpike ? 82000 : 14000,
      latency: "4.8ms",
      details: "Async event-loop runtime with Tokio, pooling DB connections with exponential backoff retry.",
      tech: "Rust / Tokio"
    },
    {
      id: "api-srv-2",
      name: "API Service Node B",
      role: "Stateless Execution Pod",
      type: "service",
      status: "healthy",
      tps: isSimulatingSpike ? 81500 : 14000,
      latency: "4.6ms",
      details: "Zero-copy JSON & Protobuf deserialization, distributed OpenTelemetry trace propagation.",
      tech: "Rust / Tokio"
    },
    {
      id: "redis-cache",
      name: "Redis Cluster (L1/L2)",
      role: "Distributed In-Memory Cache",
      type: "cache",
      status: "healthy",
      tps: isSimulatingSpike ? 210000 : 38000,
      latency: "0.35ms",
      details: "Sub-millisecond read throughput with bloom filters to eliminate cache-penetration penalties.",
      tech: "Redis 7 / Lua"
    },
    {
      id: "kafka-bus",
      name: "Kafka Event Broker",
      role: "Durable Write-Ahead Log",
      type: "queue",
      status: "healthy",
      tps: isSimulatingSpike ? 140000 : 25000,
      latency: "1.8ms",
      details: "Partitioned topic logs with exactly-once idempotency guarantees and zstd batch compression.",
      tech: "Apache Kafka / KRaft"
    },
    {
      id: "db-node-1",
      name: "Raft Leader Node 1",
      role: "Linearizable Replicated State Machine",
      type: "raft-db",
      status: isPartitioned ? "failed" : "healthy",
      tps: isSimulatingSpike ? 45000 : 8500,
      latency: isPartitioned ? "TIMEOUT" : "2.1ms",
      details: "Appends log entries to disk WAL, coordinates two-phase commit over TCP peer quorum.",
      tech: "Custom Raft / LSM-Tree"
    },
    {
      id: "db-node-2",
      name: "Raft Follower / Replica 2",
      role: isPartitioned ? "Promoted Raft Leader (Term 4)" : "Quorum Log Follower",
      type: "raft-db",
      status: "healthy",
      tps: isPartitioned ? (isSimulatingSpike ? 45000 : 8500) : 4200,
      latency: "2.3ms",
      details: "Maintains log parity with append-entry RPC heartbeats. Takes over via leader election on heartbeat timeout.",
      tech: "Custom Raft / LSM-Tree"
    }
  ];

  // Auto trigger traffic animation pulses
  useEffect(() => {
    const interval = setInterval(() => {
      setTrafficPulse((prev) => (prev + 1) % 100);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const triggerSpikeSimulation = () => {
    soundFx.playBeep(620, 0.1, "triangle");
    setIsSimulatingSpike(true);
    setTimeout(() => {
      setIsSimulatingSpike(false);
      soundFx.playSuccess();
    }, 4500);
  };

  const togglePartition = () => {
    soundFx.playBeep(320, 0.15, "sawtooth");
    const nextState = !isPartitioned;
    setIsPartitioned(nextState);
    if (nextState) {
      setRaftLeaderId("db-node-2");
    } else {
      setRaftLeaderId("db-node-1");
    }
  };

  return (
    <div className="w-full glass-panel rounded-2xl p-6 border border-cyan-500/20 bg-slate-900/60 shadow-2xl relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono mb-2">
            <Layers className="w-3.5 h-3.5" />
            CS Lab 02 // Distributed Topology Simulator
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            Production Distributed Micro-Architecture
          </h3>
          <p className="text-slate-400 text-sm mt-1">
            Simulate 250k+ req/sec traffic cascades, partition injection, and automatic Raft consensus failover.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={triggerSpikeSimulation}
            disabled={isSimulatingSpike}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-200 border ${
              isSimulatingSpike
                ? "bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/30 animate-pulse"
                : "bg-cyan-500/10 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20"
            }`}
          >
            <Activity className="w-4 h-4" />
            {isSimulatingSpike ? "Traffic Surge Active (245k TPS)..." : "Simulate 5x Traffic Spike"}
          </button>

          <button
            onClick={togglePartition}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-200 border ${
              isPartitioned
                ? "bg-rose-500/20 border-rose-500 text-rose-300"
                : "bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600"
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            {isPartitioned ? "Heal Partition (Recover Quorum)" : "Inject Leader Partition (Chaos)"}
          </button>
        </div>
      </div>

      {/* Visual Canvas Diagram */}
      <div className="my-6 p-4 rounded-xl bg-slate-950/80 border border-slate-800 relative overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none" />

        {/* Simulated packet flow streams */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
          {/* Column 1: Edge & Gateway */}
          <div className="flex flex-col gap-4">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
              Layer 1 // Ingress & Edge
            </span>
            {nodes.slice(0, 2).map((node) => (
              <NodeCard
                key={node.id}
                node={node}
                isSelected={selectedNode?.id === node.id}
                onSelect={() => {
                  soundFx.playClick();
                  setSelectedNode(node);
                }}
              />
            ))}
          </div>

          {/* Column 2: Stateless Compute Services */}
          <div className="flex flex-col gap-4">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
              Layer 2 // Compute & Logic
            </span>
            {nodes.slice(2, 4).map((node) => (
              <NodeCard
                key={node.id}
                node={node}
                isSelected={selectedNode?.id === node.id}
                onSelect={() => {
                  soundFx.playClick();
                  setSelectedNode(node);
                }}
              />
            ))}
          </div>

          {/* Column 3: In-Memory & Streaming */}
          <div className="flex flex-col gap-4">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
              Layer 3 // Caching & WAL
            </span>
            {nodes.slice(4, 6).map((node) => (
              <NodeCard
                key={node.id}
                node={node}
                isSelected={selectedNode?.id === node.id}
                onSelect={() => {
                  soundFx.playClick();
                  setSelectedNode(node);
                }}
              />
            ))}
          </div>

          {/* Column 4: Consensus & Storage */}
          <div className="flex flex-col gap-4">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
              Layer 4 // Consensus Quorum
            </span>
            {nodes.slice(6, 8).map((node) => (
              <NodeCard
                key={node.id}
                node={node}
                isSelected={selectedNode?.id === node.id}
                isLeader={raftLeaderId === node.id}
                onSelect={() => {
                  soundFx.playClick();
                  setSelectedNode(node);
                }}
              />
            ))}
          </div>
        </div>

        {/* Real-time topology banner */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Consensus State: {isPartitioned ? "Split-Brain Prevented (Leader Re-elected)" : "Linearizable Quorum (3/3 Nodes)"}
            </span>
            <span>•</span>
            <span className="text-cyan-400">P99 Replication Lag: 1.4ms</span>
          </div>
          <div className="text-slate-500">
            Click any node for deep micro-architecture specifications
          </div>
        </div>
      </div>

      {/* Selected Node Spec Inspector */}
      {selectedNode && (
        <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-cyan-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-in fade-in duration-200">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h4 className="text-white font-bold text-sm">{selectedNode.name}</h4>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800">
                {selectedNode.tech}
              </span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed max-w-2xl">
              {selectedNode.details}
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono shrink-0">
            <div>
              <span className="text-slate-500 block text-[10px]">THROUGHPUT</span>
              <span className="text-cyan-400 font-bold">{selectedNode.tps.toLocaleString()} ops/s</span>
            </div>
            <div className="w-[1px] h-6 bg-slate-800" />
            <div>
              <span className="text-slate-500 block text-[10px]">TAIL LATENCY</span>
              <span className="text-emerald-400 font-bold">{selectedNode.latency}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function NodeCard({
  node,
  isSelected,
  isLeader,
  onSelect,
}: {
  node: ArchitectureNode;
  isSelected: boolean;
  isLeader?: boolean;
  onSelect: () => void;
}) {
  const getIcon = () => {
    switch (node.type) {
      case "gateway":
        return <Shield className="w-4 h-4 text-cyan-400" />;
      case "loadbalancer":
        return <Radio className="w-4 h-4 text-blue-400" />;
      case "service":
        return <Cpu className="w-4 h-4 text-emerald-400" />;
      case "cache":
        return <Layers className="w-4 h-4 text-purple-400" />;
      case "queue":
        return <RefreshCw className="w-4 h-4 text-amber-400" />;
      case "raft-db":
        return <Database className="w-4 h-4 text-rose-400" />;
    }
  };

  const getStatusColor = () => {
    if (node.status === "failed") return "border-rose-500/60 bg-rose-950/30 text-rose-300";
    if (node.status === "degraded") return "border-amber-500/60 bg-amber-950/30 text-amber-300";
    return isSelected
      ? "border-cyan-400 bg-slate-900 shadow-md shadow-cyan-500/20"
      : "border-slate-800 bg-slate-900/90 hover:border-slate-700 hover:bg-slate-900";
  };

  return (
    <button
      onClick={onSelect}
      className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 relative group cursor-pointer ${getStatusColor()}`}
    >
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <div className="flex items-center gap-2">
          {getIcon()}
          <span className="font-semibold text-xs text-white group-hover:text-cyan-300 transition-colors">
            {node.name}
          </span>
        </div>
        {isLeader && (
          <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-rose-500 text-white uppercase tracking-tight">
            Leader
          </span>
        )}
      </div>

      <p className="text-[11px] text-slate-400 line-clamp-1 mb-2 font-mono">{node.role}</p>

      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1.5 border-t border-slate-800/80">
        <span>{node.tps.toLocaleString()} TPS</span>
        <span className={node.status === "failed" ? "text-rose-400 font-bold" : "text-emerald-400"}>
          {node.latency}
        </span>
      </div>
    </button>
  );
}
