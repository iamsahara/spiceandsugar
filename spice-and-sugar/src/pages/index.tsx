"use client";
import { useState, useEffect } from "react";
import UserAuth from "@/components/UserAuth";
import Home from "@/components/Home";

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
        <Home userName={userName || "Guest"} />
      )}
    </div>
  );
}