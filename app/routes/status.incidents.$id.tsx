import { useParams, Link } from "@remix-run/react";
import { Activity, ArrowLeft, Clock } from "lucide-react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Incident Details - TeamerHQ Status" },
    { name: "description", content: "Detailed incident information and updates" },
  ];
};

const incidents = {
  "1": {
    id: "1",
    title: "Authentication Service Degraded Performance",
    status: "monitoring",
    date: "2024-03-21",
    description: "We are experiencing increased latency in our authentication services.",
    updates: [
      {
        time: "09:45 UTC",
        message: "Our team has identified the root cause and implemented initial fixes.",
      },
      {
        time: "08:30 UTC",
        message: "Investigation revealed increased load on authentication servers.",
      },
    ],
    affectedServices: ["Authentication", "Chat Service"],
    impact: "Medium",
    resolution: "In Progress",
  },
  "2": {
    id: "2",
    title: "Scheduled Platform Maintenance",
    status: "resolved",
    date: "2024-03-20",
    description: "Completed scheduled maintenance and performance improvements.",
    updates: [
      {
        time: "04:00 UTC",
        message: "Maintenance completed successfully. All systems operational.",
      },
    ],
    affectedServices: ["All Services"],
    impact: "Low",
    resolution: "Completed",
  },
};

export default function IncidentDetails() {
  const { id } = useParams();
  const incident = incidents[id as keyof typeof incidents];

  if (!incident) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Incident Not Found</h1>
          <Link to="/status" className="text-blue-400 hover:text-blue-300">
            Return to Status Page
          </Link>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "investigating":
        return "text-red-400 bg-red-400/10";
      case "identified":
        return "text-yellow-400 bg-yellow-400/10";
      case "monitoring":
        return "text-blue-400 bg-blue-400/10";
      case "resolved":
        return "text-green-400 bg-green-400/10";
      default:
        return "text-gray-400 bg-gray-400/10";
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 pb-12">
      <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/status" className="text-white text-xl font-semibold flex items-center gap-2">
                <Activity className="w-6 h-6" />
                TeamerHQ Status
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          to="/status"
          className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Status Page
        </Link>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-white">{incident.title}</h1>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                incident.status
              )}`}
            >
              {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-400">Affected Services</h3>
                <div className="mt-1 text-white">{incident.affectedServices.join(", ")}</div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400">Impact Level</h3>
                <div className="mt-1 text-white">{incident.impact}</div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-400">Started</h3>
                <div className="mt-1 text-white">{incident.date}</div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400">Resolution</h3>
                <div className="mt-1 text-white">{incident.resolution}</div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8">
            <h2 className="text-xl font-medium text-white mb-6">Incident Timeline</h2>
            <div className="space-y-6">
              {incident.updates.map((update, index) => (
                <div key={index} className="relative pl-6 pb-6 last:pb-0">
                  <div className="absolute left-0 top-2 w-3 h-3 rounded-full border-2 border-gray-700 bg-gray-900"></div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <time className="text-sm font-medium text-gray-300">{update.time}</time>
                  </div>
                  <p className="text-gray-300">{update.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}