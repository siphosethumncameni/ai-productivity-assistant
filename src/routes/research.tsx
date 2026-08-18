import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { ToolWorkspace } from "@/components/assistant/ToolWorkspace";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant | Nexa Workplace Assistant" },
      {
        name: "description",
        content:
          "Summarize topics or pasted articles into executive briefings with insights, recommendations and stated confidence gaps.",
      },
      { property: "og:title", content: "AI Research Assistant | Nexa Workplace Assistant" },
      {
        property: "og:description",
        content: "Decision-ready briefings with insights, recommendations and confidence gaps.",
      },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  return (
    <ToolWorkspace
      mode="research"
      icon={Search}
      title="AI Research Assistant"
      description="Summarize a topic or an article you paste in, and get insights, recommendations and an honest list of what still needs verifying."
      submitLabel="Build briefing"
      emptyHint="Enter a topic or paste an article to get an executive briefing with recommendations."
      fields={[
        {
          name: "topic",
          label: "Topic or question",
          kind: "input",
          required: true,
          placeholder: "How should small teams adopt AI tools responsibly?",
        },
        {
          name: "audience",
          label: "Audience & depth",
          kind: "select",
          options: [
            "Executive summary for managers",
            "Practical guide for a team",
            "Detailed analyst briefing",
            "Beginner-friendly explainer",
          ],
        },
        {
          name: "source",
          label: "Paste article or source material (optional)",
          kind: "textarea",
          rows: 10,
          placeholder: "Paste the article text here to summarize it instead of relying on general knowledge.",
          help: "When source text is provided, the assistant summarizes it and flags anything it cannot verify.",
        },
      ]}
      sample={{
        topic: "Responsible adoption of AI writing assistants in South African workplaces",
        audience: "Practical guide for a team",
        source: "",
      }}
    />
  );
}