"use client";
export const dynamic = 'force-dynamic'

import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState, Suspense } from "react";
import { AlertCircle, Link as LinkIcon, ArrowRight } from "lucide-react";

const AuthErrorContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [isLinking, setIsLinking] = useState(false);

  const handleAccountLink = async (provider) => {
    setIsLinking(true);
    try {
      // Sign in with the provider - our updated auth config will handle linking
      const result = await signIn(provider, {
        callbackUrl: "/",
        redirect: false,
      });
      
      if (result?.ok) {
        router.push("/");
      } else {
        console.error("Sign in failed:", result?.error);
      }
    } catch (error) {
      console.error("Account linking error:", error);
    } finally {
      setIsLinking(false);
    }
  };

  if (error === "OAuthAccountNotLinked") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <LinkIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Account Already Exists
              </h1>
              <p className="text-gray-600">
                You already have an account with this email using a different sign-in method.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-blue-900 mb-1">
                      What's happening?
                    </h3>
                    <p className="text-sm text-blue-700">
                      Your email is already registered with GitHub or another provider. 
                      We can link your accounts together safely.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-medium text-gray-900">Choose how to continue:</h3>
                
                <button
                  onClick={() => handleAccountLink("google")}
                  disabled={isLinking}
                  className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src="https://developers.google.com/identity/images/g-logo.png"
                      alt="Google"
                      className="w-5 h-5"
                    />
                    <span className="font-medium text-gray-900">
                      Link with Google
                    </span>
                  </div>
                  {isLinking ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                  ) : (
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  )}
                </button>

                <button
                  onClick={() => handleAccountLink("github")}
                  disabled={isLinking}
                  className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span className="font-medium text-gray-900">
                      Sign in with GitHub
                    </span>
                  </div>
                  {isLinking ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                  ) : (
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>

              <div className="text-center pt-4">
                <button
                  onClick={() => router.push("/login")}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  ← Back to login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle other auth errors
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Authentication Error
          </h1>
          <p className="text-gray-600 mb-6">
            {error === "AccessDenied" && "You cancelled the sign-in process."}
            {error === "Verification" && "The sign-in link is no longer valid."}
            {error === "Default" && "An unexpected error occurred during sign-in."}
            {!error && "An authentication error occurred."}
          </p>
          <button
            onClick={() => router.push("/login")}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

const AuthErrorPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    }>
      <AuthErrorContent />
    </Suspense>
  );
};

export default AuthErrorPage;
