'use client';

import { motion } from 'framer-motion';
import { Camera, Palette, Sparkles, Users } from 'lucide-react';

const features = [
  {
    icon: Camera,
    title: 'AI Photo Analysis',
    description: 'Advanced computer-vision pinpoints your facial strengths and areas for improvement.'
  },
  {
    icon: Palette,
    title: 'Colour Palette Matching',
    description: 'Discover the colours that perfectly complement your unique skin tone and undertone.'
  },
  {
    icon: Users,
    title: 'Social Perception',
    description: 'Learn how people subconsciously read your current look and how to elevate it.'
  },
  {
    icon: Sparkles,
    title: 'Actionable Roadmap',
    description: 'Receive a step-by-step guide to maximise style, grooming and confidence.'
  },
];

export default function Features() {
  return (
    <section className="py-20 px-4 w-full bg-gradient-to-b from-transparent via-slate-900/40 to-transparent">
      <div className="max-w-6xl mx-auto text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">
          Why Choose Us?
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg font-bold">
        We prioritize your privacy - we do not save your images or personal data. Your information stays with you
        </p>
      </div>
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
        {features.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-8 backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl shadow-xl flex flex-col items-center text-center"
            >
              <Icon className="w-10 h-10 text-fuchsia-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
