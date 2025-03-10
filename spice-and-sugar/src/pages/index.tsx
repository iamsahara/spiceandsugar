"use client";
import Home from "@/components/Home";
import { useState, useEffect } from "react";
import UserAuth from "@/components/UserAuth";

export default function IndexPage() {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("guestUser");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      if (parsedUser.name) {
        setUserName(parsedUser.name);
      }
    }
  }, []);

  return (
    <div>
      {!userName ? (
        <UserAuth onAuthSuccess={(name) => setUserName(name)} />
      ) : (
        <Home userName={userName} />
      )}
    </div>
  );
}