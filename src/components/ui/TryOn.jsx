import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, RotateCcw, Download, Sparkles, Eye, Zap } from 'lucide-react';

export default function TryOn() {
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [webcamError, setWebcamError] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const frames = [
    {
      id: 1,
      name: 'Classic Aviator',
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      overlay: '/frames/aviator-overlay.png'
    },
    {
      id: 2,
      name: 'Modern Square',
      image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      overlay: '/frames/square-overlay.png'
    },
    {
      id: 3,
      name: 'Vintage Round',
      image: 'https://images.unsplash.com/photo-1556306535-38febf6782e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      overlay: '/frames/round-overlay.png'
    },
    {
      id: 4,
      name: 'Cat Eye Chic',
      image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      overlay: '/frames/cateye-overlay.png'
    }
  ];

  const startWebcam = async () => {
    setWebcamError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 640, 
          height: 480,
          facingMode: 'user'
        } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsWebcamActive(true);
      }
    } catch (error) {
      console.error('Error accessing webcam:', error);
      let errorMessage = 'Unable to access webcam. ';
      
      if (error.name === 'NotAllowedError' || error.message.includes('Permission denied')) {
        errorMessage += 'Please allow camera access by clicking the camera icon in your browser\'s address bar, or check your browser\'s privacy settings to enable camera access for this site.';
      } else if (error.name === 'NotFoundError') {
        errorMessage += 'No camera found on your device.';
      } else if (error.name === 'NotReadableError') {
        errorMessage += 'Camera is already in use by another application.';
      } else {
        errorMessage += 'Please check your camera permissions and try again.';
      }
      
      setWebcamError(errorMessage);
    }
  };

  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsWebcamActive(false);
    }
    setWebcamError(null);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        stopWebcam();
      };
      reader.readAsDataURL(file);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);
      
      const imageData = canvas.toDataURL('image/png');
      setUploadedImage(imageData);
      stopWebcam();
    }
  };

  const downloadImage = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = 'eyewear-tryout.png';
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  };

  const resetTryOn = () => {
    setSelectedFrame(null);
    setUploadedImage(null);
    setWebcamError(null);
    stopWebcam();
  };

  useEffect(() => {
    return () => {
      stopWebcam();
    };
  }, []);

  return (
    <section id="try-on" className="py-20 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full border border-yellow-400/30 mb-6">
            <Sparkles className="w-5 h-5 text-yellow-400 mr-2" />
            <span className="text-yellow-400 font-semibold">AR Virtual Try-On</span>
            <Eye className="w-5 h-5 text-yellow-400 ml-2" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="font-playfair">Try Before You</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              Buy
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experience our revolutionary AR technology. See how you look in any frame instantly, 
            right from your device.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Try-On Interface */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Camera/Upload Section */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Camera className="w-6 h-6 text-yellow-400 mr-3" />
                Get Started
              </h3>
              
              <div className="space-y-4">
                {/* Webcam Error Message */}
                <AnimatePresence>
                  {webcamError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-red-500/10 border border-red-500/30 rounded-xl p-4"
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <Camera className="w-5 h-5 text-red-400 mt-0.5" />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-red-400 font-semibold text-sm mb-1">Camera Access Required</h4>
                          <p className="text-red-300 text-sm leading-relaxed">{webcamError}</p>
                          <motion.button
                            onClick={startWebcam}
                            className="mt-3 text-red-400 hover:text-red-300 text-sm font-semibold underline"
                            whileHover={{ scale: 1.02 }}
                          >
                            Try Again
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!uploadedImage && !isWebcamActive && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <motion.button
                      onClick={startWebcam}
                      className="flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Camera className="w-5 h-5 mr-2" />
                      Use Camera
                    </motion.button>
                    
                    <motion.button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center justify-center px-6 py-4 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white rounded-xl font-semibold transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Upload className="w-5 h-5 mr-2" />
                      Upload Photo
                    </motion.button>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {/* Camera Feed */}
                <AnimatePresence>
                  {isWebcamActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="relative"
                    >
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full rounded-xl"
                      />
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
                        <motion.button
                          onClick={capturePhoto}
                          className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black rounded-full font-semibold transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Camera className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                          onClick={stopWebcam}
                          className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full font-semibold transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Stop
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Uploaded Image Preview */}
                <AnimatePresence>
                  {uploadedImage && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="relative"
                    >
                      <img
                        src={uploadedImage}
                        alt="Uploaded"
                        className="w-full rounded-xl"
                      />
                      {selectedFrame && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-48 h-16 bg-black/20 rounded-lg border-2 border-yellow-400/50 flex items-center justify-center">
                            <span className="text-yellow-400 font-semibold">Frame Overlay</span>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Action Buttons */}
                {uploadedImage && (
                  <div className="flex gap-4 justify-center">
                    <motion.button
                      onClick={downloadImage}
                      className="flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black rounded-xl font-semibold transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download
                    </motion.button>
                    
                    <motion.button
                      onClick={resetTryOn}
                      className="flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-semibold transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <RotateCcw className="w-5 h-5 mr-2" />
                      Reset
                    </motion.button>
                  </div>
                )}
              </div>
            </div>

            <canvas ref={canvasRef} className="hidden" />
          </motion.div>

          {/* Frame Selection */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Zap className="w-6 h-6 text-yellow-400 mr-3" />
                Choose Your Frame
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {frames.map((frame) => (
                  <motion.div
                    key={frame.id}
                    onClick={() => setSelectedFrame(frame)}
                    className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      selectedFrame?.id === frame.id
                        ? 'border-yellow-400 shadow-lg shadow-yellow-400/25'
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <img
                      src={frame.image}
                      alt={frame.name}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <h4 className="text-white font-semibold text-sm">{frame.name}</h4>
                    </div>
                    {selectedFrame?.id === frame.id && (
                      <div className="absolute top-2 right-2">
                        <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-black rounded-full" />
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-gradient-to-r from-yellow-400/10 to-orange-500/10 rounded-2xl p-6 border border-yellow-400/20">
              <h4 className="text-yellow-400 font-semibold mb-3 flex items-center">
                <Eye className="w-5 h-5 mr-2" />
                How it works
              </h4>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">1.</span>
                  Take a photo or upload an image
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">2.</span>
                  Select a frame style you like
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">3.</span>
                  See how it looks on you instantly
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">4.</span>
                  Download and share your look
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 mb-6">
            Love what you see? Find the perfect frame in our collection.
          </p>
          <motion.button
            onClick={() => window.location.href = '/shop'}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black rounded-full font-bold text-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Shop Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}