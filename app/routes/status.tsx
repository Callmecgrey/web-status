import { useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { 
  MessageSquare, 
  FileBox, 
  Search, 
  Key, 
  Video,
  Clock,
  ArrowUpRight,
  Activity,
  ChevronRight,
  Bell
} from "lucide-react";

export const meta: MetaFunction = () => {
  return [
    { title: "TeamerHQ Status" },
    { name: "description", content: "Current system status and performance metrics" },
  ];
};

type Service = {
  name: string;
  status: "operational" | "degraded" | "outage";
  uptime: number;
  responseTime: number;
  icon: React.ReactNode;
};

type Incident = {
  id: string;
  title: string;
  status: "investigating" | "identified" | "monitoring" | "resolved";
  date: string;
  description: string;
  updates: { time: string; message: string }[];
};

export default function Status() {
  const [services] = useState<Service[]>([
    { 
      name: "Chat Service", 
      status: "operational", 
      uptime: 99.99, 
      responseTime: 45,
      icon: <MessageSquare className="w-5 h-5 text-gray-400" />
    },
    { 
      name: "File Storage", 
      status: "operational", 
      uptime: 99.95, 
      responseTime: 120,
      icon: <FileBox className="w-5 h-5 text-gray-400" />
    },
    { 
      name: "Search Engine", 
      status: "operational", 
      uptime: 99.99, 
      responseTime: 85,
      icon: <Search className="w-5 h-5 text-gray-400" />
    },
    { 
      name: "Authentication", 
      status: "degraded", 
      uptime: 98.50, 
      responseTime: 250,
      icon: <Key className="w-5 h-5 text-gray-400" />
    },
    { 
      name: "Video Calls", 
      status: "operational", 
      uptime: 99.90, 
      responseTime: 150,
      icon: <Video className="w-5 h-5 text-gray-400" />
    },
  ]);

  const [incidents] = useState<Incident[]>([
    {
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
    },
    {
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
    },
  ]);

  const getStatusColor = (status: Service["status"]) => {
    switch (status) {
      case "operational":
        return "bg-green-400";
      case "degraded":
        return "bg-yellow-400";
      case "outage":
        return "bg-red-400";
      default:
        return "bg-gray-400";
    }
  };

  const getIncidentStatusColor = (status: Incident["status"]) => {
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
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-white text-xl font-semibold flex items-center gap-2">
                <Activity className="w-6 h-6" />
                TeamerHQ Status
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Bell className="w-5 h-5 text-gray-400" />
              <time className="text-sm text-gray-400">
                Last updated: {new Date().toLocaleTimeString()}
              </time>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-8">
        {/* Status Overview */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-lg">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
              <h1 className="text-2xl font-medium text-white">All Systems Operational</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-gray-400" />
              <span className="text-gray-400">99.95%</span>
              <span className="text-gray-400">uptime</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.name}
                className="bg-gray-800/50 rounded-xl p-4 hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    {service.icon}
                    <h3 className="text-white font-medium">{service.name}</h3>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(service.status)}`} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-400">Response Time</div>
                    <div className="text-lg font-semibold text-white">{service.responseTime}ms</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Uptime</div>
                    <div className="text-lg font-semibold text-white">{service.uptime}%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Incidents */}
        <div className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-medium text-white">Recent Incidents</h2>
          </div>
          <div className="divide-y divide-gray-700">
            {incidents.map((incident) => (
              <Link
                to={`/status/incidents/${incident.id}`}
                key={incident.id}
                className="block p-6 hover:bg-gray-750 transition-colors group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <h3 className="text-lg font-medium text-white group-hover:text-blue-400 transition-colors flex items-center gap-2">
                      {incident.title}
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getIncidentStatusColor(
                        incident.status
                      )}`}
                    >
                      {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <time className="text-sm text-gray-400">{incident.date}</time>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <p className="text-gray-300 mb-6">{incident.description}</p>
                <div className="space-y-4 pl-4 border-l-2 border-gray-700">
                  {incident.updates.slice(0, 1).map((update, index) => (
                    <div key={index} className="relative">
                      <div className="absolute -left-[25px] top-2 w-3 h-3 rounded-full border-2 border-gray-700 bg-gray-900"></div>
                      <div>
                        <div className="text-sm font-medium text-gray-300">{update.time}</div>
                        <p className="text-gray-400 mt-1">{update.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-2xl p-6">
            <div className="text-sm text-gray-400 mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Average Response Time
            </div>
            <div className="text-3xl font-bold text-white">130ms</div>
            <div className="mt-2 text-sm text-blue-400">↓ 12% from last week</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-2xl p-6">
            <div className="text-sm text-gray-400 mb-2 flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Total Uptime
            </div>
            <div className="text-3xl font-bold text-white">99.95%</div>
            <div className="mt-2 text-sm text-purple-400">↑ 0.03% from last month</div>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-2xl p-6">
            <div className="text-sm text-gray-400 mb-2 flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Active Incidents
            </div>
            <div className="text-3xl font-bold text-white">1</div>
            <div className="mt-2 text-sm text-green-400">All other systems operational</div>
          </div>
        </div>
      </main>
    </div>
  );
}