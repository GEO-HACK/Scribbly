"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/"); // Redirect to home page when authenticated
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  if (status === "authenticated") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Welcome back!</h1>
          <p className="mb-4">You are signed in as {session.user.email}</p>
          <button
            onClick={() => router.push("/")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-8">Sign In</h1>
          
          <div className="bg-white shadow-lg rounded-lg p-8 space-y-4">
            {/* Google Sign In */}
            <button
              onClick={() => signIn("google")}
              className="w-full bg-red-500 text-white p-3 rounded-md font-bold hover:bg-red-600 transition"
            >
              Sign in with Google
            </button>

            {/* Github Sign In */}
            <button
              onClick={() => signIn("github")}
              className="w-full bg-black text-white p-3 rounded-md font-bold hover:bg-gray-800 transition"
            >
              Sign in with Github
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>New to FlowNote? Start writing your first post after signing in!</p>
          </div>
        </div>
      </div>
    );
  }

  // This shouldn't be reached but just in case
  return null;
};

export default Page;
