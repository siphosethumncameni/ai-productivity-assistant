import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Mail,
  NotebookPen,
  CalendarClock,
  Search,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Clock,
  Users,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nexa — AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "Nexa automates workplace tasks with AI: professional emails, meeting summaries, prioritised schedules, research briefings and a workplace chatbot.",
      },
      { property: "og:title", content: "Nexa — AI Workplace Productivity Assistant" },
      {
        property: "og:description",
        content:
          "Five AI tools for professionals: email drafting, meeting summaries, task planning, research briefings and chat.",
      },
    ],
  }),
  component: Dashboard,
});

const tools = [
  {
    to: "/email",
    icon: Mail,
    title: "Smart Email Generator",
    body: "Professional emails in formal, friendly, persuasive, apologetic or concise tones.",
  },
  {
    to: "/notes",
    icon: NotebookPen,
    title: "Meeting Notes Summarizer",
    body: "Summaries plus decisions, owner-assigned action items and deadlines.",
  },
  {
    to: "/planner",
    icon: CalendarClock,
    title: "AI Task Planner",
    body: "Urgent/important prioritisation and time-blocked daily or weekly schedules.",
  },
  {
    to: "/research",
    icon: Search,
    title: "AI Research Assistant",
    body: "Topic and article briefings with insights, recommendations and confidence gaps.",
  },
  {
    to: "/chat",
    icon: MessageSquare,
    title: "AI Chatbot",
    body: "An interactive workplace assistant that keeps the thread of your conversation.",
  },
] as const;

const stats = [
  { icon: Clock, label: "Faster drafting", value: "Minutes → seconds" },
  { icon: Users, label: "Built for", value: "Teams & professionals" },
  { icon: Lock, label: "Data handling", value: "Nothing stored" },
];

function Dashboard() {
  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-2xl bg-hero p-8 text-primary-foreground shadow-panel">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-medium">
          <Sparkles className="size-3.5" />
          Powered by Lovable AI
        </span>
        <h1 className="mt-4 max-w-2xl font-display text-3xl font-semibold sm:text-4xl">
          Your AI workplace productivity assistant
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-primary-foreground/85 sm:text-base">
          Nexa handles the writing, summarising and planning admin that eats your day — with
          structured prompts, editable outputs and responsible-AI guardrails built in.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild variant="secondary">
            <Link to="/email">
              Draft an email
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-primary-foreground/40 bg-transparent">
            <Link to="/chat">Open AI chat</Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-panel"
          >
            <span className="flex size-9 items-center justify-center rounded-lg bg-accent text-accent-foreground">
              <s.icon className="size-4" />
            </span>
            <div>
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="font-display text-sm font-semibold">{s.value}</p>
            </div>
          </div>
        ))}
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold">Workspace tools</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Five AI assistants, one dashboard. Every output is editable before you use it.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.to}
              to={tool.to}
              className="group rounded-xl border border-border bg-card p-5 shadow-panel transition-all hover:-translate-y-0.5 hover:border-primary"
            >
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <tool.icon className="size-5" />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold">{tool.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{tool.body}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Open
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-6 shadow-panel">
        <div className="flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-success/15 text-success">
            <ShieldCheck className="size-5" />
          </span>
          <div>
            <h2 className="font-display text-lg font-semibold">Responsible AI commitments</h2>
            <ul className="mt-3 grid gap-2 text-sm text-muted-foreground md:grid-cols-2">
              <li>
                <strong className="text-foreground">Human in the loop.</strong> Every output is a
                draft you review and edit before sending.
              </li>
              <li>
                <strong className="text-foreground">No fabricated facts.</strong> Prompts instruct
                the model to label assumptions and flag what needs verifying.
              </li>
              <li>
                <strong className="text-foreground">Privacy first.</strong> Nothing you type is
                stored by this app; avoid confidential or personal data.
              </li>
              <li>
                <strong className="text-foreground">Fair and professional.</strong> Content is
                generated to be inclusive, unbiased and free of discriminatory language.
              </li>
              <li>
                <strong className="text-foreground">No professional advice.</strong> Nexa does not
                give legal, medical or financial advice.
              </li>
              <li>
                <strong className="text-foreground">Transparent AI.</strong> AI-generated sections
                are clearly labelled throughout the app.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}