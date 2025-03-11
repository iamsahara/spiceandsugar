"use client";
import { useState, useEffect } from "react";
import UserAuth from "@/components/UserAuth";
import Header from "@/components/Header";

export default function IndexPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("guestUser");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      if (user?.name) {
        setUserName(user.name);
        setIsAuthenticated(true);
      }
    }
  }, []);

  return (
    <div>
      {!isAuthenticated ? (
        <UserAuth
          onAuthSuccess={(name) => {
            setUserName(name);
            setIsAuthenticated(true);
          }}
        />
      ) : (
        <Header userName={userName || "Guest"} />
      )}
    </div>
  );
}