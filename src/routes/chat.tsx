import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import ReactMarkdown from "react-markdown";
import { Send, MessageSquare, Loader2, ShieldCheck, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { generateAssistantText } from "@/lib/ai.functions";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Workplace Chatbot | Nexa Workplace Assistant" },
      {
        name: "description",
        content:
          "Chat with Nexa, an AI workplace assistant for emails, meetings, planning and everyday professional questions.",
      },
      { property: "og:title", content: "AI Workplace Chatbot | Nexa Workplace Assistant" },
      {
        property: "og:description",
        content: "An interactive AI assistant for everyday workplace questions.",
      },
    ],
  }),
  component: ChatPage,
});

type Msg = { role: "user" | "assistant"; content: string };

const STARTERS = [
  "Help me decline a meeting invite politely",
  "How do I structure a weekly team update?",
  "Draft an agenda for a 30-minute project kickoff",
  "Give me 5 ways to cut my meeting load",
];

function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const callAssistant = useServerFn(generateAssistantText);

  const mutation = useMutation({
    mutationFn: async (history: Msg[]) =>
      callAssistant({ data: { mode: "chat" as const, messages: history } }),
    onSuccess: (result) =>
      setMessages((prev) => [...prev, { role: "assistant", content: result.text }]),
  });

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, mutation.isPending]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || mutation.isPending) return;
    const history: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(history);
    setInput("");
    mutation.mutate(history);
  };

  return (
    <div className="flex h-[calc(100vh-7rem)] flex-col gap-4">
      <header className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-hero px-5 py-4 text-primary-foreground shadow-panel">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-lg bg-primary-foreground/15">
            <MessageSquare className="size-5" />
          </span>
          <div>
            <h1 className="font-display text-xl font-semibold">AI Workplace Chat</h1>
            <p className="text-sm text-primary-foreground/80">
              Ask Nexa anything about your work day — it remembers this conversation.
            </p>
          </div>
        </div>
        {messages.length > 0 ? (
          <Button variant="secondary" size="sm" onClick={() => setMessages([])}>
            <Trash2 className="size-4" />
            Clear chat
          </Button>
        ) : null}
      </header>

      <div className="flex min-h-0 flex-1 flex-col rounded-xl border border-border bg-card shadow-panel">
        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
          {messages.length === 0 ? (
            <div className="mx-auto max-w-lg py-10 text-center">
              <p className="font-display text-lg font-semibold">How can I help today?</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try one of these to get started.
              </p>
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                {STARTERS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-lg border border-border bg-background p-3 text-left text-sm transition-colors hover:border-primary hover:bg-accent/40"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((m, i) => (
              <div
                key={i}
                className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
              >
                <div
                  className={
                    m.role === "user"
                      ? "max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground"
                      : "max-w-[85%] rounded-2xl rounded-bl-sm border border-border bg-secondary/60 px-4 py-2.5 text-sm text-secondary-foreground [&_li]:my-1 [&_p]:my-2 [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-5"
                  }
                >
                  {m.role === "user" ? m.content : <ReactMarkdown>{m.content}</ReactMarkdown>}
                </div>
              </div>
            ))
          )}

          {mutation.isPending ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin text-primary" />
              Nexa is thinking…
            </div>
          ) : null}
          {mutation.isError ? (
            <p className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {(mutation.error as Error).message}
            </p>
          ) : null}
          <div ref={endRef} />
        </div>

        <form
          className="border-t border-border p-3"
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
        >
          <div className="flex items-end gap-2">
            <Textarea
              value={input}
              rows={2}
              placeholder="Ask about an email, a meeting, a plan…"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              className="min-h-[3rem] resize-none"
            />
            <Button type="submit" size="icon" disabled={mutation.isPending || !input.trim()}>
              <Send className="size-4" />
            </Button>
          </div>
          <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="size-3.5" />
            Nexa can be wrong. Don't share confidential data, and verify anything important.
          </p>
        </form>
      </div>
    </div>
  );
}