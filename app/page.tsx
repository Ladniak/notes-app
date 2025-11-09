"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600 text-white px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Organize your <span className="text-yellow-300">Tasks</span> <br />
          like a Pro
        </h1>
        <p className="text-lg text-blue-100 mb-8">
          Simple, fast and intuitive task manager built with Next.js & MongoDB.
          <br />
          Keep everything under control in one place.
        </p>

        <Link
          href="/dashboard"
          className="bg-yellow-400 text-gray-900 font-semibold px-8 py-3 rounded-2xl shadow-lg hover:bg-yellow-300 transition duration-300"
        >
          Go to Dashboard →
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="absolute bottom-10 flex gap-3"
      >
        <div className="w-3 h-3 rounded-full bg-white"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-300"></div>
        <div className="w-3 h-3 rounded-full bg-purple-400"></div>
      </motion.div>
    </main>
  );
}
