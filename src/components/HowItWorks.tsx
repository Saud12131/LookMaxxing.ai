'use client';

import { motion } from 'framer-motion';
import { LogIn, Upload, User, CheckCircle, Zap, FileText } from 'lucide-react';

const steps = [
  {
    icon: LogIn,
    title: 'Login',
    description: 'Sign up or log in to your account to get started.'
  },
  {
    icon: Zap,
    title: 'Start Transformation',
    description: 'Click on "Start Your Transformation" to begin your style journey.'
  },
  {
    icon: Upload,
    title: 'Upload Photo',
    description: 'Upload a clear, well-lit photo of yourself for analysis.'
  },
  {
    icon: User,
    title: 'Add Your Details',
    description: 'Answer simple questions about your face shape, skin tone, and style preferences.'
  },
  {
    icon: CheckCircle,
    title: 'Click "Let\'s Go"',
    description: 'Submit your information and let our AI work its magic.'
  },
  {
    icon: FileText,
    title: 'Get Your Report',
    description: 'Receive your personalized AI-powered style report instantly.'
  }
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-4 w-full bg-gradient-to-b from-slate-900/40 to-slate-900/70">
      <div className="max-w-6xl mx-auto text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">
          How It Works
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg">
          Get your personalized style transformation in just a few simple steps
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-6 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-xl flex flex-col items-start text-left"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center mr-4">
                  <Icon className="w-5 h-5 text-indigo-400" />
                </div>
                <span className="text-white font-semibold">Step {i + 1}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
