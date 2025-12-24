/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { startTransition, useEffect, useState } from "react";
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
import { updateEventAction } from "@/services/host/event-actions";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import {
  Zap,
  MapPin,
  Users,
  DollarSign,
  Image as ImageIcon,
  Save,
} from "lucide-react";

const eventTypes = Object.values(EventType);

const initialState = {
  success: false,
  message: "",
};

// Brutalist UI Components
const inputClass =
  "border-2 border-emerald-950 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-amber-500 bg-white font-bold placeholder:text-emerald-900/30";
const labelClass =
  "text-[10px] font-black uppercase tracking-widest text-emerald-950 italic";

interface UpdateEventFormProps {
  event: any;
}

export function UpdateEventForm({ event }: UpdateEventFormProps) {
  const [imagePreview, setImagePreview] = useState<string>(
    event?.eventImage || ""
  );

  const [state, formAction, pending] = useFormState(
    (state: any, formData: FormData) =>
      updateEventAction(state, event?._id, formData),
    initialState
  );

  const form = useForm({
    defaultValues: {
      name: event.name || "",
      type: event?.type || EventType.OTHER,
      description: event?.description || "",
      date: event?.date ? new Date(event?.date) : undefined,
      time: event?.time || "19:00",
      status: event?.status || "",
      address: event?.location?.address || "",
      city: event?.location?.city || "",
      minParticipants: event?.minParticipants || 1,
      maxParticipants: event?.maxParticipants || 10,
      joiningFee: event?.joiningFee || 0,
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
        toast.success(state.message || "Event updated successfully");
        redirect("/host/dashboard/hosted-events");
      } else {
        toast.error(state.message || "Something went wrong");
      }
    }
  }, [state]);

  return (
    <Form {...form}>
      <form
        onSubmit={handleRHFSubmit}
        className="bg-white border-4 border-emerald-950 shadow-[12px_12px_0px_0px_rgba(6,78,59,1)] p-8 space-y-10"
      >
        <div className="border-b-4 border-emerald-950 pb-4 mb-8 flex items-center justify-between">
          <h2 className="text-4xl font-black uppercase italic tracking-tighter text-emerald-950">
            Edit <span className="text-amber-500">Manifest</span>
          </h2>
          <Zap className="text-amber-500 fill-amber-500" size={32} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Core Info */}
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClass}>
                    Event Designation
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={inputClass}
                      placeholder="Mission Name"
                      {...field}
                      required
                    />
                  </FormControl>
                  <FormMessage className="text-[10px] font-black uppercase" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClass}>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className={inputClass}>
                          <SelectValue placeholder="Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-none border-2 border-emerald-950">
                        {eventTypes.map((type) => (
                          <SelectItem
                            key={type}
                            value={type}
                            className="font-bold uppercase text-xs"
                          >
                            {type.replace(/_/g, " ")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClass}>
                      Operational Status
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className={inputClass}>
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-none border-2 border-emerald-950">
                        <SelectItem
                          value="open"
                          className="font-bold uppercase text-xs"
                        >
                          Open
                        </SelectItem>
                        <SelectItem
                          value="cancelled"
                          className="font-bold uppercase text-xs"
                        >
                          Cancelled
                        </SelectItem>
                        <SelectItem
                          value="completed"
                          className="font-bold uppercase text-xs"
                        >
                          Completed
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClass}>Mission Briefing</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className={`${inputClass} min-h-[150px] resize-none`}
                      placeholder="Detailed intelligence..."
                      required
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Right Column: Logistics & Visuals */}
          <div className="space-y-6">
            <div className="bg-emerald-50 border-2 border-emerald-950 p-6 space-y-6">
              <div className="flex items-center gap-2 mb-2 border-b-2 border-emerald-950 pb-2">
                <MapPin size={18} className="text-emerald-950" />
                <h3 className="font-black uppercase text-xs">Location Data</h3>
              </div>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClass}>Sector Address</FormLabel>
                    <FormControl>
                      <Input className={inputClass} {...field} required />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClass}>City</FormLabel>
                    <FormControl>
                      <Input className={inputClass} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className={labelClass}>Target Date</FormLabel>
                    <DatePicker field={field} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClass}>Time</FormLabel>
                    <FormControl>
                      <Input type="time" className={inputClass} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        {/* Bottom Section: Numbers and Image */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6 border-t-4 border-emerald-950">
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Users size={18} className="text-amber-500" />
              <h3 className="font-black uppercase text-xs">Personnel</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="minParticipants"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClass}>MIN</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className={inputClass}
                        {...field}
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
                    <FormLabel className={labelClass}>MAX</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className={inputClass}
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="joiningFee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClass}>
                    Access Credit ($)
                  </FormLabel>
                  <div className="relative">
                    <DollarSign
                      size={14}
                      className="absolute left-3 top-3 text-emerald-950"
                    />
                    <FormControl>
                      <Input
                        type="number"
                        className={`${inputClass} pl-8`}
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <ImageIcon size={18} className="text-amber-500" />
              <h3 className="font-black uppercase text-xs">Visual Asset</h3>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/2">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative group">
                          <Input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            id="image-upload"
                            {...fieldProps}
                            onChange={(e) => {
                              const file = e.target.files && e.target.files[0];
                              if (file) {
                                onChange(file);
                                const reader = new FileReader();
                                reader.onloadend = () =>
                                  setImagePreview(reader.result as string);
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                          <label
                            htmlFor="image-upload"
                            className="flex flex-col items-center justify-center border-4 border-dashed border-emerald-950 p-8 cursor-pointer hover:bg-amber-50 transition-colors"
                          >
                            <ImageIcon className="text-emerald-950 mb-2" />
                            <span className="text-[10px] font-black uppercase">
                              Replace Asset
                            </span>
                          </label>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              {imagePreview && (
                <div className="w-full md:w-1/2 border-4 border-emerald-950 shadow-[4px_4px_0px_0px_rgba(251,191,36,1)]">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-32 w-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full h-16 rounded-none bg-emerald-950 hover:bg-amber-500 text-white hover:text-emerald-950 border-4 border-emerald-950 font-black uppercase italic text-xl tracking-tighter shadow-[8px_8px_0px_0px_rgba(251,191,36,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex gap-3"
        >
          {pending ? (
            "SYNCING DATA..."
          ) : (
            <>
              <Save size={24} /> Update
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
