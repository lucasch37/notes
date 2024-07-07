"use server";

import { redirect } from "next/navigation";
import { auth } from "../lib/auth";
import { db } from "../lib/db";
import { notes } from "../lib/db/schema";
import { z } from "zod";
import { formSchema } from "@/lib/zod";
import { createGoogleGenerativeAI, google } from "@ai-sdk/google";
import { generateText, StreamingTextResponse, streamText } from "ai";

export async function createNote(data: z.infer<typeof formSchema>) {
    const session = await auth();

    const name = data.name;

    const google = createGoogleGenerativeAI({
        apiKey: process.env.GOOGLE_API_KEY,
    });

    let icon: string;

    try {
        const emoji = await generateText({
            model: google("models/gemini-pro", {
                safetySettings: [],
            }),
            prompt: `Hello, you are an AI assistant that will generate an emoji that represents the name of a note. The note's name is "${name}". Please generate one and only one emoji that represents this note. Do not generate more than one emoji. If you are unsure of what emoji to use, you can use the following emoji: 📝.`,
        });
        icon = emoji.text.slice(0, 2);
    } catch (error) {
        icon = "📝";
    }

    const note = await db
        .insert(notes)
        .values({
            name: name,
            userId: session?.user?.id!,
            content: `<h1>${name}</h1>`,
            icon: icon,
        })
        .returning({
            noteId: notes.id,
        });

    redirect(`/note/${note[0].noteId}`);
}
