import React from "react";
import ChartsWrapper from "./ChartsWrapper";
import { useEVDataQuery } from "../hooks/useEVDataQuery";

const Dashboard: React.FC = () => {
  const { data, isLoading, error } = useEVDataQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading EV data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Error Loading Data
          </h2>
          <p className="text-gray-600">
            {error?.message || "An error occurred"}
          </p>
        </div>
      </div>
    );
  }

  if (!data || !data.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-4 sm:p-6 lg:p-8 ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-200/50 rounded-t-2xl">
          <div className="px-8 sm:px-12 lg:px-16 py-10">
            <div className="flex flex-col lg:flex-row items-center justify-between text-center lg:text-left">
              <div className="mb-6 lg:mb-0">
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Electric Vehicle Analytics Dashboard
                </h1>
                <p className="text-gray-600 mt-4 text-lg">
                  Comprehensive analysis of EV population data with interactive
                  insights
                </p>
              </div>
              <div className="text-center lg:text-right">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-4 rounded-xl shadow-lg">
                  <p className="text-sm font-medium opacity-90">Data Source</p>
                  <p className="text-lg font-bold">EV Population Dataset</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="bg-white/30 backdrop-blur-sm rounded-b-2xl shadow-lg">
          <div className="px-8 sm:px-12 lg:px-16 py-12">
            {/* Key Metrics */}
            <ChartsWrapper data={data} />

            {/* Footer */}
            <footer className="mt-20 pt-16">
              <div className="text-center">
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-10 shadow-lg max-w-lg mx-auto">
                  <div className="text-3xl mb-4">📊</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    Electric Vehicle Analytics Dashboard
                  </h3>
                  <p className="text-gray-600 text-lg">
                    Analyzing{" "}
                    <span className="font-bold text-blue-600">
                      {data.length.toLocaleString()}
                    </span>{" "}
                    electric vehicles
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
