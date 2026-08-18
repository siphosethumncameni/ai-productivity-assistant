import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { runAssistant, type AssistantMessage } from "./ai.server";

const AssistantInput = z.object({
  mode: z.enum(["email", "notes", "planner", "research", "chat"]),
  messages: z.array(
    z.object({ role: z.enum(["user", "assistant"]), content: z.string().min(1) }),
  ).min(1),
});

export const generateAssistantText = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => AssistantInput.parse(input))
  .handler(async ({ data }) => runAssistant(data.mode, data.messages as AssistantMessage[]));