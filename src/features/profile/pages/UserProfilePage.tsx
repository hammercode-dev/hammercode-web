"use client";
import { motion } from "motion/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import ProfileForm from "@/features/profile/components/ProfileForm";

const UserProfilePage = () => {
  return (
    <section>
      <Tabs defaultValue="account" className="w-full">
        <header className="my-8 flex items-center justify-between">
          <div>
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
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="information">Information</TabsTrigger>
            </TabsList>
          </motion.div>
        </header>
        <TabsContent value="account">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <ProfileForm activeTab="account" />
          </motion.div>
        </TabsContent>
        <TabsContent value="information">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <ProfileForm activeTab="information" />
          </motion.div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default UserProfilePage;
