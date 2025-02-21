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
          <Link href="/login" prefetch={true}>login</Link>
        </>
      ) : (
        <>
          <Link href="/write" prefetch={true}>write</Link>

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
                className="dropdown-menu absolute right-0 mt-2 w-40 bg-white shadow-md rounded-lg p-2 z-50"
                onClick={() => setDropdownOpen(false)} //closing when the div is clicked
              >
                <Link
                  href="/profile"
                  prefetch={true}
                  className="dropdown-link block px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  Profile
                </Link>

                <span className="logout cursor-pointer  block px-4 text-sm transition-colors" onClick={signOut}>
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
