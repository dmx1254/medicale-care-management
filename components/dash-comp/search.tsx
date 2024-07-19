import { Input } from "@/components/ui/input";

export function Search() {
  return (
    <div>
      <Input
        type="search"
        placeholder="Search what you want..."
        className="md:w-[100px] lg:w-[300px] bg-transparent border-dark-500 text-white placeholder:text-dark-500"
      />
    </div>
  );
}
