"use client";
import { motion } from "motion/react";

const ProfilePage = () => {
  return (
    <section>
      <header className="my-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-hmc-base-blue text-xl font-semibold sm:text-3xl"
        >
          Profile
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-xs text-gray-500 sm:text-base"
        >
          Isi Data Profilmu!
        </motion.p>
      </header>
    </section>
  );
};
export default ProfilePage;
