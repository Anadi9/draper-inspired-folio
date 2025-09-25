import { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

interface HeroProps {
  isActive: boolean;
  sectionIndex: number;
}

const Hero = ({ isActive, sectionIndex }: HeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isActive && !hasAnimated.current && containerRef.current) {
      hasAnimated.current = true;
      // Quantum animations are handled by CSS and Framer Motion
    }
  }, [isActive]);

  // Reset animation state when section becomes inactive
  useEffect(() => {
    if (!isActive) {
      hasAnimated.current = false;
    }
  }, [isActive]);

  // Show loading state while 3D model is loading
  // if (isLoading) {
  //   return (
  //     <section className="relative min-h-screen flex items-center justify-center">
  //       <div className="absolute inset-0 z-0">
  //         <ErrorBoundary>
  //           <ComputersCanvas onModelReady={handleModelReady} />
  //         </ErrorBoundary>
  //       </div>
  //       <div className="relative z-20 flex items-center justify-center">
  //         <div className="text-center">
  //           <div className="w-20 h-20 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>        
  //         </div>
  //       </div>
  //     </section>
  //   );
  // }

    return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center max-w-4xl mx-auto px-6">
          {/* Clean Developer Badge */}
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/20 rounded-full text-white text-sm font-medium mb-12 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "backOut" }}
            whileHover={{ scale: 1.02, borderColor: 'rgba(255, 255, 255, 0.4)' }}
          >
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            <span className="font-medium">Full Stack Developer</span>
            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
          </motion.div>

          {/* Name with Enhanced Typography */}
          <motion.div
            className="relative mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-600/20 blur-3xl"></div>
            <h1 className="relative text-6xl md:text-8xl font-black text-white tracking-tight">
              <span className="bg-gradient-to-r from-red-400 via-white to-orange-400 bg-clip-text text-transparent">
                Anadi Thakur
              </span>
            </h1>
          </motion.div>

          {/* Enhanced Tagline */}
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-16 max-w-3xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="text-red-400 font-medium">Crafting</span> powerful solutions through{' '}
            <span className="text-orange-400 font-medium">robust code</span> and{' '}
            <span className="text-red-400 font-medium">strategic design</span>
          </motion.p>

          {/* Enhanced Social Links */}
          <motion.div
            className="flex justify-center gap-8 mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              { icon: Github, href: '#', label: 'GitHub', color: 'hover:text-gray-300', bg: 'hover:bg-gray-800/30' },
              { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-red-400', bg: 'hover:bg-red-500/20' },
              { icon: Mail, href: '#', label: 'Email', color: 'hover:text-orange-400', bg: 'hover:bg-orange-500/20' }
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                className={`group p-4 bg-white/5 border border-white/10 rounded-xl text-gray-400 transition-all duration-500 backdrop-blur-sm ${social.color} ${social.bg}`}
                whileHover={{ 
                  y: -8, 
                  scale: 1.1,
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20, rotateY: -90 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ 
                  delay: 0.8 + index * 0.15,
                  duration: 0.6,
                  ease: "backOut"
                }}
              >
                <social.icon size={28} className="drop-shadow-sm" />
              </motion.a>
            ))}
          </motion.div>

          {/* Enhanced Scroll Indicator */}
          <motion.div
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <a href="#about">
              <motion.div
                className="group relative"
                whileHover={{ scale: 1.1 }}
              >
                <div className="w-8 h-12 border-2 border-gray-400/50 rounded-full flex justify-center backdrop-blur-sm">
                  <motion.div
                    className="w-1.5 h-4 bg-gradient-to-b from-red-400 to-orange-400 rounded-full mt-2"
                    animate={{ y: [0, 16, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
                <div className="absolute inset-0 border-2 border-red-400/20 rounded-full animate-ping"></div>
              </motion.div>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Custom CSS for enhanced effects */}
      <style>{`
        .drop-shadow-glow {
          filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.5));
        }
        
        .shadow-glow {
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </section>
  );
};

export default Hero;