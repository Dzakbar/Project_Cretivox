"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { StoryStage } from "@/components/story/StoryStage";
import { useSmoothScroll } from "@/lib/useSmoothScroll";

const ACCESS_TOKEN_KEY = "jakbar_access_token";

export default function MainPage() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useSmoothScroll();

  useEffect(() => {
    const token = sessionStorage.getItem(ACCESS_TOKEN_KEY);

    if (!token) {
      router.replace("/");
      return;
    }

    setIsReady(true);
  }, [router]);

  if (!isReady) {
    return <main className="story story--loading" />;
  }

  return (
    <main className="story">
      <StoryStage />
    </main>
  );
}
