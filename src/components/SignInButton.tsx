"use client";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { FaGoogle } from "react-icons/fa";

type Props = {
    children: React.ReactNode;
};

export function SignInButton({ children }: Props) {
    return (
        <Button
            onClick={() => {
                signIn("google", { callbackUrl: "/dashboard" }).catch(
                    console.error
                );
            }}
            className="w-full"
        >
            {children}
        </Button>
    );
}
