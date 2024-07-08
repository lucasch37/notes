"use client";

import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Text } from "@tiptap/extension-text";
import EditorMenuBar from "./EditorMenuBar";
import { useDebounce } from "@/lib/useDebounce";
import { NoteType } from "@/lib/db/schema";
import { saveNote } from "@/actions/saveNote";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useCompletion } from "ai/react";
import { Separator } from "./ui/separator";
import { useToast } from "./ui/use-toast";

type Props = {
    note: NoteType;
};

const Editor = ({ note }: Props) => {
    const [editorState, setEditorState] = React.useState(note.content || "");
    const [isSaving, setIsSaving] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const { complete, completion } = useCompletion({
        api: "/api/createCompletion",
    });

    const { toast } = useToast();

    const customText = Text.extend({
        addKeyboardShortcuts() {
            return {
                "Mod-Space": () => {
                    setIsLoading(true);
                    const prompt = this.editor
                        .getText()
                        .split(" ")
                        .slice(-30)
                        .join(" ");
                    complete(prompt);
                    lastCompletion.current = "";
                    return true;
                },
            };
        },
    });

    const editor = useEditor({
        autofocus: true,
        extensions: [StarterKit, customText],
        content: editorState,
        onUpdate: ({ editor }) => {
            setEditorState(editor.getHTML());
        },
    });

    React.useEffect(() => {
        if (editor) {
            editor.commands.focus("end");
        }
    }, [editor]);

    const lastCompletion = React.useRef("");

    React.useEffect(() => {
        if (!completion || !editor) return;
        setIsLoading(false);
        if (completion === "Unable to autocomplete.") {
            toast({
                title: "Unable to autocomplete",
                description:
                    "Please make sure the AI can understand your prompt.",
            });
            return;
        }
        const diff = completion.slice(lastCompletion.current.length);
        lastCompletion.current = completion;
        editor.commands.insertContent(diff);
    }, [completion, editor]);

    const debouncedEditorState = useDebounce(editorState, 500);

    React.useEffect(() => {
        if (
            debouncedEditorState !== "" &&
            note.content !== debouncedEditorState
        ) {
            setIsSaving(true);
            saveNoteClient(note.id!, editorState);
        }
    }, [debouncedEditorState]);

    const saveNoteClient = async (id: string, content: string) => {
        await saveNote(id, content);
        setIsSaving(false);
    };

    return (
        <>
            <div className="flex justify-between">
                {editor && <EditorMenuBar editor={editor} />}
                <Button disabled variant={"outline"} className="">
                    {isSaving ? (
                        <>
                            <Loader2 className="w-4 h-4 mx-4 animate-spin" />{" "}
                            <span className="hidden md:flex">Saving</span>
                        </>
                    ) : (
                        "Saved"
                    )}
                </Button>
            </div>
            <div className="prose prose-sm w-full mt-4">
                <EditorContent
                    editor={editor}
                    className="min-w-[70vw] md:min-w-[75vw] 2xl:min-w-[79rem] dark:text-white"
                />
            </div>
            <Separator />
            {isLoading && (
                <Button
                    className="md:flex items-center mt-4 font-bold hidden"
                    disabled
                    variant={"outline"}
                >
                    Generating...{" "}
                    <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                </Button>
            )}
            <div className="text-sm md:mt-4 leading-7 invisible md:visible">
                Press{" "}
                <kbd className="px-2 py-1.5 text-xs font-semibold bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg mx-0.5">
                    Ctrl + Space
                </kbd>{" "}
                for AI autocomplete
            </div>
            <div className="text-sm leading-7 md:hidden -mt-10 -mb-3">
                <Button
                    onClick={() => {
                        setIsLoading(true);
                        const prompt = editor!
                            .getText()
                            .split(" ")
                            .slice(-30)
                            .join(" ");
                        complete(prompt);
                        lastCompletion.current = "";
                    }}
                    variant={"outline"}
                    className="flex items-center gap-2"
                >
                    {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                    Autocomplete with AI
                </Button>
            </div>
        </>
    );
};

export default Editor;
