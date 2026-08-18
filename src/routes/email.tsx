import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { ToolWorkspace } from "@/components/assistant/ToolWorkspace";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator | Nexa Workplace Assistant" },
      {
        name: "description",
        content:
          "Generate professional workplace emails in formal, friendly, persuasive or concise tones, then edit the draft before sending.",
      },
      { property: "og:title", content: "Smart Email Generator | Nexa Workplace Assistant" },
      {
        property: "og:description",
        content: "AI-drafted business emails with tone control and editable output.",
      },
    ],
  }),
  component: EmailPage,
});

function EmailPage() {
  return (
    <ToolWorkspace
      mode="email"
      icon={Mail}
      title="Smart Email Generator"
      description="Turn a rough intention into a polished business email. Choose a tone and the assistant handles subject line, structure and call to action."
      submitLabel="Generate email"
      emptyHint="Fill in the recipient and your message goal, then generate a draft. You can edit every word afterwards."
      fields={[
        {
          name: "recipient",
          label: "Recipient & relationship",
          kind: "input",
          required: true,
          placeholder: "e.g. Thandi Mokoena, HR Manager at a client company",
        },
        {
          name: "tone",
          label: "Tone",
          kind: "select",
          options: ["Formal", "Friendly", "Persuasive", "Apologetic", "Concise"],
        },
        {
          name: "goal",
          label: "Purpose & key points",
          kind: "textarea",
          required: true,
          rows: 7,
          placeholder:
            "Follow up on my learnership application submitted 3 weeks ago, mention my data analytics certificate, ask about next steps.",
          help: "Bullet points are fine — the assistant will structure them.",
        },
        {
          name: "constraints",
          label: "Extras (optional)",
          kind: "input",
          placeholder: "Keep under 120 words, mention Friday deadline",
        },
      ]}
      sample={{
        recipient: "Sipho Dlamini, Operations Lead (internal, works closely with my team)",
        tone: "Friendly",
        goal: "Ask him to move our weekly sync from Monday 09:00 to Tuesday 11:00 because of a client workshop. Offer to share notes if he cannot attend.",
        constraints: "Keep it under 120 words",
      }}
    />
  );
}