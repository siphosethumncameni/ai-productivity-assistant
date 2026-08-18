# AI-Workplace-Productivity-Assistant (Nexa)

A modern, responsive web application that helps professionals automate everyday workplace tasks with AI: writing emails, summarizing meetings, planning work, researching topics and answering questions in chat.

## Project Overview

Knowledge workers lose hours every week to repetitive admin: drafting the same kinds of emails, rewriting messy meeting notes, re-planning an overloaded task list and skimming long articles. Nexa puts five AI assistants in one SaaS-style dashboard, each driven by a carefully engineered prompt, and always returns an **editable draft** that the human reviews before use.

## Features

1. **Smart Email Generator** — professional emails from a short intent, with tone control (formal, friendly, persuasive, apologetic, concise), subject line, structure, call to action and review notes.
2. **Meeting Notes Summarizer** — turns raw notes or a transcript into a summary plus decisions, an action-item table (owner / action / deadline), key dates and open risks.
3. **AI Task Planner** — classifies tasks by urgency and importance, then time-blocks a realistic daily or weekly schedule with buffers, focus rules and a defer/delegate list.
4. **AI Research Assistant** — briefings on a topic or a pasted article: executive summary, key concepts, insights, recommendations and an explicit "confidence & gaps" section.
5. **AI Chatbot Interface** — an interactive workplace assistant that keeps full conversation context, with markdown rendering and prompt starters.

Supporting UX:

- Dashboard layout with collapsible sidebar navigation
- Fully responsive (mobile + desktop)
- Clear input and output sections, with **Edit / Preview / Copy / Save as markdown** on every result
- "Load example" data on each tool for quick demos
- Responsible AI disclaimers in the sidebar, footer, forms and output panels

## Prompt Engineering Approach

Each tool has a dedicated system prompt (`src/lib/assistant-prompts.ts`) that defines:

- a **role** (communication specialist, meeting analyst, productivity coach, research analyst, assistant),
- an explicit **method** (steps and frameworks such as Eisenhower prioritisation and time-blocking),
- a strict **output contract** (fixed markdown sections and tables), and
- shared **responsible AI rules** injected into every prompt.

User input is assembled into a labelled prompt so the model always receives structured, unambiguous context.

## Responsible AI Practices

- Human-in-the-loop: every output is an editable draft, never an automated action.
- No fabricated facts: prompts require assumptions to be labelled and gaps to be stated.
- No legal, medical or financial advice; the assistant defers to professionals.
- Fairness: outputs must be inclusive, unbiased and non-discriminatory.
- Privacy: the app stores nothing — no database, no chat history persistence — and users are warned not to paste confidential data.
- Transparency: AI-generated areas are visibly labelled throughout the UI.

## Tools Used

- **TanStack Start** (React 19 + TanStack Router) with SSR
- **Vite 8** build tooling
- **TypeScript**
- **Tailwind CSS v4** with a semantic design-token system (`src/styles.css`)
- **shadcn/ui** + Radix primitives + lucide-react icons
- **TanStack Query** for request state
- **Vercel AI SDK** (`ai`, `@ai-sdk/openai-compatible`)
- **Lovable AI Gateway** (Gemini 3.7 Flash) called from server functions so the API key never reaches the browser
- **react-markdown** for rendering AI output, **sonner** for toasts, **zod** for input validation

## Project Structure

```
src/
  routes/
    __root.tsx      dashboard shell: sidebar, header, footer, disclaimer
    index.tsx       dashboard home + responsible AI commitments
    email.tsx       Smart Email Generator
    notes.tsx       Meeting Notes Summarizer
    planner.tsx     AI Task Planner
    research.tsx    AI Research Assistant
    chat.tsx        AI Chatbot Interface
  components/assistant/
    AppSidebar.tsx      sidebar navigation
    ToolWorkspace.tsx   reusable input form + AI call
    OutputPanel.tsx     editable output, copy, download
  lib/
    assistant-prompts.ts  system prompts + responsible AI rules
    ai.functions.ts       server function (typed RPC entry point)
    ai.server.ts          model call
    ai-gateway.server.ts  AI gateway provider
```

## Setup Instructions

```bash
bun install      # or: npm install
bun run dev      # start dev server on http://localhost:8080
bun run build    # production build
```

Environment: `LOVABLE_API_KEY` is provided automatically by Lovable and is read **only** inside server functions. No other configuration or external account is required.

To run outside Lovable, set `LOVABLE_API_KEY` in your environment before starting the dev server.

## Team Members

- Siphosethu Mncameni — design, prompt engineering and implementation
