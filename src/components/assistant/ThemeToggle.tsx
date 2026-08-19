import { Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  return (
    <Button
      variant="ghost"
      size="icon"
      disabled
      aria-label="Light lavender theme is active"
      title="Light lavender theme is active"
    >
      <Sun className="size-4" />
    </Button>
  );
}
