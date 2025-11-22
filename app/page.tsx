"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <main className="
      min-h-screen flex flex-col items-center justify-center 
      bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600 
      text-white px-6
      max-[368px]:px-3
    ">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="
          text-center max-w-2xl
          max-[368px]:max-w-xs 
          max-[368px]:mt-4
        "
      >
        <h1
          className="
            text-5xl font-bold mb-4
            max-[368px]:text-3xl
            min-[368px]:text-4xl
            min-[768px]:text-6xl
          "
        >
          Organize your{" "}
          <span className="text-yellow-300">Tasks</span> <br />
          like a Pro
        </h1>

        <p
          className="
            text-lg text-blue-100 mb-8
            max-[368px]:text-sm
            min-[368px]:text-base
            min-[768px]:text-lg
          "
        >
          Simple, fast and intuitive task manager built with Next.js & MongoDB.
          <br className="max-[368px]:hidden" />
          Keep everything under control in one place.
        </p>

        <Link
          href="/dashboard"
          className="
            bg-yellow-400 text-gray-900 font-semibold 
            px-8 py-3 rounded-2xl shadow-lg hover:bg-yellow-300 transition duration-300
            max-[368px]:px-5 max-[368px]:py-2
            min-[768px]:px-10 min-[768px]:py-4
          "
        >
          Go to Dashboard →
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="
          absolute bottom-10 flex gap-3
          max-[368px]:gap-2 max-[368px]:bottom-6
        "
      >
        <div className="w-3 h-3 rounded-full bg-white max-[368px]:w-2 max-[368px]:h-2"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-300 max-[368px]:w-2 max-[368px]:h-2"></div>
        <div className="w-3 h-3 rounded-full bg-purple-400 max-[368px]:w-2 max-[368px]:h-2"></div>
      </motion.div>
    </main>
  );
}
