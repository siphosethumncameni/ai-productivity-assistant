import { streamText } from "ai";
import { createLovableAiGatewayProvider } from "./ai-gateway.server";
import { SYSTEM_PROMPTS, type AssistantMode } from "./assistant-prompts";

export type AssistantMessage = { role: "user" | "assistant"; content: string };

export async function runAssistant(mode: AssistantMode, messages: AssistantMessage[]) {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) throw new Error("AI is not configured (missing LOVABLE_API_KEY).");

  const gateway = createLovableAiGatewayProvider(apiKey);

  const result = streamText({
    model: gateway("google/gemini-3.7-flash"),
    system: SYSTEM_PROMPTS[mode],
    messages,
  });

  const text = await result.text;
  return { text };
}