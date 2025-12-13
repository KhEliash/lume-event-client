/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
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

const eventTypes = Object.values(EventType);

const initialState = {
  success: false,
  message: "",
};

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
    console.log(formData.get("status"));
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
        className="space-y-8 p-6 border rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold">Update Event</h2>

        {/* Event Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Name</FormLabel>
              <FormControl>
                <Input placeholder="Event Name" {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Event Type */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="w-full cursor-pointer">
                  <SelectTrigger>
                    <SelectValue placeholder="Select an event type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {eventTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() +
                        type.slice(1).toLowerCase().replace(/_/g, " ")}
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
          name="status"
          defaultValue="open"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="w-full">
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Event Description" required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Date & Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
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
                <FormLabel>Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Location */}
        <fieldset className="border p-4 rounded-md space-y-4">
          <legend className="text-lg font-semibold px-2">Location</legend>
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input {...field} required />
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
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>

        {/* Participants & Fee */}
        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="minParticipants"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Min Participants</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxParticipants"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Participants</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="joiningFee"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Joining Fee ($)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step={0.01}
                    min={0}
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Event Image */}
        <FormField
          control={form.control}
          name="image"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Event Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
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
              </FormControl>
              {imagePreview && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imagePreview}
                  alt="Event Preview"
                  className="mt-2 h-48 w-full object-cover rounded-md"
                />
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {pending ? "Updating..." : "Update Event"}
        </Button>
      </form>
    </Form>
  );
}
