import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AuthLinks = () => {
  const { status } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
      {status === "unauthenticated" ? (
        <>
          <Link href="/login">login</Link>
        </>
      ) : (
        <>
          <Link href="/write">write</Link>

          <div className="relative">
            {/* profile icon */}
            <span
              className="cursor-pointer flex items-center gap-2"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <FontAwesomeIcon icon={faUserCircle} className="text-2xl" />
            </span>
            {dropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-lg p-2"
                onClick={() => setDropdownOpen(false)} //closing when the div is clicked
              >
                <Link
                  href="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>

                <span className="cursor-pointer text-red-600" onClick={signOut}>
                  Logout
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default AuthLinks;
