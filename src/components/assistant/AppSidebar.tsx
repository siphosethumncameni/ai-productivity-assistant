import { Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Mail,
  NotebookPen,
  CalendarClock,
  Search,
  MessageSquare,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", to: "/", icon: LayoutDashboard },
  { title: "Email Generator", to: "/email", icon: Mail },
  { title: "Notes Summarizer", to: "/notes", icon: NotebookPen },
  { title: "Task Planner", to: "/planner", icon: CalendarClock },
  { title: "Research Assistant", to: "/research", icon: Search },
  { title: "AI Chat", to: "/chat", icon: MessageSquare },
] as const;

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border px-4 py-4">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Sparkles className="size-5" />
          </span>
          <div className="leading-tight">
            <p className="font-display text-sm font-semibold">Nexa Workplace</p>
            <p className="text-xs text-sidebar-foreground/60">AI Productivity Assistant</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link
                      to={item.to}
                      activeOptions={{ exact: item.to === "/" }}
                      activeProps={{
                        className: "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
                      }}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="flex items-start gap-2 text-xs text-sidebar-foreground/70">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-sidebar-primary" />
          <p>AI output is a draft. Always review before sending or acting on it.</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}