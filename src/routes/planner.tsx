import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock } from "lucide-react";
import { ToolWorkspace } from "@/components/assistant/ToolWorkspace";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner | Nexa Workplace Assistant" },
      {
        name: "description",
        content:
          "Turn a messy task list into a prioritised, time-blocked daily or weekly schedule with focus rules.",
      },
      { property: "og:title", content: "AI Task Planner | Nexa Workplace Assistant" },
      {
        property: "og:description",
        content: "Prioritised, time-blocked daily and weekly schedules built from your task list.",
      },
    ],
  }),
  component: PlannerPage,
});

function PlannerPage() {
  return (
    <ToolWorkspace
      mode="planner"
      icon={CalendarClock}
      title="AI Task Planner"
      description="Prioritises your tasks with urgent/important classification, then time-blocks them into a realistic schedule with buffers."
      submitLabel="Build my schedule"
      emptyHint="List your tasks and working hours to get a prioritised, time-blocked plan."
      fields={[
        {
          name: "horizon",
          label: "Plan for",
          kind: "select",
          options: ["Today", "Tomorrow", "This week", "Next week"],
        },
        {
          name: "hours",
          label: "Working hours & fixed commitments",
          kind: "input",
          required: true,
          placeholder: "08:00-16:30, standup 09:00, client call Wed 14:00",
        },
        {
          name: "tasks",
          label: "Tasks (one per line, add deadlines if known)",
          kind: "textarea",
          required: true,
          rows: 10,
          placeholder: "Finish report - due Thursday\nPrep demo slides\nReview 3 CVs…",
        },
        {
          name: "notes",
          label: "Energy, constraints, priorities (optional)",
          kind: "input",
          placeholder: "Sharpest in the morning, no meetings after 15:00",
        },
      ]}
      sample={{
        horizon: "This week",
        hours: "08:00-16:30 Mon-Fri, standup daily 09:00, client demo Friday 10:00",
        tasks:
          "Finish delivery report - due Thursday\nPrepare client demo slides\nReview 4 learnership applications\nFix dashboard export bug\nWrite weekly team update\nOnboarding call with new intern",
        notes: "Deep work best before 11:00, admin after lunch, protect Friday morning for the demo",
      }}
    />
  );
}