"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./ui/button";

const Navbar = () => {
  const { data: session } = useSession();
  const user: User = session?.user as User;

  return (
    <nav className="w-full p-4 flex justify-between items-center shadow-md">
      <div>
        <Link href={"/"} className="font-semibold text-xl sm:text-2xl">
          Happy Forms
        </Link>
      </div>
      <div>
        {session ? (
          <>
            <span>Welcome, {user.username}</span>
            <Button onClick={() => signOut()}>Logout</Button>
          </>
        ) : (
          <Link href="/sign-in">
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
