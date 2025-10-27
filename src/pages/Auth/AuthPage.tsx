import NavBar from "../../components/NavBar/NavBar";
import AuthForm from "../../components/Form/AuthForm";
import { motion } from 'framer-motion';

export default function AuthPage() {
  
  
  return (
    <motion.section 
      className="min-h-screen relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <NavBar showNavSide="hidden "/>
      <div className="w-full h-full py-18.5 flex justify-center items-center">
        <motion.div 
          className="w-[600px] p-10 rounded-[20px] border border-[#FAFAFA] shadow-xl shadow-black/5"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <AuthForm/>
        </motion.div>
      </div>
    </motion.section>
  )
}