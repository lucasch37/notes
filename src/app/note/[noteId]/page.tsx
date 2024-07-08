import Editor from "@/components/Editor";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { notes } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
    params: {
        noteId: string;
    };
};

const NotePage = async ({ params: { noteId } }: Props) => {
    const session = await auth();
    if (!session?.user) {
        redirect("/sign-in");
    }

    const foundNotes = await db
        .select()
        .from(notes)
        .where(and(eq(notes.id, noteId), eq(notes.userId, session?.user.id!)));

    if (foundNotes.length != 1) {
        redirect("/dashboard");
    }

    const note = foundNotes[0];

    return (
        <div className="container mx-auto mt-8">
            <div className="backdrop-blur shadow-xl dark:shadow-slate-900 rounded-lg border bg-background p-4 flex items-center gap-4">
                <Link href={"/dashboard"}>
                    <Button className="flex items-center">
                        <ArrowLeft
                            strokeWidth={3}
                            height={15}
                            width={15}
                            className="mr-1"
                        />
                        Back
                    </Button>
                </Link>
                <p className="font-semibold text-xl">
                    {session?.user.name} /{" "}
                    <span className="text-slate-500">{note.name}</span>
                </p>
            </div>
            <div className="mt-4 p-8 backdrop-blur shadow-xl dark:shadow-slate-900 rounded-lg border bg-background w-full mb-4">
                <Editor note={note} />
            </div>
        </div>
    );
};

export default NotePage;
