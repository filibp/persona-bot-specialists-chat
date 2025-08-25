import * as React from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

export interface MultiSelectProps {
  options: string[]
  selected: string[]
  onChange: (selected: string[]) => void
  placeholder?: string
  className?: string
}

export function MultiSelect({
  options,
  selected = [],
  onChange,
  placeholder = "Select items...",
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)

  const handleUnselect = (item: string) => {
    onChange(selected.filter((s) => s !== item))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = e.target as HTMLInputElement
    if (input.value === "") {
      if (e.key === "Backspace" && selected.length > 0) {
        onChange(selected.slice(0, -1))
      }
      if (e.key === "Escape") {
        input.blur()
      }
    }
  }

  const selectables = options.filter((option) => !selected.includes(option))

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between text-left font-normal min-h-10 h-auto", className)}
          onClick={() => setOpen(!open)}
        >
          <div className="flex gap-1 flex-wrap items-center max-w-full">
            {selected.length === 0 && (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
            {selected.length > 0 && (
              <div className="flex flex-wrap gap-1 max-w-full">
                {selected.slice(0, 2).map((item) => (
                  <Badge
                    variant="secondary"
                    key={item}
                    className="text-xs px-2 py-1 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleUnselect(item)
                    }}
                  >
                    {item}
                    <button
                      className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleUnselect(item)
                        }
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleUnselect(item)
                      }}
                    >
                      <X className="h-3 w-3 text-primary hover:text-primary/70" />
                    </button>
                  </Badge>
                ))}
                {selected.length > 2 && (
                  <Badge variant="secondary" className="text-xs px-2 py-1 bg-muted text-muted-foreground">
                    +{selected.length - 2} more
                  </Badge>
                )}
              </div>
            )}
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50 ml-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="Search..." onKeyDown={handleKeyDown} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {selectables.map((option) => (
                <CommandItem
                  key={option}
                  onSelect={() => {
                    onChange([...selected, option])
                    setOpen(true)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected.includes(option) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}