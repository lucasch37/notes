import { columns } from "@/components/Columns";
import CreateNoteDialog from "@/components/CreateNoteDialog";
import NoteTable from "@/components/NoteTable";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NoteType, notes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const Dashboard = async () => {
    const session = await auth();
    if (!session?.user) {
        redirect("/sign-in");
    }

    const foundNotes = await db
        .select()
        .from(notes)
        .where(eq(notes.userId, session.user.id!));

    return (
        <div className="container mx-auto">
            <div className="flex items-center mt-8 mb-4 justify-between">
                <div className="flex gap-4">
                    <Link href={"/"}>
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
                    <h1 className="font-bold text-3xl">My Notes</h1>
                </div>
            </div>
            <NoteTable data={foundNotes} columns={columns} />
        </div>
    );
};

export default Dashboard;
