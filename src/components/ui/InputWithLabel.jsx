"use client";

import { Label } from "./label";
import { cn } from "@/lib/utils"
import { Input } from "./input";

export function InputWithLabel({
  type,
  iconType,
  name = '',
  placeholder = "Enter Here",
  className,
  labelClass,
  inputClass,
  inputParent,
  children,
  ...props
}) {
  return (
    <div className={cn("grid w-full max-w-lg items-center gap-1.5 ", className)}>
      <Label
        htmlFor={`label-${name}`}
        className={cn("text-sm text-black font-manrope font-medium -mb-1", labelClass)}
      >
        {name?.charAt(0).toUpperCase() + name.slice(1)}
      </Label>
      <div className={cn("flex items-center gap-2 border rounded-sm px-2 bg-white",inputParent)}>
        {iconType === "pre" && <div>{children}</div>}
        <Input
          type={type}
          id={`label-${name}`}
          name={name}
          placeholder={placeholder}
          className={cn("outline-none border-none p-0 font-manrope bg-white h-12", inputClass)}
          {...props}
        />
        {iconType === "post" && <div>{children}</div>}
      </div>
    </div>
  );
}
