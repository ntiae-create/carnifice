import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 font-display tracking-wide",
    "text-sm font-medium select-none whitespace-nowrap",
    "transition-[opacity,transform,background-color,border-color,color] duration-150 ease-out",
    "disabled:pointer-events-none disabled:opacity-40",
    "active:not-disabled:scale-[0.96]",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blood",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: "bg-blood text-fg hover:bg-blood-bright",
        secondary:
          "bg-elevated text-fg border border-border hover:border-border-blood hover:text-parchment",
        ghost: "bg-transparent text-muted hover:text-fg hover:bg-elevated",
        outline:
          "border border-border-blood bg-transparent text-parchment hover:bg-blood/25",
      },
      size: {
        default: "min-h-11 px-5 py-2.5",
        sm: "min-h-10 px-3 text-xs",
        lg: "min-h-12 px-6",
        icon: "size-11 p-0",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
