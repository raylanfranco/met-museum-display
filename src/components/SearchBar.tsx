import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSearch(input.trim());
    setInput("");
  };

  return (
    <div className="w-full flex justify-start">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Search by title or object ID..."
          className="w-full min-w-[16rem] max-w-xl border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded text-sm hover:bg-gray-800 cursor-pointer"
        >
          Search
        </button>
      </form>
    </div>
  );
}
