"use server";

import { eq } from "drizzle-orm";
import { db } from "../lib/db";
import { notes, NoteType } from "../lib/db/schema";
import { revalidatePath } from "next/cache";

export async function deleteNote(note: NoteType) {
    await db.delete(notes).where(eq(notes.id, note.id!));
    revalidatePath("/dashboard");
}
