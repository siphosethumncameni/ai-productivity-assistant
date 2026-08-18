import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Copy, Check, Pencil, Eye, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export function OutputPanel({
  text,
  isLoading,
  emptyHint,
  filename,
}: {
  text: string;
  isLoading: boolean;
  emptyHint: string;
  filename: string;
}) {
  const [draft, setDraft] = useState(text);
  const [editing, setEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setDraft(text);
  }, [text]);

  const copy = async () => {
    await navigator.clipboard.writeText(draft);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 1600);
  };

  const download = () => {
    const blob = new Blob([draft], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="flex min-h-[26rem] flex-col rounded-xl border border-border bg-card shadow-panel">
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3">
        <h2 className="font-display text-sm font-semibold">AI output</h2>
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            disabled={!draft}
            onClick={() => setEditing((v) => !v)}
          >
            {editing ? <Eye className="size-4" /> : <Pencil className="size-4" />}
            {editing ? "Preview" : "Edit"}
          </Button>
          <Button variant="ghost" size="sm" disabled={!draft} onClick={download}>
            <Download className="size-4" />
            Save
          </Button>
          <Button variant="secondary" size="sm" disabled={!draft} onClick={copy}>
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            Copy
          </Button>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-4">
        {isLoading && !draft ? (
          <div className="flex h-full min-h-[18rem] flex-col items-center justify-center gap-3 text-muted-foreground">
            <Loader2 className="size-6 animate-spin text-primary" />
            <p className="text-sm">Generating a draft for you…</p>
          </div>
        ) : !draft ? (
          <div className="flex h-full min-h-[18rem] items-center justify-center px-6 text-center text-sm text-muted-foreground">
            {emptyHint}
          </div>
        ) : editing ? (
          <Textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="min-h-[22rem] resize-y font-mono text-sm"
          />
        ) : (
          <article className="prose prose-sm max-w-none text-card-foreground [&_h3]:mt-5 [&_h3]:mb-2 [&_h3]:font-display [&_h3]:text-base [&_h3]:font-semibold [&_li]:my-1 [&_p]:my-2 [&_strong]:font-semibold [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-border [&_td]:p-2 [&_th]:border [&_th]:border-border [&_th]:bg-muted [&_th]:p-2 [&_th]:text-left [&_ul]:list-disc [&_ul]:pl-5">
            <ReactMarkdown>{draft}</ReactMarkdown>
          </article>
        )}
      </div>

      <footer className="border-t border-border px-4 py-2.5 text-xs text-muted-foreground">
        Editable draft — AI can make mistakes. Verify names, dates and figures before use.
      </footer>
    </section>
  );
}