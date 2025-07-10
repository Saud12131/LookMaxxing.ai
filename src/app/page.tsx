'use client';

import Head from 'next/head';
import { motion } from 'framer-motion';
import SlidingQuestions from '../components/slidingQuestions';
import Link from 'next/link';
// Import an animated icon (optional, e.g. from heroicons)
import { SparklesIcon } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-900 via-indigo-900 to-fuchsia-900 text-white flex flex-col relative overflow-hidden">
      <Head>
        <title>LookMaxxing.ai – Elevate Your Identity</title>
        <meta
          name="description"
          content="Redefine your personality and style with AI-powered insights. Step into your best version."
        />
      </Head>

      {/* Animated Gradient Blobs */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="absolute -top-24 -left-24 w-96 h-96 bg-purple-700 rounded-full filter blur-3xl pointer-events-none"
      />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{ duration: 1.3, delay: 0.4 }}
        className="absolute -bottom-32 -right-32 w-[32rem] h-[32rem] bg-indigo-700 rounded-full filter blur-3xl pointer-events-none"
      />

      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 drop-shadow-2xl"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-fuchsia-400 animate-gradient-x">
            Unlock Your Signature Persona
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-xl md:text-2xl text-gray-200 max-w-2xl mb-10 font-medium"
        >
          Upload your photo and let our AI stylist craft a <span className="text-fuchsia-300 font-semibold">personalized roadmap</span> to boost your style, confidence, and social impact.<br />
          <span className="text-indigo-300">Step up. Stand out. Shine bright.</span>
        </motion.p>

        {/* Glassmorphism Card with Sliding Questions */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.3 }}
          className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 mb-6 w-full max-w-xl mx-auto"
        >
          <SlidingQuestions />
        </motion.div>

        {/* Animated CTA Button */}
        <motion.div
          whileHover={{ scale: 1.07, rotate: 1 }}
          whileTap={{ scale: 0.96, rotate: -1 }}
          className="mt-10"
        >
          <Link
            href="/home"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:from-indigo-400 hover:to-fuchsia-400 text-white px-12 py-4 rounded-2xl font-bold shadow-2xl transition-all duration-200 text-lg tracking-wide"
          >
            <SparklesIcon className="w-6 h-6 text-white animate-spin-slow" />
            Start Your Transformation
          </Link>
        </motion.div>
      </main>

      {/* Features Section */}
      <Features />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 text-sm backdrop-blur-xl bg-white/5 border-t border-white/10 z-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.3 }}
        >
          &copy; {new Date().getFullYear()} LookMaxxing.ai. <span className="text-fuchsia-400">Redefine Yourself.</span>
        </motion.div>
      </footer>
    </div>
  );
}
