import { Palette, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

function MiniPreview() {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
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
  return (
    <div className="group relative inline-flex items-center">
      <Button variant="ghost" size="icon" aria-label="Theme preview" title="Theme preview">
        <Palette className="size-4" />
      </Button>
      <div className="pointer-events-none absolute right-0 top-full z-50 mt-2 w-64 origin-top-right scale-95 rounded-xl border border-border bg-popover p-3 opacity-0 shadow-panel transition-all duration-200 group-hover:pointer-events-auto group-hover:scale-100 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:scale-100 group-focus-within:opacity-100">
        <p className="font-display text-sm font-semibold">Theme preview</p>
        <p className="mt-0.5 text-xs text-muted-foreground">Nexa is set to light lavender.</p>
        <div className="mt-3 rounded-xl border border-primary bg-primary/5 p-2">
          <MiniPreview />
          <span className="mt-2 flex items-center gap-1.5 text-xs font-medium">
            <Check className="size-3.5 text-primary" />
            Light lavender
          </span>
          <span className="mt-0.5 block text-[11px] text-muted-foreground">
            White surfaces, lavender accents.
          </span>
        </div>
      </div>
    </div>
  );
}
