/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { DatePicker } from "@/components/ui/date-picker";
import { EventFormValues, EventType } from "@/types/event-schema";
import { useFormState } from "react-dom";
import { createEventAction } from "@/services/host/event-actions";
import { startTransition, useEffect } from "react";
import { toast } from "sonner";
import { MapPin, Calendar, Users, DollarSign, Upload } from "lucide-react";

const eventTypes = Object.values(EventType);

const initialState = {
  success: false,
  message: "",
};

export function CreateEventForm() {
  const [state, formAction, pending] = useFormState(
    createEventAction,
    initialState
  );

  const form = useForm<EventFormValues>({
    defaultValues: {
      name: "",
      type: EventType.OTHER,
      description: "",
      time: "19:00",
      address: "",
      city: "",
      minParticipants: 1,
      maxParticipants: 10,
      joiningFee: 0,
      image: undefined,
    },
  });

  const handleRHFSubmit = form.handleSubmit((values) => {
    const formData = new FormData();

    for (const key in values) {
      if (Object.prototype.hasOwnProperty.call(values, key)) {
        const value = values[key as keyof EventFormValues];
        if (key === "date" && value instanceof Date) {
          formData.append(key, value.toISOString().substring(0, 10));
        } else if (key === "image" && value instanceof File) {
          formData.append(key, value);
        } else if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      }
    }

    startTransition(() => {
      formAction(formData);
    });
  });

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        form.reset();
        toast.success(state.message || "Created successfully");
      } else {
        toast.error(state.message || "Something went wrong");
      }
    }
  }, [state, form]);

  // Design Tokens
  const boxStyle =
    "border-2 border-emerald-950 rounded-none shadow-[4px_4px_0px_0px_rgba(6,78,59,1)]";
  const inputStyle =
    "rounded-none border-2 border-emerald-950 focus-visible:ring-0 focus-visible:border-amber-500 font-medium placeholder:text-emerald-900/30";
  const labelStyle =
    "text-xs font-black uppercase tracking-widest text-emerald-950 mb-2 block";

  return (
    <Form {...form}>
      <form
        onSubmit={handleRHFSubmit}
        className=" space-y-10 p-4 md:p-8  bg-white border-4 border-emerald-950 shadow-[12px_12px_0px_0px_rgba(251,191,36,1)]"
      >
        <header className="border-b-4 border-emerald-950 pb-6 mb-8">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-emerald-950 italic">
            Create <span className="text-amber-500">New Event</span>
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Column: Core Details */}
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelStyle}>
                    Event Designation
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="TECH MIXER 2025"
                      {...field}
                      className={inputStyle}
                      required
                    />
                  </FormControl>
                  <FormMessage className="text-[10px] font-bold uppercase italic" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelStyle}>Classification</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className={inputStyle}>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="rounded-none border-2 border-emerald-950">
                      {eventTypes.map((type) => (
                        <SelectItem
                          key={type}
                          value={type}
                          className="uppercase font-bold text-xs focus:bg-amber-100"
                        >
                          {type.replace(/_/g, " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelStyle}>
                    Mission Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="DETAILED EVENT INTEL..."
                      className={`${inputStyle} min-h-[140px] resize-none`}
                      {...field}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Right Column: Logistics */}
          <div className="space-y-6">
            {/* Schedule Section */}
            <div className={`p-4 bg-emerald-50 ${boxStyle}`}>
              <div className="flex items-center gap-2 mb-4 border-b-2 border-emerald-950 pb-2">
                <Calendar className="w-4 h-4 text-emerald-950" />
                <span className="text-xs font-black uppercase tracking-widest">
                  Schedule
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-[10px] font-bold uppercase opacity-60">
                        Date
                      </FormLabel>
                      <DatePicker field={field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-bold uppercase opacity-60">
                        Time
                      </FormLabel>
                      <FormControl>
                        <Input type="time" {...field} className={inputStyle} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Location Section */}
            <div className={`p-4 bg-amber-50 ${boxStyle}`}>
              <div className="flex items-center gap-2 mb-4 border-b-2 border-emerald-950 pb-2">
                <MapPin className="w-4 h-4 text-emerald-950" />
                <span className="text-xs font-black uppercase tracking-widest">
                  Coordinates
                </span>
              </div>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="STREET ADDRESS"
                          {...field}
                          className={inputStyle}
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="CITY"
                          {...field}
                          className={inputStyle}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Metrics & Assets */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end pt-6 border-t-4 border-emerald-950">
          <FormField
            control={form.control}
            name="minParticipants"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelStyle}>Min Pax</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    className={inputStyle}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxParticipants"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelStyle}>Max Pax</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    className={inputStyle}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="joiningFee"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelStyle}>Entry Fee ($)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    {...field}
                    className={inputStyle}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem className="relative">
                <FormLabel className={labelStyle}>Visual Identity</FormLabel>
                <FormControl>
                  <div className="relative group">
                    <Input
                      {...fieldProps}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="file-upload"
                      onChange={(e) =>
                        onChange(e.target.files && e.target.files[0])
                      }
                    />
                    <label
                      htmlFor="file-upload"
                      className={`flex items-center justify-center h-10 w-full cursor-pointer bg-emerald-950 text-white hover:bg-amber-500 transition-colors uppercase font-black text-[10px] tracking-tighter ${boxStyle}`}
                    >
                      <Upload className="w-3 h-3 mr-2" />
                      {form.watch("image") ? "Change File" : "Upload File"}
                    </label>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full h-16 bg-emerald-950 hover:bg-amber-500 text-white hover:text-emerald-950 rounded-none border-b-8 border-r-8 border-emerald-700 active:border-0 active:translate-y-1 transition-all text-xl font-black uppercase tracking-[0.2em]"
        >
          {pending ? "Transmitting..." : "Initialize Event"}
        </Button>
      </form>
    </Form>
  );
}
