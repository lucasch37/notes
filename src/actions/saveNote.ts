"use server";

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
                .set({ content: content })
                .where(eq(notes.id, id));
        }
    } catch (error) {
        console.log(error);
    }
}
