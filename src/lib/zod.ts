import { z } from "zod";

export const formSchema = z.object({
    name: z
        .string()
        .min(1, { message: "Please enter a name." })
        .max(50, { message: "Name must be at most 50 characters." }),
});
