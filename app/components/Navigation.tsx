import { NotebookText } from "lucide-react";

import Link from "next/link";
import { useThemeToggle } from "./ThemeProvider";
import DarkModeToggle from "./DarkModeToggle";

function Navigation() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1 ">
        <Link href={"/"} className="flex mx-auto justify-center">
          <NotebookText className="" />
          <p>NoteKeeper</p>
        </Link>
      </div>
      <DarkModeToggle />
    </div>
  );
}

export default Navigation;
