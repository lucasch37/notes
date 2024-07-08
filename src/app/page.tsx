"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Earth, Pencil, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FlipWords } from "@/components/ui/flip-words";
import { GlareCard } from "@/components/ui/glare-card";
import { Spotlight } from "@/components/ui/spotlight";
import { GlareCardDark } from "@/components/ui/glare-card-dark";
import Image from "next/image";

export default function Home() {
    return (
        <>
            <div className="z-10 flex justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Spotlight
                    className="left-[48%] top-[10%] -z-10 invisible dark:visible"
                    fill="blue"
                />
                <Spotlight
                    className="left-[48%] top-[10%] -z-10 dark:hidden"
                    fill="#3b82f6"
                />
                <div>
                    <motion.div
                        initial={{ opacity: 0.0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0,
                            duration: 0.6,
                            ease: "easeInOut",
                        }}
                    >
                        <h1 className=" xl:text-7xl lg:text-5xl text-4xl text-center">
                            Take notes <br className="lg:hidden lg:-p-1" />
                            <span className="dark:text-blue-300 text-blue-400 -ml-2">
                                <FlipWords
                                    words={["faster", "smarter", "better"]}
                                />{" "}
                            </span>{" "}
                            <br />
                            with AI
                        </h1>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0.0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.4,
                            duration: 0.6,
                            ease: "easeInOut",
                        }}
                    >
                        <div className="hidden xl:my-9 dark:flex w-screen justify-center dark:xl:scale-100 dark:scale-[0.7] lg:gap-4 gap-2">
                            <GlareCard className="flex flex-col items-center justify-center text-center py-8 px-6">
                                <Sparkles
                                    className="md:w-32 md:h-32 w-16 h-16 text-blue-400"
                                    strokeWidth={0.5}
                                />
                                <p className="font-semibold md:text-3xl mt-4 flex items-center">
                                    AI Autocomplete
                                </p>
                            </GlareCard>
                            <GlareCard className="flex flex-col items-center justify-center text-center py-8 px-6 min-w-40">
                                <Earth
                                    className="md:w-32 md:h-32 w-16 h-16 text-pink-400"
                                    strokeWidth={0.5}
                                />
                                <p className="font-semibold md:text-3xl mt-4 flex items-center">
                                    AI-Generated Icons
                                </p>
                            </GlareCard>
                            <GlareCard className="flex flex-col items-center justify-center text-center py-8 px-6 min-w-36">
                                <Pencil
                                    className="md:w-32 md:h-32 w-16 h-16 text-yellow-400"
                                    strokeWidth={0.5}
                                />
                                <p className="font-semibold md:text-3xl mt-4 flex items-center">
                                    Detailed Editor
                                </p>
                            </GlareCard>
                        </div>
                        <div className="dark:hidden xl:my-9 flex w-screen justify-center xl:scale-100 scale-[0.7] lg:gap-4 gap-2 text-slate-500">
                            <GlareCardDark className="flex flex-col items-center justify-center text-center py-8 px-6">
                                <Sparkles
                                    className="md:w-32 md:h-32 w-16 h-16 text-blue-400"
                                    strokeWidth={0.5}
                                />
                                <p className="font-semibold md:text-3xl mt-4 flex items-center">
                                    AI Autocomplete
                                </p>
                            </GlareCardDark>
                            <GlareCardDark className="flex flex-col items-center justify-center text-center py-8 px-6 min-w-40">
                                <Earth
                                    className="md:w-32 md:h-32 w-16 h-16 text-pink-400"
                                    strokeWidth={0.5}
                                />
                                <p className="font-semibold md:text-3xl mt-4 flex items-center">
                                    AI-Generated Icons
                                </p>
                            </GlareCardDark>
                            <GlareCardDark className="flex flex-col items-center justify-center text-center py-8 px-6 min-w-36">
                                <Pencil
                                    className="md:w-32 md:h-32 w-16 h-16 text-yellow-400"
                                    strokeWidth={0.5}
                                />
                                <p className="font-semibold md:text-3xl mt-4 flex items-center">
                                    Detailed Editor
                                </p>
                            </GlareCardDark>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0.0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.8,
                            duration: 0.6,
                            ease: "easeInOut",
                        }}
                        className="flex justify-center xl:mt-10"
                    >
                        <Link href={"/dashboard"}>
                            <Button className="flex items-center z-20">
                                Get Started
                                <ArrowRight
                                    className="ml-1 w-5 h-5"
                                    strokeWidth={3}
                                />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </>
    );
}
