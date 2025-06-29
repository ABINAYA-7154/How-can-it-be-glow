import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Stars } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Scissors, User } from 'lucide-react';

// Components
import FloatingFabric from './components/Background/FloatingFabric';
import Mannequin3D from './components/Background/Mannequin3D';
import ParticleSystem from './components/Background/ParticleSystem';
import BallpitSimulation from './components/Background/BallpitSimulation';
import InteractiveGrid from './components/Background/InteractiveGrid';
import GradientText from './components/UI/GradientText';
import RoleCard from './components/UI/RoleCard';

type UserRole = 'tailor' | 'customer' | null;

const App: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [showRoleSelection, setShowRoleSelection] = useState(true);

  const handleRoleSelect = (role: 'tailor' | 'customer') => {
    setSelectedRole(role);
    setTimeout(() => {
      setShowRoleSelection(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* 3D Background Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        className="absolute inset-0"
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#FF69B4" />
          <pointLight position={[-10, -10, -10]} intensity={0.6} color="#009688" />
          <spotLight
            position={[0, 15, 0]}
            angle={0.3}
            penumbra={1}
            intensity={1}
            color="#C0FDFB"
            castShadow
          />

          {/* 3D Elements */}
          <FloatingFabric />
          <Mannequin3D />
          <ParticleSystem />
          <BallpitSimulation />
          <InteractiveGrid />
          
          {/* Environment */}
          <Stars radius={300} depth={60} count={1000} factor={7} saturation={0.5} />
          <Environment preset="night" />
          
          {/* Camera Controls */}
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>

      {/* UI Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <AnimatePresence mode="wait">
          {showRoleSelection ? (
            <motion.div
              key="role-selection"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-6xl mx-auto"
            >
              {/* Main Title */}
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="mb-8"
              >
                <GradientText 
                  text="StyleAI" 
                  className="mb-4"
                />
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.5 }}
                  className="text-xl md:text-2xl text-white/80 font-light tracking-wide"
                >
                  Where Fashion Meets Intelligence
                </motion.p>
              </motion.div>

              {/* Subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2 }}
                className="mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Choose Your Journey
                </h2>
                <p className="text-lg text-white/70 max-w-2xl mx-auto">
                  Step into the future of fashion. Whether you create or discover, 
                  your perfect style experience awaits.
                </p>
              </motion.div>

              {/* Role Cards */}
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <RoleCard
                  role="tailor"
                  title="I'm a Tailor"
                  description="Design, create, and showcase your masterpieces. Connect with customers and bring their vision to life with AI-powered tools."
                  icon={<Scissors />}
                  onSelect={handleRoleSelect}
                />
                <RoleCard
                  role="customer"
                  title="I'm a Customer"
                  description="Discover your perfect style. Browse unique designs, connect with talented tailors, and create your dream wardrobe."
                  icon={<User />}
                  onSelect={handleRoleSelect}
                />
              </div>

              {/* Footer Text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 2.5 }}
                className="text-white/50 text-sm mt-12"
              >
                Experience the magic of personalized fashion
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-pink-400 to-teal-400 flex items-center justify-center"
                >
                  {selectedRole === 'tailor' ? <Scissors className="text-white" /> : <User className="text-white" />}
                </motion.div>
                <h2 className="text-4xl font-bold text-white mb-4">
                  Welcome, {selectedRole === 'tailor' ? 'Creative Tailor' : 'Style Explorer'}!
                </h2>
                <p className="text-white/80 text-lg">
                  Your fashion journey begins now...
                </p>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mt-8 w-full h-2 bg-gradient-to-r from-pink-400 via-purple-500 to-teal-400 rounded-full"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating UI Elements */}
      <div className="absolute top-8 left-8 z-20">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-white/60 text-sm"
        >
          StyleAI Beta
        </motion.div>
      </div>

      <div className="absolute top-8 right-8 z-20">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-pink-400/50 rounded-full border-t-pink-400"
        />
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900/80 to-transparent pointer-events-none z-5" />
    </div>
  );
};

export default App;