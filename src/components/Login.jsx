import { useState } from 'react';







import { useAuth } from '../context/AuthContext';







import toast from 'react-hot-toast';







import { motion, AnimatePresence } from 'framer-motion';







import { FaEnvelope, FaLock, FaSignInAlt, FaExclamationCircle, FaChartLine } from 'react-icons/fa';







import AnimatedBackground from './AnimatedBackground';
















export default function Login({ onSwitchToRegister }) {







  const [email, setEmail] = useState('');







  const [password, setPassword] = useState('');







  const [loading, setLoading] = useState(false);







  const [error, setError] = useState('');







  const { login } = useAuth();















  const handleSubmit = async (e) => {







    e.preventDefault();







    setError('');







    setLoading(true);







    







    try {







      await login(email, password);







    } catch (error) {







      let errorMessage = 'Terjadi kesalahan saat login';







      







      if (error.code === 'auth/invalid-email') {







        errorMessage = 'Format email tidak valid';







      } else if (error.code === 'auth/user-not-found') {







        errorMessage = 'Email tidak terdaftar';







      } else if (error.code === 'auth/wrong-password') {







        errorMessage = 'Password salah';







      } else if (error.code === 'auth/too-many-requests') {







        errorMessage = 'Terlalu banyak percobaan. Silakan coba lagi nanti';







      }







      







      setError(errorMessage);







    } finally {







      setLoading(false);







    }







  };















  const errorVariants = {







    hidden: { 







      opacity: 0,







      y: -20,







      scale: 0.95







    },







    visible: { 







      opacity: 1,







      y: 0,







      scale: 1,







      transition: {







        type: "spring",







        stiffness: 300,







        damping: 20







      }







    },







    exit: {







      opacity: 0,







      y: 20,







      transition: {







        duration: 0.2







      }







    }







  };















  return (







    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 animate-gradient bg-[length:400%_400%]">







      <AnimatedBackground />















      <motion.div







        initial={{ opacity: 0, y: 20 }}







        animate={{ opacity: 1, y: 0 }}







        transition={{ duration: 0.5 }}







        className="bg-white/90 backdrop-blur-lg p-8 rounded-lg shadow-2xl w-96 relative z-10"







      >







        <motion.div







          initial={{ scale: 0 }}







          animate={{ scale: 1 }}







          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}







          className="text-center"







        >







          <motion.div







            animate={{ 







              rotateY: [0, 360],







            }}







            transition={{







              duration: 2,







              repeat: Infinity,







              repeatDelay: 5







            }}







            className="inline-block mb-4"







          >







            <FaChartLine className="text-4xl text-indigo-600" />







          </motion.div>







          <h2 className="text-3xl font-heading font-bold mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">







            Welcome Back







          </h2>







          <p className="text-gray-600 font-display">







            Login to manage your finances







          </p>







        </motion.div>















        <AnimatePresence mode="wait">







          {error && (







            <motion.div







              key="error"







              variants={errorVariants}







              initial="hidden"







              animate="visible"







              exit="exit"







              className="mb-4 p-4 rounded-lg bg-red-50 border-l-4 border-red-500 flex items-start space-x-3"







            >







              <FaExclamationCircle className="text-red-500 text-lg flex-shrink-0 mt-0.5" />







              <div className="flex-1">







                <h3 className="text-red-800 font-medium">Gagal Login</h3>







                <p className="text-red-600 text-sm">{error}</p>







              </div>







              <button







                onClick={() => setError('')}







                className="text-red-500 hover:text-red-700 text-sm"







              >







                ×







              </button>







            </motion.div>







          )}







        </AnimatePresence>















        <form onSubmit={handleSubmit} className="space-y-4">







          <motion.div







            initial={{ x: -50, opacity: 0 }}







            animate={{ x: 0, opacity: 1 }}







            transition={{ delay: 0.3 }}







          >







            <label className="block text-gray-700 mb-2">Email</label>







            <div className="relative">







              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />







              <input







                type="email"







                value={email}







                onChange={(e) => setEmail(e.target.value)}







                className={`w-full pl-10 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${







                  error && error.includes('email') ? 'border-red-500' : ''







                }`}







                required







                disabled={loading}







              />







            </div>







          </motion.div>















          <motion.div







            initial={{ x: -50, opacity: 0 }}







            animate={{ x: 0, opacity: 1 }}







            transition={{ delay: 0.4 }}







          >







            <label className="block text-gray-700 mb-2">Password</label>







            <div className="relative">







              <FaLock className="absolute left-3 top-3 text-gray-400" />







              <input







                type="password"







                value={password}







                onChange={(e) => setPassword(e.target.value)}







                className={`w-full pl-10 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${







                  error && error.includes('password') ? 'border-red-500' : ''







                }`}







                required







                disabled={loading}







              />







            </div>







          </motion.div>















          <motion.button







            initial={{ y: 50, opacity: 0 }}







            animate={{ y: 0, opacity: 1 }}







            transition={{ delay: 0.5 }}







            whileHover={{ scale: 1.05 }}







            whileTap={{ scale: 0.95 }}







            type="submit"







            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"







            disabled={loading}







          >







            <FaSignInAlt className={loading ? 'animate-spin' : ''} />







            <span>{loading ? 'Memproses...' : 'Login'}</span>







          </motion.button>







        </form>















        <motion.p







          initial={{ opacity: 0 }}







          animate={{ opacity: 1 }}







          transition={{ delay: 0.6 }}







          className="mt-4 text-center text-gray-600"







        >







          Belum punya akun?{' '}







          <motion.button







            whileHover={{ scale: 1.1 }}







            whileTap={{ scale: 0.9 }}







            onClick={onSwitchToRegister}







            className="text-indigo-600 hover:underline font-medium"







            disabled={loading}







          >







            Register







          </motion.button>







        </motion.p>







      </motion.div>







    </div>







  );







} 














