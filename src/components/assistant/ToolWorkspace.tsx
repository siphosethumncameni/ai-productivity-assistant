import { useState, type ComponentType } from "react";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Sparkles, RotateCcw, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OutputPanel } from "./OutputPanel";
import { generateAssistantText } from "@/lib/ai.functions";
import { buildUserPrompt, type AssistantMode } from "@/lib/assistant-prompts";

export type FieldConfig = {
  name: string;
  label: string;
  kind: "input" | "textarea" | "select";
  placeholder?: string;
  options?: string[];
  required?: boolean;
  rows?: number;
  help?: string;
};

export function ToolWorkspace({
  mode,
  title,
  description,
  icon: Icon,
  fields,
  submitLabel,
  emptyHint,
  sample,
}: {
  mode: AssistantMode;
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  fields: FieldConfig[];
  submitLabel: string;
  emptyHint: string;
  sample: Record<string, string>;
}) {
  const initial = Object.fromEntries(
    fields.map((f) => [f.name, f.kind === "select" ? (f.options?.[0] ?? "") : ""]),
  ) as Record<string, string>;
  const [values, setValues] = useState<Record<string, string>>(initial);
  const [output, setOutput] = useState("");

  const callAssistant = useServerFn(generateAssistantText);
  const mutation = useMutation({
    mutationFn: async () => {
      const prompt = buildUserPrompt(
        mode,
        Object.fromEntries(fields.map((f) => [f.label, values[f.name]])),
      );
      return callAssistant({ data: { mode, messages: [{ role: "user", content: prompt }] } });
    },
    onSuccess: (result) => setOutput(result.text),
  });

  const missing = fields.filter((f) => f.required && !values[f.name]?.trim());

  return (
    <div className="space-y-6">
      <header className="rounded-xl bg-hero p-6 text-primary-foreground shadow-panel">
        <div className="flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/15">
            <Icon className="size-5" />
          </span>
          <div>
            <h1 className="font-display text-2xl font-semibold">{title}</h1>
            <p className="mt-1 max-w-2xl text-sm text-primary-foreground/80">{description}</p>
          </div>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <form
          className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-panel"
          onSubmit={(e) => {
            e.preventDefault();
            if (missing.length === 0) mutation.mutate();
          }}
        >
          <div className="flex items-center justify-between">
            <h2 className="font-display text-sm font-semibold">Your input</h2>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setValues({ ...initial, ...sample })}
            >
              <RotateCcw className="size-4" />
              Load example
            </Button>
          </div>

          {fields.map((field) => (
            <div key={field.name} className="space-y-1.5">
              <Label htmlFor={field.name}>
                {field.label}
                {field.required ? <span className="text-destructive"> *</span> : null}
              </Label>
              {field.kind === "textarea" ? (
                <Textarea
                  id={field.name}
                  rows={field.rows ?? 6}
                  placeholder={field.placeholder}
                  value={values[field.name] ?? ""}
                  onChange={(e) => setValues((v) => ({ ...v, [field.name]: e.target.value }))}
                />
              ) : field.kind === "select" ? (
                <Select
                  value={values[field.name] ?? ""}
                  onValueChange={(val) => setValues((v) => ({ ...v, [field.name]: val }))}
                >
                  <SelectTrigger id={field.name}>
                    <SelectValue placeholder={field.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  id={field.name}
                  placeholder={field.placeholder}
                  value={values[field.name] ?? ""}
                  onChange={(e) => setValues((v) => ({ ...v, [field.name]: e.target.value }))}
                />
              )}
              {field.help ? (
                <p className="text-xs text-muted-foreground">{field.help}</p>
              ) : null}
            </div>
          ))}

          {mutation.isError ? (
            <p className="flex items-start gap-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              <AlertTriangle className="mt-0.5 size-4 shrink-0" />
              {(mutation.error as Error).message}
            </p>
          ) : null}

          <Button type="submit" disabled={mutation.isPending || missing.length > 0}>
            <Sparkles className="size-4" />
            {mutation.isPending ? "Working…" : submitLabel}
          </Button>
          <p className="text-xs text-muted-foreground">
            Do not paste confidential personal data. Outputs are AI-generated drafts you remain
            responsible for.
          </p>
        </form>

        <OutputPanel
          text={output}
          isLoading={mutation.isPending}
          emptyHint={emptyHint}
          filename={mode}
        />
      </div>
    </div>
  );
}