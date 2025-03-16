import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: React.HTMLProps<HTMLElement>["className"];
}

export default function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "w-full px-5 py-3 text-lg font-semibold rounded-full transition-all duration-300",
        "bg-background-button/80 hover:bg-background-button/50 disabled:bg-gray-400",
        " dark:disabled:bg-gray-600 min-w-40",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
