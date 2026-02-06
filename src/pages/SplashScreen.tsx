import { motion } from 'framer-motion';
import { Dog, Heart, Shield, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function SplashScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[hsl(210,60%,12%)] relative overflow-hidden flex flex-col items-center justify-center">
      {/* Background gradient orbs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[hsl(199,98%,35%)] rounded-full blur-[200px] opacity-20 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[hsl(176,70%,57%)] rounded-full blur-[180px] opacity-15 translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-[hsl(199,98%,35%)] rounded-full blur-[150px] opacity-10 -translate-x-1/2 -translate-y-1/2" />

      {/* Floating paw prints */}
      <motion.div
        className="absolute top-20 left-20 text-[hsl(176,70%,57%)] opacity-20"
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Dog size={60} />
      </motion.div>
      <motion.div
        className="absolute bottom-32 left-32 text-[hsl(199,98%,35%)] opacity-15"
        animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <Dog size={40} />
      </motion.div>
      <motion.div
        className="absolute top-40 right-24 text-[hsl(176,70%,57%)] opacity-20"
        animate={{ y: [0, -15, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <Dog size={50} />
      </motion.div>
      <motion.div
        className="absolute bottom-48 right-40 text-[hsl(199,98%,35%)] opacity-15"
        animate={{ y: [0, 20, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      >
        <Dog size={35} />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Logo/Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-[hsl(199,98%,35%)] to-[hsl(176,70%,57%)] flex items-center justify-center shadow-2xl shadow-[hsl(199,98%,35%)/0.4]">
              <Dog className="w-16 h-16 md:w-20 md:h-20 text-white" strokeWidth={1.5} />
            </div>
            <motion.div
              className="absolute -top-2 -right-2 w-10 h-10 bg-[hsl(176,70%,57%)] rounded-full flex items-center justify-center"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-5 h-5 text-[hsl(210,60%,12%)]" />
            </motion.div>
          </div>
        </motion.div>

        {/* Brand name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h1 className="text-5xl md:text-7xl font-corporate font-bold text-white mb-2 tracking-wide">
            Entaltek
          </h1>
          <h2 className="text-3xl md:text-5xl font-corporate font-bold bg-gradient-to-r from-[hsl(199,98%,35%)] to-[hsl(176,70%,57%)] bg-clip-text text-transparent tracking-wide">
            Sabueso
          </h2>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg md:text-xl text-[hsl(210,20%,65%)] mt-6 mb-10 max-w-2xl mx-auto"
        >
          Sistema integral de gestión para guarderías caninas. 
          <span className="block mt-2 text-[hsl(176,70%,57%)]">
            Cuidamos a tus perrihijos como familia.
          </span>
        </motion.p>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-wrap justify-center gap-6 mb-12"
        >
          {[
            { icon: Shield, label: 'Seguridad' },
            { icon: Heart, label: 'Cuidado' },
            { icon: Star, label: 'Calidad' },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(210,55%,16%)] border border-[hsl(210,40%,25%)]"
              whileHover={{ scale: 1.05, borderColor: 'hsl(176, 70%, 57%)' }}
              transition={{ delay: index * 0.1 }}
            >
              <item.icon className="w-5 h-5 text-[hsl(176,70%,57%)]" />
              <span className="text-white font-medium">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <Button
            size="lg"
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-[hsl(199,98%,35%)] to-[hsl(176,70%,57%)] hover:from-[hsl(199,98%,40%)] hover:to-[hsl(176,70%,62%)] text-white font-bold px-10 py-6 text-lg rounded-full shadow-xl shadow-[hsl(199,98%,35%)/0.3] transition-all duration-300 hover:shadow-2xl hover:shadow-[hsl(176,70%,57%)/0.4]"
          >
            Comenzar Ahora
          </Button>
        </motion.div>

        {/* Footer text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="text-sm text-[hsl(210,20%,45%)] mt-12"
        >
          Tecnología al servicio del bienestar animal
        </motion.p>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[hsl(199,98%,35%)/0.1] to-transparent" />
    </div>
  );
}
