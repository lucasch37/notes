import { createGoogleGenerativeAI, google } from "@ai-sdk/google";
import { generateText, StreamingTextResponse, streamText } from "ai";

export const POST = async (req: Request) => {
    const { prompt } = await req.json();

    const google = createGoogleGenerativeAI({
        apiKey: process.env.GOOGLE_API_KEY,
    });
    const textStream = await streamText({
        model: google("models/gemini-pro"),
        prompt: `Hello, you are an AI assistant for a note taking app. When users click a button, you will autocomplete a line of text they are currently typing. Please autocomplete the following text in a through way. You must only include one response, and you must exclude the part of the original text in your response, starting right where the text leaves off. You must not include any ellipsis at the start of your response. If original the text ends with a period, you must make sure to start a completely new sentence. Don't include any mention of yourself being an AI note taking assistant. If the text is hard to read or you do not understand, respond with "Unable to autocomplete." and only that. Do not say "I'm sorry, I'm unable to autocomplete this text." The text is: "${prompt}"`,
    });
    return new StreamingTextResponse(textStream.toAIStream());
};
