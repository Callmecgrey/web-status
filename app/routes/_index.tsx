import { Link } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "TeamerHQ - Team Communication Platform" },
    { name: "description", content: "Enterprise-grade team communication and collaboration platform" },
  ];
};

export default function Index() {
  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                TeamerHQ
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-300 max-w-2xl mx-auto">
              Where teams come together. Seamless communication, powerful collaboration.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Link
                to="/signup"
                className="px-8 py-4 bg-blue-500 text-white rounded-lg text-lg font-medium hover:bg-blue-600 transition-colors"
              >
                Get Started
              </Link>
              <Link
                to="/status"
                className="px-8 py-4 bg-gray-800 text-white rounded-lg text-lg font-medium hover:bg-gray-700 transition-colors"
              >
                System Status
              </Link>
            </div>
          </div>
        </div>
      </div>

      <footer className="py-6 text-center text-gray-400 border-t border-gray-800">
        <p>© {new Date().getFullYear()} TeamerHQ. All rights reserved.</p>
      </footer>
    </div>
  );
}