// app/login/page.tsx
"use client";

import { useState, useEffect } from "react";  // ← make sure useEffect is imported
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../lib/firebase";  // adjust path
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { user, loading } = useAuth();

  // ← Move redirect here (in useEffect, after render)
  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);  // dependencies: only run when these change

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // No need to redirect here — useEffect will catch it
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // Again — useEffect will handle redirect
    } catch (err: any) {
      setError(err.message);
    }
  };

  // If still loading, show loader
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // If already logged in, return nothing (useEffect already redirected)
  if (user) {
    return null;
  }

  // Rest of your login form (unchanged)
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login to Kaaym Mission</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
          >
            Login with Email
          </button>
        </form>

        <div className="my-4 text-center">or</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-600 text-white p-3 rounded hover:bg-red-700"
        >
          Login with Google
        </button>

        <p className="mt-4 text-center">
          No account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}