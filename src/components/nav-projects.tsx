"use client"

import { ChevronRight, Moon, Pencil, Settings2 } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { InputSwitch } from "primereact/inputswitch"

interface SettingsItem {
  title: string
  page: string
}

export function NavProjects({
  settingsItems,
  settingsOpen,
  onSettingsOpenChange,
  currentPage,
  onNavigate,
  searchQuery = "",
  isEditMode,
  onEditModeToggle,
  theme,
  onToggleTheme,
}: {
  settingsItems: SettingsItem[]
  settingsOpen: boolean
  onSettingsOpenChange: (open: boolean) => void
  currentPage?: string
  onNavigate?: (page: string) => void
  searchQuery?: string
  isEditMode?: boolean
  onEditModeToggle?: () => void
  theme?: string
  onToggleTheme?: () => void
}) {
  const isSearching = searchQuery.trim().length > 0
  const q = searchQuery.toLowerCase()

  const filteredSettings = isSearching
    ? settingsItems.filter(i => i.title.toLowerCase().includes(q))
    : settingsItems

  const showSettings = !isSearching
    ? true
    : ("settings".includes(q) || filteredSettings.length > 0)

  // Hide the whole section if search matches nothing in Projects
  if (isSearching && !showSettings) return null

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        {/* Settings collapsible */}
        {showSettings && (
          <Collapsible
            asChild
            open={isSearching ? true : settingsOpen}
            onOpenChange={v => { if (!isSearching) onSettingsOpenChange(v) }}
          >
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Settings" className="transition-colors duration-150">
                <a
                  href="#"
                  onClick={e => { e.preventDefault(); if (!isSearching) onSettingsOpenChange(!settingsOpen) }}
                >
                  <Settings2 />
                  <span>Settings</span>
                </a>
              </SidebarMenuButton>
              <CollapsibleTrigger asChild>
                <SidebarMenuAction className="transition-transform duration-300 data-[state=open]:rotate-90">
                  <ChevronRight />
                  <span className="sr-only">Toggle</span>
                </SidebarMenuAction>
              </CollapsibleTrigger>
              <CollapsibleContent className="nav-collapsible-content">
                <SidebarMenuSub>
                  {/* Edit Mode toggle */}
                  <SidebarMenuSubItem>
                    <div className="flex items-center justify-between w-full px-2 py-1.5 rounded-md text-sm">
                      <button
                        onClick={onEditModeToggle}
                        className={`flex items-center gap-2 font-medium transition-colors ${
                          isEditMode ? "text-primary" : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Pencil className="size-3.5 shrink-0" />
                        <span>Edit Mode</span>
                      </button>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                        isEditMode ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}>
                        {isEditMode ? "ON" : "OFF"}
                      </span>
                    </div>
                  </SidebarMenuSubItem>

                  {/* Dark Mode toggle */}
                  <SidebarMenuSubItem>
                    <div className="flex items-center justify-between w-full px-2 py-1.5 rounded-md text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground font-medium">
                        <Moon className="size-3.5 shrink-0" />
                        <span>Dark Mode</span>
                      </div>
                      <div className="sidebar-switch">
                        <InputSwitch
                          checked={theme === "dark"}
                          onChange={() => onToggleTheme?.()}
                          pt={{
                            root: { style: { width: "2.4rem", height: "1.3rem", flexShrink: "0" } },
                            slider: { style: { borderRadius: "9999px" } },
                          }}
                        />
                      </div>
                    </div>
                  </SidebarMenuSubItem>

                  {/* Divider */}
                  <div className="mx-2 my-1 border-t border-border/50" />

                  {filteredSettings.map(item => (
                    <SidebarMenuSubItem key={item.page}>
                      <SidebarMenuSubButton
                        asChild
                        className="transition-colors duration-150"
                        isActive={currentPage === item.page}
                      >
                        <a
                          href="#"
                          onClick={e => { e.preventDefault(); onNavigate?.(item.page) }}
                        >
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        )}

      </SidebarMenu>
    </SidebarGroup>
  )
}
