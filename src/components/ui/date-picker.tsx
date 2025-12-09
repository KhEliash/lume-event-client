import { ControllerRenderProps, FieldValues, FieldPath } from "react-hook-form"; // 👈 Add FieldValues and FieldPath

import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns/format";

interface DatePickerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends React.ComponentPropsWithoutRef<typeof Button> {
  field: ControllerRenderProps<TFieldValues, TName>;

  placeholder?: string;
}

export function DatePicker<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  field,
  placeholder = "Pick a date",
  className,
  ...props
}: DatePickerProps<TFieldValues, TName>) {
  const dateValue = field.value as Date | undefined;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !dateValue && "text-muted-foreground",
            className
          )}
          {...props}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dateValue ? format(dateValue, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={dateValue}
          onSelect={field.onChange as (date: Date | undefined) => void}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  );
}
