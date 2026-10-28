"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Play, RotateCcw, Shuffle, Zap, Info, CheckCircle2, ChevronRight } from "lucide-react";
import { soundFx } from "./SoundManager";

const ROWS = 15;
const COLS = 25;

type Node = {
  row: number;
  col: number;
  isStart: boolean;
  isEnd: boolean;
  isWall: boolean;
  isVisited: boolean;
  isPath: boolean;
  distance: number;
  heuristic: number;
  totalCost: number;
  previousNode: Node | null;
};

export default function AlgorithmVisualizer() {
  const [grid, setGrid] = useState<Node[][]>([]);
  const [startPos, setStartPos] = useState<[number, number]>([7, 3]);
  const [endPos, setEndPos] = useState<[number, number]>([7, 21]);
  const [isRunning, setIsRunning] = useState(false);
  const [algo, setAlgo] = useState<"astar" | "dijkstra" | "bfs">("astar");
  const [stats, setStats] = useState({
    visitedCount: 0,
    pathLength: 0,
    executionTimeMs: 0,
    completed: false,
  });
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [wallMode, setWallMode] = useState<boolean>(true);
  const timeoutIdsRef = useRef<NodeJS.Timeout[]>([]);

  // Initialize clean grid
  const initializeGrid = useCallback((start = startPos, end = endPos) => {
    timeoutIdsRef.current.forEach(clearTimeout);
    timeoutIdsRef.current = [];
    setIsRunning(false);

    const initialGrid: Node[][] = [];
    for (let r = 0; r < ROWS; r++) {
      const currentRow: Node[] = [];
      for (let c = 0; c < COLS; c++) {
        currentRow.push({
          row: r,
          col: c,
          isStart: r === start[0] && c === start[1],
          isEnd: r === end[0] && c === end[1],
          isWall: false,
          isVisited: false,
          isPath: false,
          distance: Infinity,
          heuristic: 0,
          totalCost: Infinity,
          previousNode: null,
        });
      }
      initialGrid.push(currentRow);
    }
    setGrid(initialGrid);
    setStats({ visitedCount: 0, pathLength: 0, executionTimeMs: 0, completed: false });
  }, [startPos, endPos]);

  useEffect(() => {
    initializeGrid();
    return () => {
      timeoutIdsRef.current.forEach(clearTimeout);
    };
  }, [initializeGrid]);

  // Generate Maze / Random Walls
  const generateRandomMaze = () => {
    if (isRunning) return;
    soundFx.playClick();
    initializeGrid();

    setGrid((prev) => {
      return prev.map((row) =>
        row.map((node) => {
          if (node.isStart || node.isEnd) return node;
          const isWall = Math.random() < 0.28;
          return { ...node, isWall, isVisited: false, isPath: false };
        })
      );
    });
  };

  const handleCellClick = (r: number, c: number) => {
    if (isRunning) return;
    soundFx.playKeypress();
    const newGrid = [...grid.map(row => [...row])];
    const target = newGrid[r][c];
    if (target.isStart || target.isEnd) return;
    target.isWall = !target.isWall;
    setGrid(newGrid);
  };

  const handleCellMouseEnter = (r: number, c: number) => {
    if (!isMouseDown || isRunning) return;
    const newGrid = [...grid.map(row => [...row])];
    const target = newGrid[r][c];
    if (target.isStart || target.isEnd) return;
    target.isWall = wallMode;
    setGrid(newGrid);
  };

  const runVisualizer = () => {
    if (isRunning) return;
    soundFx.playClick();
    setIsRunning(true);
    setStats(prev => ({ ...prev, completed: false }));

    // Clear previous visited/path markers
    const workingGrid: Node[][] = grid.map(row =>
      row.map(node => ({
        ...node,
        isVisited: false,
        isPath: false,
        distance: Infinity,
        heuristic: 0,
        totalCost: Infinity,
        previousNode: null,
      }))
    );

    const startTime = performance.now();
    const visitedNodesInOrder: Node[] = [];
    const startNode = workingGrid[startPos[0]][startPos[1]];
    const endNode = workingGrid[endPos[0]][endPos[1]];

    startNode.distance = 0;
    startNode.heuristic = Math.abs(startNode.row - endNode.row) + Math.abs(startNode.col - endNode.col);
    startNode.totalCost = startNode.heuristic;

    const unvisited: Node[] = [startNode];
    const visitedSet = new Set<string>();

    let found = false;

    while (unvisited.length > 0) {
      if (algo === "astar") {
        unvisited.sort((a, b) => a.totalCost - b.totalCost || a.heuristic - b.heuristic);
      } else if (algo === "dijkstra") {
        unvisited.sort((a, b) => a.distance - b.distance);
      }

      const current = algo === "bfs" ? unvisited.shift()! : unvisited.shift()!;
      const key = `${current.row},${current.col}`;

      if (visitedSet.has(key)) continue;
      visitedSet.add(key);

      if (current.isWall) continue;
      visitedNodesInOrder.push(current);

      if (current.row === endNode.row && current.col === endNode.col) {
        found = true;
        break;
      }

      // Check neighbors
      const neighbors: Node[] = [];
      const { row, col } = current;
      if (row > 0) neighbors.push(workingGrid[row - 1][col]);
      if (row < ROWS - 1) neighbors.push(workingGrid[row + 1][col]);
      if (col > 0) neighbors.push(workingGrid[row][col - 1]);
      if (col < COLS - 1) neighbors.push(workingGrid[row][col + 1]);

      for (const neighbor of neighbors) {
        if (neighbor.isWall || visitedSet.has(`${neighbor.row},${neighbor.col}`)) continue;

        const tentativeDist = current.distance + 1;
        if (tentativeDist < neighbor.distance) {
          neighbor.distance = tentativeDist;
          neighbor.previousNode = current;
          neighbor.heuristic = Math.abs(neighbor.row - endNode.row) + Math.abs(neighbor.col - endNode.col);
          neighbor.totalCost = neighbor.distance + neighbor.heuristic;

          if (!unvisited.includes(neighbor)) {
            unvisited.push(neighbor);
          }
        }
      }
    }

    const endTime = performance.now();
    const duration = Math.round((endTime - startTime) * 100) / 100;

    // Backtrack path
    const nodesInShortestPath: Node[] = [];
    if (found) {
      let curr: Node | null = workingGrid[endPos[0]][endPos[1]];
      while (curr !== null) {
        nodesInShortestPath.unshift(curr);
        curr = curr.previousNode;
      }
    }

    // Animate Visited Nodes
    visitedNodesInOrder.forEach((node, idx) => {
      const id = setTimeout(() => {
        setGrid(prev => {
          const next = [...prev.map(r => [...r])];
          if (!next[node.row][node.col].isStart && !next[node.row][node.col].isEnd) {
            next[node.row][node.col].isVisited = true;
          }
          return next;
        });

        // Trigger path animation after visited is done
        if (idx === visitedNodesInOrder.length - 1) {
          animatePath(nodesInShortestPath, duration, visitedNodesInOrder.length);
        }
      }, idx * 12);
      timeoutIdsRef.current.push(id);
    });

    if (visitedNodesInOrder.length === 0) {
      setIsRunning(false);
    }
  };

  const animatePath = (pathNodes: Node[], execTime: number, visitedCount: number) => {
    pathNodes.forEach((node, idx) => {
      const id = setTimeout(() => {
        setGrid(prev => {
          const next = [...prev.map(r => [...r])];
          if (!next[node.row][node.col].isStart && !next[node.row][node.col].isEnd) {
            next[node.row][node.col].isPath = true;
          }
          return next;
        });

        if (idx === pathNodes.length - 1) {
          setIsRunning(false);
          soundFx.playSuccess();
          setStats({
            visitedCount,
            pathLength: pathNodes.length,
            executionTimeMs: execTime,
            completed: true,
          });
        }
      }, idx * 28);
      timeoutIdsRef.current.push(id);
    });

    if (pathNodes.length === 0) {
      setIsRunning(false);
      setStats({
        visitedCount,
        pathLength: 0,
        executionTimeMs: execTime,
        completed: true,
      });
    }
  };

  return (
    <div className="w-full glass-panel rounded-2xl p-6 border border-emerald-500/20 bg-slate-900/60 shadow-2xl relative overflow-hidden">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono mb-2">
            <Zap className="w-3.5 h-3.5" />
            CS Lab 01 // Graph Theory & Asymptotics
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            Interactive Pathfinding Engine
          </h3>
          <p className="text-slate-400 text-sm mt-1">
            Draw obstacle walls, select heuristic algorithms, and observe search frontiers in real-time.
          </p>
        </div>

        {/* Algorithm Selection */}
        <div className="flex flex-wrap items-center gap-2">
          {(
            [
              { id: "astar", label: "A* Search", complexity: "O((V+E) log V)" },
              { id: "dijkstra", label: "Dijkstra", complexity: "O(E + V log V)" },
              { id: "bfs", label: "Breadth-First (BFS)", complexity: "O(V + E)" }
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (!isRunning) {
                  soundFx.playClick();
                  setAlgo(item.id);
                }
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 border ${
                algo === item.id
                  ? "bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-sm shadow-emerald-500/20"
                  : "bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-600"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Canvas */}
      <div
        className="my-6 overflow-x-auto pb-2 flex justify-center select-none"
        onMouseDown={() => setIsMouseDown(true)}
        onMouseUp={() => setIsMouseDown(false)}
        onMouseLeave={() => setIsMouseDown(false)}
      >
        <div className="grid gap-[2px] bg-slate-950 p-3 rounded-xl border border-slate-800/80 shadow-inner inline-block">
          {grid.map((row, r) => (
            <div key={r} className="flex gap-[2px]">
              {row.map((cell, c) => {
                let cellClass = "bg-slate-900 border-slate-800/40";
                let content = null;

                if (cell.isStart) {
                  cellClass = "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/50 scale-105 z-10 font-bold";
                  content = "S";
                } else if (cell.isEnd) {
                  cellClass = "bg-rose-500 text-white shadow-md shadow-rose-500/50 scale-105 z-10 font-bold";
                  content = "E";
                } else if (cell.isPath) {
                  cellClass = "bg-amber-400 border-amber-300 shadow-sm shadow-amber-400/40 animate-pulse";
                } else if (cell.isVisited) {
                  cellClass = "bg-cyan-900/60 border-cyan-700/50";
                } else if (cell.isWall) {
                  cellClass = "bg-slate-600 border-slate-500";
                }

                return (
                  <button
                    key={`${r}-${c}`}
                    aria-label={`Grid node row ${r} column ${c}`}
                    type="button"
                    onClick={() => handleCellClick(r, c)}
                    onMouseEnter={() => handleCellMouseEnter(r, c)}
                    className={`w-6 h-6 md:w-7 md:h-7 rounded-[4px] border text-[10px] font-mono flex items-center justify-center transition-all duration-150 ${cellClass}`}
                  >
                    {content}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Control Buttons & Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center pt-2">
        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={runVisualizer}
            disabled={isRunning}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-semibold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/25"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            {isRunning ? "Simulating Graph Search..." : "Execute Search"}
          </button>

          <button
            onClick={generateRandomMaze}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 text-sm font-medium border border-slate-700 transition-all duration-200 disabled:opacity-50"
          >
            <Shuffle className="w-4 h-4 text-slate-400" />
            Random Obstacles
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              initializeGrid();
            }}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 text-sm font-medium border border-slate-700 transition-all duration-200 disabled:opacity-50"
          >
            <RotateCcw className="w-4 h-4 text-slate-400" />
            Reset
          </button>
        </div>

        {/* Real-time Metrics readout */}
        <div className="flex items-center justify-start md:justify-end gap-6 text-xs font-mono bg-slate-950/70 p-3 rounded-xl border border-slate-800">
          <div>
            <span className="text-slate-500 block">Nodes Explored</span>
            <span className="text-cyan-400 font-bold text-sm">{stats.visitedCount}</span>
          </div>
          <div className="w-[1px] h-6 bg-slate-800" />
          <div>
            <span className="text-slate-500 block">Path Cost</span>
            <span className="text-amber-400 font-bold text-sm">
              {stats.pathLength > 0 ? `${stats.pathLength} hops` : "0"}
            </span>
          </div>
          <div className="w-[1px] h-6 bg-slate-800" />
          <div>
            <span className="text-slate-500 block">Compute Duration</span>
            <span className="text-emerald-400 font-bold text-sm">
              {stats.executionTimeMs}ms
            </span>
          </div>
        </div>
      </div>

      {/* Algorithm description footer */}
      <div className="mt-5 p-3 rounded-xl bg-slate-900/40 border border-slate-800/80 flex items-start gap-3 text-xs text-slate-400 font-mono">
        <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          {algo === "astar" && (
            <span>
              <strong className="text-slate-200">A* Search:</strong> Uses Manhattan distance heuristic \(f(n) = g(n) + h(n)\) for targeted node expansion, prioritizing the most promising direction toward the target vertex.
            </span>
          )}
          {algo === "dijkstra" && (
            <span>
              <strong className="text-slate-200">Dijkstra's Algorithm:</strong> Guaranteed optimal shortest path for uniform edge weights, expanding radially outward using a priority queue.
            </span>
          )}
          {algo === "bfs" && (
            <span>
              <strong className="text-slate-200">Breadth-First Search:</strong> First-In-First-Out queue traversal. Guarantees the path with minimum number of transitions in unweighted graphs.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
