import { Languages } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { language, useLanguage } from "@/providers/languageProvider";

export function LanguageModeToggle() {
  const { setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="dark:bg-black dark:text-white"
        >
          <Languages className="absolute h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Language Preferences</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage(language.enUS)}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage(language.hi)}>
          Hindi
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
