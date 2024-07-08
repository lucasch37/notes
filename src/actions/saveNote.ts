"use server";

import { revalidatePath } from "next/cache";
import { db } from "../lib/db";
import { notes } from "../lib/db/schema";
import { eq } from "drizzle-orm";

export async function saveNote(id: string, content: string) {
    try {
        const foundNotes = await db
            .select()
            .from(notes)
            .where(eq(notes.id, id));
        const note = foundNotes[0];
        if (note.content !== content) {
            await db
                .update(notes)
                .set({ content: content, updatedAt: new Date() })
                .where(eq(notes.id, id));
        }
        revalidatePath("/dashboard");
    } catch (error) {
        console.log(error);
    }
}
