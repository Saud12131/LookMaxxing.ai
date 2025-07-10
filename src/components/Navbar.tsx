'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, Bot, Image as ImageIcon, Home as HomeIcon, LogOut } from 'lucide-react';
import { useAuth } from '@/context/authcontext';
import { getAuth, signOut } from 'firebase/auth';
import { toast } from 'sonner';
import { FC } from 'react';

export const Navbar: FC = () => {
  const { user } = useAuth();
  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="sticky top-0 z-50 bg-gradient-to-r from-indigo-900 to-purple-900 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link href="/" className="flex items-center space-x-2">
            <Sparkles className="w-8 h-8 text-pink-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              LookMaxxing.AI
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
          <Link 
              href="/home" 
              className="flex items-center text-pink-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <HomeIcon className="w-4 h-4 mr-2" />
              Home
            </Link>
            <Link 
              href="/intelligence" 
              className="flex items-center text-pink-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              Transform with AI
            </Link>
            <Link 
              href="/AskAi" 
              className="flex items-center text-pink-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <Bot className="w-4 h-4 mr-2" />
              Ask AI
            </Link>
          </div>

          {/* CTA and Auth Buttons */}
          <div className="flex items-center space-x-3">
            {user.uid ? (
              <button
                onClick={async () => {
                  try{
                    await signOut(getAuth());
                    window.location.href = '/';
                    toast.success("Logged out successfully")
                  }
                  catch (error: unknown) {
                    console.error('Logout error:', error);
                    toast.error(error instanceof Error ? error.message : 'An error occurred');
                  }
                  
                }}
                className="flex items-center text-pink-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </button>
            ) : null}
            <Link
              href={user.uid? "/home":"/signup"}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              {user.uid? "Home":"Get Started"}
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
