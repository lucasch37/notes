import Link from "next/link";
import React from "react";
import { ScrollText } from "lucide-react";
import { SignInButton } from "./SignInButton";
import { auth } from "@/lib/auth";
import UserDropdown from "./UserDropdown";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";

type Props = {};

const Navbar = async (props: Props) => {
    const session = await auth();

    return (
        <div className="inset-x-0 top-0 z-0 h-fit py-2 ">
            <div className="flex items-center justify-between h-full gap-2 px-8 mx-auto container">
                <Link href={"/"} className="flex items-center gap-2">
                    <div className="font-bold text-2xl flex items-center hover:text-slate-600 dark:hover:text-slate-300 transition-all">
                        <ScrollText className="mr-2" height={30} width={30} />
                        Intellinote
                    </div>
                </Link>
                <div className="flex items-center">
                    <ThemeToggle className="mr-4" />
                    {session?.user ? (
                        <UserDropdown user={session.user} />
                    ) : (
                        <SignInButton>Sign in</SignInButton>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
