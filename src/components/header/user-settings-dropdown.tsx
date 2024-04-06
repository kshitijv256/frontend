import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOut, Settings2, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthProvider } from "@/providers/authProvider";
import { DefaultUserImage } from "@/constants";

export function UserSettingsDropdown() {
  const { user } = useAuthProvider();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={user?.profilePicture || DefaultUserImage} />
            <AvatarFallback>PP</AvatarFallback>
          </Avatar>
          <span className="sr-only">t{"user-settings-dropdown"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex">
        <DropdownMenuItem>
          <Link to="/profile" className="flex flex-col items-center">
            <User className="h-8 w-8" />
            <p>Profile</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/preferences" className="flex flex-col items-center">
            <Settings2 className="h-8 w-8" />
            <p>Preferences</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/logout" className="flex flex-col items-center">
            <LogOut className="h-8 w-8" />
            <p>Logout</p>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
