import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { FaGoogle } from "react-icons/fa";
import React from "react";
import { SignInButton } from "@/components/SignInButton";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

type Props = {};

const SignIn = async (props: Props) => {
    const session = await auth();
    if (session?.user) {
        redirect("/");
    }
    return (
        <div>
            <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 flex justify-center">
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Sign In</CardTitle>
                        <CardDescription>
                            Sign in to continue to Intellinote!
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <SignInButton>
                            <FaGoogle className="mr-2 text-lg" />
                            Sign in with Google
                        </SignInButton>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default SignIn;
