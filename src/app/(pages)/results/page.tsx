'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { GetResultByID } from '@/actions/responseActions';

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const [aiResponse, setAiResponse] = useState('');
  const [aiImage, setAiImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Format the text with proper HTML elements
  const formattedText = useMemo(() => {
    if (!aiResponse) return '';

    // Convert markdown headers to HTML
    const formatted = aiResponse
      // Handle ## headers
      .replace(/^##\s*(.*?)$/gm, '<h2 class="text-2xl font-bold text-pink-400 mt-6 mb-3">$1</h2>')
      // Handle ### headers
      .replace(/^###\s*(.*?)$/gm, '<h3 class="text-xl font-semibold text-white mt-5 mb-2">$1</h3>')
      // Handle **bold** text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-pink-300">$1</strong>')
      // Convert single line breaks to <br> for better spacing
      .replace(/\n/g, '<br />');
    
    // Wrap the entire content in a div with prose styling for better typography
    return `<div class="prose prose-invert max-w-none">${formatted}</div>`;
  }, [aiResponse]);
  
  useEffect(() => {
    const fetchResult = async () => {
      const id = searchParams.get('id');
      
      if (!id) {
        window.location.href = '/';
        return;
      }

      try {
        const result = await GetResultByID(Number(id));
        // console.log(result);
        
        if (result?.AiResponse) {
          setAiResponse(result.AiResponse);
          if (result.AiImage) {
            setAiImage(result.AiImage);
          }
        } else {
          setError('Result not found');
        }
      } catch (err) {
        console.error('Error fetching result:', err);
        setError('Failed to load result. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchResult();
  }, [searchParams]);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };
 const image = `data:image/jpeg;base64,${aiImage}`
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-900 via-indigo-900 to-fuchsia-900 text-white flex flex-col relative overflow-hidden py-12 px-4">
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

      <Navbar />

      <div className="max-w-4xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-fuchsia-500 bg-clip-text text-transparent">
            Your Personalized Look Report
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Here's what our AI recommends to enhance your look
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full filter blur-3xl -mr-16 -mt-16" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full filter blur-3xl -ml-32 -mb-32" />
          
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center justify-center py-16 space-y-6"
              >
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <motion.div
                    className="absolute -inset-2 border-2 border-pink-500/30 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-semibold text-pink-400">Crafting Your Report</h3>
                  <p className="text-gray-400 max-w-md">Our AI is analyzing your features and preferences to create a personalized look enhancement plan.</p>
                </div>
                <div className="w-full max-w-xs h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-pink-500 to-purple-600"
                    initial={{ width: '0%' }}
                    animate={{
                      width: ['0%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      ease: "easeInOut"
                    }}
                  />
                </div>
              </motion.div>
            ) : (
              <>
                {error ? (
                  <div className="text-center py-12">
                    <p className="text-red-400 text-lg">{error}</p>
                    <Link 
                      href="/" 
                      className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700"
                    >
                      Back to Home
                    </Link>
                  </div>
                ) : (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="prose prose-invert max-w-none"
                  >
                    <div className="space-y-8">
                      <div 
                        className="space-y-6"
                        dangerouslySetInnerHTML={{ 
                          __html: formattedText
                        }} 
                      />
                      
                      {aiImage && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                          className="mt-8 rounded-xl overflow-hidden border border-gray-700/50 bg-gray-900/50 backdrop-blur-sm"
                        >
                          <div className="p-4 border-b border-gray-700/50 bg-gradient-to-r from-pink-900/30 to-purple-900/30">
                            <h3 className="text-lg font-semibold text-pink-300">AI-Generated Look</h3>
                          </div>
                          <div className="p-4 flex justify-center">
                            <img 
                              src={image} 
                              alt="AI generated look" 
                              className="rounded-lg max-w-full h-auto max-h-[600px] object-contain"
                            />
                          </div>
                        </motion.div>
                      )}
                    </div>
                    
                    <motion.div 
                      variants={item}
                      className="mt-12 pt-8 border-t border-gray-700/50 flex flex-col sm:flex-row justify-between gap-4"
                    >
                      <Link 
                        href="/intelligence" 
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors"
                      >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Form
                      </Link>
                      <div className="flex items-center space-x-4">
                        <button className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                          Save Report
                        </button>
                        <button className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors">
                          Book a Consultation
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
