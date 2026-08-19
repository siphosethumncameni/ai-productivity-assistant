import { Check, Moon, Palette, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

type Option = { id: "light" | "dark"; label: string; hint: string; icon: typeof Sun };

const options: Option[] = [
  { id: "light", label: "Light lavender", hint: "White surfaces, lavender accents", icon: Sun },
  { id: "dark", label: "Dark lavender", hint: "Deep lavender surfaces, soft glow", icon: Moon },
];

function MiniPreview({ scheme }: { scheme: "light" | "dark" }) {
  return (
    <div className={cn(scheme === "dark" && "dark", "overflow-hidden rounded-lg border border-border")}>
      <div className="bg-hero px-2.5 py-3">
        <div className="h-1.5 w-14 rounded-full bg-primary-foreground/80" />
        <div className="mt-1.5 h-1 w-20 rounded-full bg-primary-foreground/45" />
      </div>
      <div className="flex gap-1.5 bg-background p-2.5">
        <div className="w-6 space-y-1 rounded-md bg-sidebar p-1.5">
          <div className="h-1 rounded-full bg-sidebar-primary" />
          <div className="h-1 rounded-full bg-sidebar-foreground/40" />
          <div className="h-1 rounded-full bg-sidebar-foreground/40" />
        </div>
        <div className="flex-1 space-y-1.5 rounded-md border border-border bg-card p-2">
          <div className="h-1 w-3/4 rounded-full bg-card-foreground/70" />
          <div className="h-1 w-full rounded-full bg-muted-foreground/40" />
          <div className="flex gap-1 pt-0.5">
            <div className="h-2 w-8 rounded-full bg-primary" />
            <div className="h-2 w-6 rounded-full bg-accent" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ThemePreview() {
  const { theme, setTheme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Preview and choose theme">
          <Palette className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72">
        <p className="font-display text-sm font-semibold">Theme preview</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          See each lavender style, then pick the one you want.
        </p>
        <div className="mt-3 space-y-3">
          {options.map((option) => {
            const active = theme === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setTheme(option.id)}
                className={cn(
                  "w-full rounded-xl border p-2 text-left transition-colors",
                  active ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
                )}
              >
                <MiniPreview scheme={option.id} />
                <span className="mt-2 flex items-center gap-1.5 text-xs font-medium">
                  <option.icon className="size-3.5 text-primary" />
                  {option.label}
                  {active && <Check className="ml-auto size-3.5 text-primary" />}
                </span>
                <span className="mt-0.5 block text-[11px] text-muted-foreground">{option.hint}</span>
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
