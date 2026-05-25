"use client";

import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useMusic } from "@/lib/useMusic";

type LoginResponse = {
  accessToken?: string;
  refreshToken?: string;
  message?: string;
  username?: string;
};

const ACCESS_TOKEN_KEY = "jakbar_access_token";
const REFRESH_TOKEN_KEY = "jakbar_refresh_token";

export default function LoginPage() {
  const router = useRouter();
  const music = useMusic();
  const pageRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!username.trim() || !password) {
      setError("Isi username dan password dulu.");
      shakeForm();
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          password,
          expiresInMins: 30,
        }),
      });

      const data = (await response.json()) as LoginResponse;

      if (!response.ok || !data.accessToken) {
        throw new Error(data.message || "Login gagal.");
      }

      sessionStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);

      if (data.refreshToken) {
        sessionStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
      }

      music.play();
      music.fadeVolume(0, 0.4, 2400);

      gsap
        .timeline({
          defaults: { ease: "power2.inOut" },
          onComplete: () => router.push("/main"),
        })
        .to(formRef.current, { autoAlpha: 0, y: -18, duration: 0.75 })
        .to(pageRef.current, { backgroundColor: "#000000", duration: 0.55 }, "<");
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Login gagal.");
      shakeForm();
      setIsLoading(false);
    }
  }

  function shakeForm() {
    if (!formRef.current) {
      return;
    }

    gsap.fromTo(
      formRef.current,
      { x: -8 },
      {
        x: 8,
        duration: 0.06,
        repeat: 5,
        yoyo: true,
        clearProps: "x",
        ease: "power1.inOut",
      },
    );
  }

  return (
    <main ref={pageRef} className="login">
      <form ref={formRef} className="login__form" onSubmit={handleSubmit}>
        <p className="login__label">masuk untuk melanjutkan</p>
        <label className="login__field">
          <span className="visually-hidden">username</span>
          <input
            autoComplete="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="username"
          />
        </label>
        <label className="login__field">
          <span className="visually-hidden">password</span>
          <input
            autoComplete="current-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="password"
          />
        </label>
        <button className="login__button" disabled={isLoading} type="submit">
          {isLoading ? "membuka..." : "lanjut"}
        </button>
        <p className="login__error" aria-live="polite">
          {error}
        </p>
      </form>
    </main>
  );
}
