'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Alex P.',
    role: 'Software Engineer',
    avatar: 'https://i.pravatar.cc/100?img=32',
    quote:
      'LookMaxxing.ai gave me a roadmap to elevate my appearance. The confidence boost is unreal!',
  },
  {
    name: 'Maria L.',
    role: 'UX Designer',
    avatar: 'https://i.pravatar.cc/100?img=29',
    quote:
      'I always struggled with finding the right colours. Now my wardrobe finally makes sense.',
  },
  {
    name: 'Jin K.',
    role: 'Content Creator',
    avatar: 'https://i.pravatar.cc/100?img=12',
    quote:
      'The AI photo analysis highlighted features I never knew I had. Totally worth it!',
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-transparent via-slate-900/40 to-transparent w-full">
      <div className="max-w-5xl mx-auto text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">
          What Our Users Say
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg">
          Thousands of people have transformed their style with LookMaxxing.ai.
        </p>
      </div>

      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-8 w-max"
          initial={{ x: 0 }}
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
        >
          {[...testimonials, ...testimonials].map((t, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="min-w-[20rem] bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl text-left flex flex-col gap-4"
            >
              <div className="flex items-center gap-4">
                <div>
                  <p className="font-semibold text-white">{t.name}</p>
                  <p className="text-sm text-gray-400">{t.role}</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">“{t.quote}”</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
