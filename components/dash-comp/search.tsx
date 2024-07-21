import { Input } from "@/components/ui/input";
import { Bell } from "lucide-react";

export function Search() {
  return (
    <div className="flex items-center gap-4">
      <div className="relative cursor-pointer">
        <Bell size={26} className="text-dark-500" />
        <span className="absolute flex items-center justify-center h-4 w-4 rounded-full bg-[#dc2626] text-white/80 text-xs top-[-30%] left-[45%]">
          4
        </span>
      </div>
      <Input
        type="search"
        placeholder="Search..."
        className="w-[250] md:w-[350px] bg-transparent border-dark-500 text-white placeholder:text-dark-500"
      />
    </div>
  );
}
