'use client';
//add this for upload
//https://ui.aceternity.com/components/file-uploadchromechrome
import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Upload, Camera, Loader2, SparklesIcon } from 'lucide-react';
import {Navbar} from '@/components/Navbar';

export default function IntelligencePage() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Questionnaire state
  const [formData, setFormData] = useState({
    gender: '',
    faceShape: '',
    cheekbonesProminent: '',
    foreheadWiderThanJaw: '',
    facialHair: '',
    glasses: '',
    skinTone: '',
    undertone: '',
    tansEasily: '',
    confidentColors: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      processImage(file);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImage(file);
    }
  };

  const processImage = (file: File) => {
    // Validate file type
    if (!file.type.match('image/(jpeg|jpg|png)')) {
      setError('Please upload a valid image file (JPEG, JPG, or PNG)');
      return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      setError('Image size should be less than 10MB');
      return;
    }

    const reader = new FileReader();
    
    reader.onloadstart = () => {
      setIsLoading(true);
      setError(null);
    };

    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        // Create an image element to validate dimensions
        const img = new window.Image();
        img.onload = () => {
          // Validate dimensions if needed
          // const minWidth = 300;
          // const minHeight = 300;
          // if (img.width < minWidth || img.height < minHeight) {
          //   setError(`Image dimensions should be at least ${minWidth}x${minHeight}px`);
          //   return;
          // }
          
          setImage(result);
          setIsLoading(false);
        };
        img.onerror = () => {
          setError('Failed to load image. Please try another file.');
          setIsLoading(false);
        };
        img.src = result;
      }
    };

    reader.onerror = () => {
      setError('Error reading file. Please try again.');
      setIsLoading(false);
    };

    reader.readAsDataURL(file);
  };
  const handleSubmit = async () => {
    if (!image) {
      setError('Please upload an image first');
      return;
    }
    // Check if all required fields are filled
    const requiredFields = ['gender', 'faceShape', 'cheekbonesProminent', 'foreheadWiderThanJaw', 'skinTone', 'undertone'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      setError(`Please fill in all required fields`);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Analyze this look enhancement request and provide detailed recommendations. Here are the details:
          - Gender: ${formData.gender}
          - Face Shape: ${formData.faceShape}
          - Prominent Cheekbones: ${formData.cheekbonesProminent}
          - Forehead Wider Than Jaw: ${formData.foreheadWiderThanJaw}
          - Skin Tone: ${formData.skinTone}
          - Undertone: ${formData.undertone}
          - Tans Easily: ${formData.tansEasily}
          - Confident Wearing: ${formData.confidentColors}
          `,
          image: image // Include the base64 image if needed by the API
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate report');
      }

      const data = await response.json();
      router.push(`/results?id=${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error generating report:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-900 via-indigo-900 to-fuchsia-900 text-white flex flex-col relative overflow-hidden py-12 px-4">
      <Head>
        <title>AI Look Enhancer | LookMaxxing.ai</title>
        <meta name="description" content="Upload your photo and let our AI stylist enhance your look." />
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
   

      <div className="max-w-4xl mx-auto mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-fuchsia-500 bg-clip-text text-transparent">
            AI Look Enhancer
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Upload your photo and answer a few questions for a personalised makeover
          </p>
        </motion.div>

        {/* Image uploader */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50"
        >
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer ${
              isDragging ? 'border-indigo-500 bg-indigo-500/10' : 'border-gray-600 hover:border-indigo-500/50'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden "
              accept="image/*"
              onChange={handleFileChange}
            />

            {image ? (
              <div className="relative group cursor-pointer">
                <div className="relative w-48 h-48 mx-auto rounded-xl overflow-hidden">
                  <Image
                    src={image}
                    alt="Uploaded preview"
                    fill
                    className="object-cover group-hover:opacity-75 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/10 backdrop-blur-sm p-3 rounded-full">
                      <Camera className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-400">Click or drag to change photo</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center">
                  <Upload className="w-8 h-8 text-pink-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Drag & drop your photo here</h3>
                  <p className="text-sm text-gray-400 mt-1">or click to browse files</p>
                  <p className="text-xs text-gray-500 mt-2">Supports JPG, PNG up to 10MB</p>
                </div>
              </div>
            )}
          </div>

          {/* Questionnaire */}
          {image && (
            <div className="mt-10 space-y-8">
              {/* Personal Details Section */}
              <details open className="border border-gray-700/50 rounded-xl p-6">
                <summary className="cursor-pointer text-lg font-semibold text-pink-400 mb-4">
                  👤 Personal Details
                </summary>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block mb-1 text-sm">Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2"
                      required
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Non-binary">Non-binary</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>
                </div>
              </details>

              {/* Face Shape Section */}
              <details open className="border border-gray-700/50 rounded-xl p-6">
                <summary className="cursor-pointer text-lg font-semibold text-pink-400 mb-4">
                  🧑‍🦰 Face Shape
                </summary>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block mb-1 text-sm">Face Shape</label>
                    <select
                      name="faceShape"
                      value={formData.faceShape}
                      onChange={handleInputChange}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2"
                    >
                      <option value="">Select</option>
                      <option>Round</option>
                      <option>Oval</option>
                      <option>Square</option>
                      <option>Heart</option>
                      <option>Diamond</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 text-sm">Prominent cheekbones / jawline</label>
                    <select
                      name="cheekbonesProminent"
                      value={formData.cheekbonesProminent}
                      onChange={handleInputChange}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2"
                    >
                      <option value="">Select</option>
                      <option>Yes</option>
                      <option>No</option>
                      <option>Not sure</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 text-sm">Forehead wider than jaw</label>
                    <select
                      name="foreheadWiderThanJaw"
                      value={formData.foreheadWiderThanJaw}
                      onChange={handleInputChange}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2"
                    >
                      <option value="">Select</option>
                      <option>Yes</option>
                      <option>No</option>
                      <option>Not sure</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 text-sm">Facial Hair</label>
                    <select
                      name="facialHair"
                      value={formData.facialHair}
                      onChange={handleInputChange}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2"
                    >
                      <option value="">Select</option>
                      <option>Clean-shaven</option>
                      <option>Beard</option>
                      <option>Mustache</option>
                      <option>Stubble</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block mb-1 text-sm">Do you wear glasses?</label>
                    <select
                      name="glasses"
                      value={formData.glasses}
                      onChange={handleInputChange}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2"
                    >
                      <option value="">Select</option>
                      <option>None</option>
                      <option>Prescription</option>
                      <option>Sunglasses</option>
                      <option>Fashion</option>
                    </select>
                  </div>
                </div>
              </details>

              {/* Skin Tone Section */}
              <details className="border border-gray-700/50 rounded-xl p-6">
                <summary className="cursor-pointer text-lg font-semibold text-pink-400 mb-4">
                  🎨 Skin Tone & Undertone
                </summary>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block mb-1 text-sm">Skin Tone</label>
                    <select
                      name="skinTone"
                      value={formData.skinTone}
                      onChange={handleInputChange}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2"
                    >
                      <option value="">Select</option>
                      <option>Fair</option>
                      <option>Medium</option>
                      <option>Olive</option>
                      <option>Dark</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 text-sm">Undertone</label>
                    <select
                      name="undertone"
                      value={formData.undertone}
                      onChange={handleInputChange}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2"
                    >
                      <option value="">Select</option>
                      <option>Warm</option>
                      <option>Cool</option>
                      <option>Neutral</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 text-sm">Tans easily or burns?</label>
                    <select
                      name="tansEasily"
                      value={formData.tansEasily}
                      onChange={handleInputChange}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2"
                    >
                      <option value="">Select</option>
                      <option>Tan easily</option>
                      <option>Burn quickly</option>
                      <option>Both</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block mb-1 text-sm">Colors you feel confident wearing</label>
                    <input
                      type="text"
                      name="confidentColors"
                      value={formData.confidentColors}
                      onChange={handleInputChange}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2"
                      placeholder="e.g. Navy, black, pastel blue"
                    />
                  </div>
                </div>
              </details>
              
              {/* Let's Go Button */}
              <div className="mt-8 text-center space-y-4">
                {error && (
                  <div className="text-red-400 text-sm bg-red-900/30 p-3 rounded-lg">
                    {error}
                  </div>
                )}
                <AnimatePresence>
                  {isLoading ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-center space-x-2 text-pink-400">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Creating your perfect look report...</span>
                      </div>
                      <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-pink-500 to-purple-600"
                          initial={{ width: '0%' }}
                          animate={{
                            width: ['0%', '100%', '100%'],
                            opacity: [1, 1, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: 'loop',
                          }}
                        />
                      </div>
                      <p className="text-sm text-gray-400">This may take a moment while our AI analyzes your features...</p>
                    </motion.div>
                  ) : (
                    <motion.button
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 flex items-center mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <SparklesIcon className="w-5 h-5 mr-2" />
                      Let's Go!
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
          
        </motion.div>
      </div>
    </div>
  );
}
