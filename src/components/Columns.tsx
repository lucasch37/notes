"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { NoteType } from "@/lib/db/schema";
import { Button } from "./ui/button";
import {
    ArrowDownIcon,
    ArrowUpDown,
    ArrowUpIcon,
    MoreHorizontal,
    Trash2,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { deleteNote } from "@/actions/deleteNote";
import { useToast } from "./ui/use-toast";

export const columns: ColumnDef<NoteType>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant={"ghost"}
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="flex items-center cursor-pointer"
                >
                    Name
                    {column.getIsSorted() === "desc" ? (
                        <ArrowDownIcon className="ml-2 h-4 w-4" />
                    ) : column.getIsSorted() === "asc" ? (
                        <ArrowUpIcon className="ml-2 h-4 w-4" />
                    ) : (
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    )}
                </Button>
            );
        },
        cell: ({ row }) => {
            return (
                <div className="flex ml-4">
                    <span className="max-w-[500px] truncate w-[118px] md:w-[250px] lg:w-[500px] font-medium 2xl:min-w-[800px]">
                        {row.original.icon} {row.getValue("name")}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <Button
                    variant={"ghost"}
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="sm:flex items-center cursor-pointer hidden"
                >
                    Created
                    {column.getIsSorted() === "desc" ? (
                        <ArrowDownIcon className="ml-2 h-4 w-4" />
                    ) : column.getIsSorted() === "asc" ? (
                        <ArrowUpIcon className="ml-2 h-4 w-4" />
                    ) : (
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    )}
                </Button>
            );
        },
        cell: ({ row }) => {
            const date = new Date(row.getValue("createdAt")).toLocaleString();

            return (
                <div className="font-medium ml-4 sm:flex hidden 2xl:w-[150px]">
                    {date.slice(0, -6) + date.slice(-3)}
                </div>
            );
        },
    },
    {
        accessorKey: "updatedAt",
        header: ({ column }) => {
            return (
                <Button
                    variant={"ghost"}
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="sm:flex items-center cursor-pointer hidden"
                >
                    Updated
                    {column.getIsSorted() === "desc" ? (
                        <ArrowDownIcon className="ml-2 h-4 w-4" />
                    ) : column.getIsSorted() === "asc" ? (
                        <ArrowUpIcon className="ml-2 h-4 w-4" />
                    ) : (
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    )}
                </Button>
            );
        },
        cell: ({ row }) => {
            const date = new Date(row.getValue("updatedAt")).toLocaleString();

            return (
                <div className="sm:flex hidden font-medium ml-4 2xl:w-[150px]">
                    {date.slice(0, -6) + date.slice(-3)}
                </div>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const { toast } = useToast();
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className="z-20 relative">
                        <Button
                            variant="ghost"
                            className="h-8 w-8 p-0 flex justify-center"
                        >
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal height={15} width={15} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            className="text-red-500"
                            onClick={async () => {
                                await deleteNote(row.original);
                                toast({
                                    title: "Note successfully deleted",
                                });
                            }}
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
