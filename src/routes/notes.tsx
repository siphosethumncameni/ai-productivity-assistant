import { createFileRoute } from "@tanstack/react-router";
import { NotebookPen } from "lucide-react";
import { ToolWorkspace } from "@/components/assistant/ToolWorkspace";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer | Nexa Workplace Assistant" },
      {
        name: "description",
        content:
          "Summarize long meeting notes into decisions, owner-assigned action items and deadlines in seconds.",
      },
      { property: "og:title", content: "Meeting Notes Summarizer | Nexa Workplace Assistant" },
      {
        property: "og:description",
        content: "Turn messy meeting notes into decisions, action items and deadlines.",
      },
    ],
  }),
  component: NotesPage,
});

function NotesPage() {
  return (
    <ToolWorkspace
      mode="notes"
      icon={NotebookPen}
      title="Meeting Notes Summarizer"
      description="Paste raw notes or a transcript. Get a clean summary plus decisions, an action-item table with owners and deadlines, and open risks."
      submitLabel="Summarize notes"
      emptyHint="Paste your meeting notes on the left to get a summary, decisions, action items and deadlines."
      fields={[
        {
          name: "context",
          label: "Meeting context (optional)",
          kind: "input",
          placeholder: "Weekly project sync, 18 Aug, attendees: Sipho, Lerato, Kabelo",
        },
        {
          name: "notes",
          label: "Raw notes or transcript",
          kind: "textarea",
          required: true,
          rows: 14,
          placeholder: "Paste everything — bullet fragments, half sentences, chat log…",
        },
      ]}
      sample={{
        context: "Weekly delivery sync, 18 Aug 2026, attendees: Sipho, Lerato, Kabelo, Naledi",
        notes:
          "Lerato: dashboard v2 behind by 3 days, blocked on API keys from vendor. Kabelo said he'll chase vendor today. Agreed we ship the reporting module without the export feature for now, export moves to next sprint. Naledi raised that QA has no test data - Sipho to prepare a sample dataset by Thursday. Client demo confirmed for 28 August 10:00. Budget question: extra R15k for licenses, Sipho to confirm with finance before Friday. Risk: if vendor keys don't arrive by Wednesday the demo scope shrinks.",
      }}
    />
  );
}