"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const { data:session , status } = useSession();

  
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/"); // Redirect to the dashboard
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>; // Show loading state while session is loading
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col items-center h-screen">
        <div className="flex flex-col gap-[30px] md:gap-[50px] bg-gray-200 rounded-md py-[50px] px-[20px] md:py-[100px] md:px-[200px] w-[90%] max-w-[600px]">
          {/* Google Sign In */}
          <div
            className="p-[15px] md:p-[20px] rounded-md border-none text-white font-bold cursor-pointer bg-red-500 text-center"
            onClick={() => signIn("google")}
          >
            Sign in with Google
          </div>
          {/* Github Sign In */}
          <div
            className="p-[15px] md:p-[20px] rounded-md border-none text-white font-bold cursor-pointer bg-black text-center"
            onClick={() => signIn("github")}
          >
            Sign in with Github
          </div>
          {/* Facebook Sign In */}
          <div
            className="p-[15px] md:p-[20px] rounded-md border-none text-white font-bold cursor-pointer bg-blue-500 text-center"
            onClick={() => signIn("facebook")}
          >
            Sign in with Facebook
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome, {session?.user?.name}</h1>
      <button
        className="p-[15px] bg-red-500 text-white rounded-md mt-4"
        onClick={() =>
          signOut({
            callbackUrl: "/login", // Redirect to login page after logout
          })
        }
      >
        Logout
      </button>
    </div>
  );
};

export default Page;
