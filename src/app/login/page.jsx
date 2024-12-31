"use client";


import { useSession } from "next-auth/react";

const page = () => {

  const {data,status} = useSession()
  console.log(data,status)

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
        <div className="p-[15px] md:p-[20px] rounded-md border-none text-white font-bold cursor-pointer bg-black text-center">
          Sign in with Github
        </div>
        {/* Facebook Sign In */}
        <div className="p-[15px] md:p-[20px] rounded-md border-none text-white font-bold cursor-pointer bg-blue-500 text-center">
          Sign in with Facebook
        </div>
      </div>
    </div>
  );
};

export default page;
