"use client";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";

interface MultiSelectProps {
  placeholder: string;
  collections: CollectionType[];
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

export default function MultiSelect({
  placeholder,
  collections,
  value,
  onChange,
  onRemove,
}: MultiSelectProps) {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  let selected: CollectionType[];

  if(value.length === 0) {
    selected = [];
  }else{
    selected = value.map((id) => collections.find((collection) => collection._id === id)) as CollectionType[];
  }

  const selectable = collections.filter((collection) => !selected.includes(collection));

  return (
    <div>
      <>
        <Command className="overflow-visible bg-white">
          <div className="flex gap-1 flex-wrap border border-primary-300 rounded-md py-2">
            <CommandInput
              placeholder={placeholder}
              value={inputValue}
              onValueChange={setInputValue}
              onBlur={() => setOpen(false)}
              onFocus={() => setOpen(true)}
            />

            {selected.map((collection) => (
              <Badge key={collection._id} className="bg-primary-100 text-purple-700 capitalize flex items-center hover:border hover:border-primary-300 mt-1 mx-1">
                {collection.title} <X onClick={() => onRemove(collection._id)} className="ml-2 h-3 w-3 cursor-pointer" />
              </Badge>
            ))}
          </div>
          <div className="relative mt-2">
            {open && (
              <CommandGroup className="absolute z-10 w-full top-0 overflow-y-auto border border-primary-300 rounded-md shadow-md">
                {selectable.map((collection) => (
                  <CommandItem
                    key={collection._id}
                    onMouseDown={(e) => e.preventDefault()}
                    onSelect={() => {
                      onChange(collection._id);
                      setInputValue("");
                    }}
                    className="hover:bg-primary-200 hover:text-primary-700"
                  >
                    {collection.title}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </div>
        </Command>
      </>
    </div>
  );
}
