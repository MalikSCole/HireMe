import {
  addEdge,
  Background,
  Controls,
  Handle,
  MiniMap,
  Position,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  type Connection,
  type Edge,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Database, RotateCcw, Sparkles, Trash2 } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

type ComponentKind = {
  id: string;
  label: string;
  role: string;
  when: string;
  group: "client" | "edge" | "service" | "state" | "async";
};

type ArchitectureNodeData = ComponentKind & {
  onDelete: (nodeId: string) => void;
  onSelect: (nodeId: string) => void;
};

const palette: ComponentKind[] = [
  {
    id: "browser",
    label: "Browser",
    role: "Starts user requests and renders responses.",
    when: "Every user-facing web system needs an entry client.",
    group: "client",
  },
  {
    id: "load-balancer",
    label: "Load Balancer",
    role: "Routes traffic across healthy service instances.",
    when: "Add when one server is not enough or failures must be isolated.",
    group: "edge",
  },
  {
    id: "api-gateway",
    label: "API Gateway",
    role: "Routes requests, enforces auth, and centralizes edge policy.",
    when: "Add when many clients or services need one controlled entry point.",
    group: "edge",
  },
  {
    id: "api",
    label: "API Service",
    role: "Validates requests and runs product logic.",
    when: "Add when clients need a trusted backend contract.",
    group: "service",
  },
  {
    id: "cache",
    label: "Redis Cache",
    role: "Serves repeated hot reads from memory.",
    when: "Add when read latency or database read load is the bottleneck.",
    group: "state",
  },
  {
    id: "database",
    label: "Database",
    role: "Stores durable source-of-truth records.",
    when: "Add when data must survive requests and be queried later.",
    group: "state",
  },
  {
    id: "queue",
    label: "Queue",
    role: "Buffers asynchronous work for workers.",
    when: "Add when work can happen after the user response or spikes need smoothing.",
    group: "async",
  },
  {
    id: "worker",
    label: "Worker",
    role: "Processes background jobs outside the request path.",
    when: "Add with a queue for emails, transcoding, analytics, or retries.",
    group: "async",
  },
  {
    id: "object-storage",
    label: "Object Storage",
    role: "Stores large files such as images, videos, and exports.",
    when: "Add when binary files would be expensive or awkward in the database.",
    group: "state",
  },
  {
    id: "cdn",
    label: "CDN",
    role: "Caches static or media content near users.",
    when: "Add when global users need lower latency for cacheable content.",
    group: "edge",
  },
  {
    id: "search",
    label: "Search Index",
    role: "Supports fast full-text or ranking queries.",
    when: "Add when database queries are not enough for search UX.",
    group: "state",
  },
  {
    id: "rate-limiter",
    label: "Rate Limiter",
    role: "Protects APIs from abuse or accidental overload.",
    when: "Add at the edge for public or expensive endpoints.",
    group: "edge",
  },
];

const baselineNodeKinds = ["browser", "load-balancer", "api", "cache", "database"];
const nodeTypes = { architecture: ArchitectureNode };

export function SystemDesignBuilder({ lessonSlug }: { lessonSlug: string }) {
  return (
    <ReactFlowProvider>
      <SystemDesignBuilderCanvas lessonSlug={lessonSlug} />
    </ReactFlowProvider>
  );
}

function SystemDesignBuilderCanvas({ lessonSlug }: { lessonSlug: string }) {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<ArchitectureNodeData>(
    createBaselineNodes({
      onDelete: (nodeId) => setNodes((current) => current.filter((node) => node.id !== nodeId)),
      onSelect: setSelectedNodeId,
    }),
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(createBaselineEdges(nodes));

  const selected = nodes.find((node) => node.id === selectedNodeId)?.data ?? nodes[0]?.data;
  const review = useMemo(() => reviewDesign(nodes, edges, lessonSlug), [nodes, edges, lessonSlug]);

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((current) =>
        addEdge(
          {
            ...connection,
            animated: true,
            style: { stroke: "#2563eb", strokeWidth: 2 },
          },
          current,
        ),
      );
    },
    [setEdges],
  );

  const addComponent = useCallback(
    (kindId: string) => {
      const kind = palette.find((item) => item.id === kindId);
      if (!kind) return;
      const count = nodes.filter((node) => node.data.id === kindId).length;
      const nodeId = `${kind.id}-${Date.now()}`;
      setNodes((current) => [
        ...current,
        {
          id: nodeId,
          type: "architecture",
          position: { x: 120 + (count % 4) * 190, y: 260 + Math.floor(count / 4) * 140 },
          data: {
            ...kind,
            label: count > 0 ? `${kind.label} ${count + 1}` : kind.label,
            onDelete: (id) => setNodes((items) => items.filter((node) => node.id !== id)),
            onSelect: setSelectedNodeId,
          },
        },
      ]);
      setSelectedNodeId(nodeId);
    },
    [nodes, setNodes],
  );

  function reset() {
    const resetNodes = createBaselineNodes({
      onDelete: (nodeId) => setNodes((current) => current.filter((node) => node.id !== nodeId)),
      onSelect: setSelectedNodeId,
    });
    setNodes(resetNodes);
    setEdges(createBaselineEdges(resetNodes));
    setSelectedNodeId(null);
  }

  return (
    <section className="mt-10 rounded-xl border bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">
            Interactive architecture builder
          </p>
          <h2 className="mt-2 text-2xl font-semibold">Build and connect the system</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
            Add components, drag them around the canvas, and connect handles to
            show request paths, cache reads, database writes, queue events, and
            background work.
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 rounded border px-3 py-2 text-sm font-medium hover:bg-gray-50"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[250px_minmax(0,1fr)]">
        <aside className="rounded-lg border bg-gray-50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Component palette
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
            {palette.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => addComponent(item.id)}
                className="block w-full rounded border bg-white p-3 text-left hover:border-blue-300 hover:bg-blue-50"
              >
                <span className="block text-sm font-semibold">{item.label}</span>
                <span className="mt-1 block text-xs leading-5 text-gray-600">{item.when}</span>
              </button>
            ))}
          </div>
        </aside>

        <div className="space-y-4">
          <div className="h-[560px] overflow-hidden rounded-lg border bg-gray-50">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={(_, node) => setSelectedNodeId(node.id)}
              fitView
            >
              <Background color="#cbd5e1" gap={18} />
              <Controls />
              <MiniMap pannable zoomable nodeStrokeWidth={3} />
            </ReactFlow>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-4">
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900">
                <Database className="h-4 w-4" />
                {selected?.label ?? "Select a component"}
              </p>
              <p className="mt-2 text-sm leading-6 text-gray-600">{selected?.role}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                When to add it
              </p>
              <p className="mt-1 text-sm leading-6 text-gray-600">{selected?.when}</p>
            </div>

            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-blue-950">
                <Sparkles className="h-4 w-4" />
                Design review
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-blue-950">
                {review.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArchitectureNode({ id, data, selected }: NodeProps<Node<ArchitectureNodeData>>) {
  return (
    <div
      onClick={() => data.onSelect(id)}
      className={`w-44 rounded-lg border bg-white p-3 shadow-sm ${
        selected ? "border-blue-500 ring-2 ring-blue-100" : "border-gray-200"
      }`}
    >
      <Handle type="target" position={Position.Left} className="!h-3 !w-3 !bg-blue-600" />
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-blue-700">
            {data.group}
          </p>
          <p className="mt-1 text-sm font-semibold text-gray-950">{data.label}</p>
        </div>
        <button
          type="button"
          aria-label={`Remove ${data.label}`}
          onClick={(event) => {
            event.stopPropagation();
            data.onDelete(id);
          }}
          className="rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-600"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
      <p className="mt-2 text-xs leading-5 text-gray-600">{data.role}</p>
      <Handle type="source" position={Position.Right} className="!h-3 !w-3 !bg-blue-600" />
    </div>
  );
}

function createBaselineNodes({
  onDelete,
  onSelect,
}: {
  onDelete: (nodeId: string) => void;
  onSelect: (nodeId: string) => void;
}) {
  return baselineNodeKinds.map((kindId, index) => {
    const kind = palette.find((item) => item.id === kindId) ?? palette[0];
    return {
      id: kind.id,
      type: "architecture",
      position: { x: 40 + index * 210, y: 130 },
      data: { ...kind, onDelete, onSelect },
    } satisfies Node<ArchitectureNodeData>;
  });
}

function createBaselineEdges(nodes: Array<Node<ArchitectureNodeData>>) {
  return nodes.slice(0, -1).map((node, index) => ({
    id: `${node.id}-${nodes[index + 1].id}`,
    source: node.id,
    target: nodes[index + 1].id,
    animated: true,
    style: { stroke: "#2563eb", strokeWidth: 2 },
  })) satisfies Edge[];
}

function reviewDesign(nodes: Array<Node<ArchitectureNodeData>>, edges: Edge[], lessonSlug: string) {
  const ids = new Set(nodes.map((node) => node.data.id));
  const connectedNodeIds = new Set(edges.flatMap((edge) => [edge.source, edge.target]));
  const feedback: string[] = [];

  if (!ids.has("api") && !ids.has("api-gateway"))
    feedback.push("Add an API entry point so trusted business logic has a clear home.");
  if (!ids.has("database")) feedback.push("Add durable storage unless this design is intentionally stateless.");
  if (ids.has("cache")) feedback.push("Good: the cache can reduce repeated read latency, but explain invalidation.");
  if (ids.has("queue") && !ids.has("worker")) feedback.push("A queue needs workers, otherwise jobs pile up with nowhere to run.");
  if (ids.has("object-storage") && !ids.has("cdn")) feedback.push("For user-facing media, pair object storage with a CDN to reduce global latency.");
  if (/youtube|netflix|dropbox|instagram|tiktok|spotify/.test(lessonSlug) && !ids.has("object-storage")) {
    feedback.push("This lesson likely needs object storage for large media or file payloads.");
  }
  if (/search|airbnb|instagram|youtube|spotify/.test(lessonSlug) && !ids.has("search")) {
    feedback.push("Consider a search index when users need fast discovery or ranking.");
  }
  if (/api|rate|gateway|public/.test(lessonSlug) && !ids.has("rate-limiter")) {
    feedback.push("Public APIs usually need rate limiting or abuse protection near the edge.");
  }
  if (nodes.some((node) => !connectedNodeIds.has(node.id))) {
    feedback.push("Connect every component or explain why it is intentionally out of band.");
  }

  return feedback.length > 0
    ? feedback.slice(0, 4)
    : ["Solid starting design. Now explain the bottleneck, failure mode, consistency model, and cost tradeoff for each component."];
}
