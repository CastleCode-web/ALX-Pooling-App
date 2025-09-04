"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageLoading } from "@/components/ui/loading";
import { getFromStorage } from "@/lib/utils";

export default function Home() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check for authentication status
    const checkAuth = async () => {
      try {
        // Check if user is authenticated (in a real app, validate with server)
        const token = getFromStorage("authToken");
        const user = getFromStorage("user");

        if (token && user) {
          // User is authenticated, redirect to dashboard
          router.push("/dashboard");
        } else {
          // User is not authenticated, redirect to polls for public browsing
          router.push("/polls");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        // Default to public polls page on error
        router.push("/polls");
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [router]);

  // Show loading while checking authentication
  if (isChecking) {
    return <PageLoading message="Loading ALX Polly..." />;
  }

  return null;
}
