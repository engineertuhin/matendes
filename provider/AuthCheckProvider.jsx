"use client";

import { useEffect } from "react";
import useAuth from "@/domains/auth/hooks/useAuth";

export default function AuthCheckProvider({ children }) {
  const { getMe } = useAuth();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await getMe();
    

        // maybe handle user data here?
       
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };

    getUser();
  }, []);

  return children;
}
