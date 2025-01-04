"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";

interface MultiTextProps {
  placeholder: string;
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

export default function MultiText({
  placeholder,
  value,
  onChange,
  onRemove,
}: MultiTextProps) {
  const [inputValue, setInputValue] = useState("");
  const addValue = (value: string) => {
    onChange(value);
    setInputValue("");
  };
  return (
    <div>
      <>
        <Input
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
                e.preventDefault();
              addValue(inputValue);
            }
          }}
        />
        <div className="flex flex-wrap mt-4 gap-1">
          {value.map((value, index) => (
            <Badge key={index} className="bg-primary-100 text-purple-700 capitalize flex items-center hover:border hover:border-primary-300">
              {value} <X onClick={() => onRemove(value)} className="ml-2 h-3 w-3 cursor-pointer" />
            </Badge>
          ))}
        </div>
      </>
    </div>
  );
}
