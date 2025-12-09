import * as z from "zod";

// Use enums from your backend definition
export enum EventType {
  CONCERT = "concert",
  HIKE = "hike",
  DINNER = "dinner",
  SPORTS = "sports",
  GAMING = "gaming",
  TECH_MEETUP = "tech_meetup",
  ART = "art",
  OTHER = "other",
}

export const EventFormSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    type: z.nativeEnum(EventType),
    description: z
      .string()
      .min(10, { message: "Description must be detailed." }),

    // Date and Time
    date: z.date({ error: "A date is required." }),
    time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
      // Basic HH:MM regex
      message: "Invalid time format (e.g., 14:30).",
    }),

    // *** MODIFICATION: Changed locationAddress -> address and locationCity -> city ***
    address: z.string().min(5, { message: "Address is required." }),
    city: z.string().min(3, { message: "City is required." }),

    // Participants (validated as strings from input, then coerced to number)
    minParticipants: z.preprocess(
      (a) => parseInt(z.string().parse(a)),
      z
        .number()
        .int()
        .positive({ message: "Must be a positive whole number." })
        .min(1)
    ),
    maxParticipants: z.preprocess(
      (a) => parseInt(z.string().parse(a)),
      z.number().int().positive().min(1)
    ),

    // Joining Fee (handles empty string input)
    joiningFee: z.preprocess(
      (a) => (a === "" ? undefined : parseFloat(z.string().parse(a))),
      z
        .number()
        .optional()
        .default(0)
        .refine((val) => val === undefined || val >= 0, {
          message: "Fee must be zero or a positive number.",
        })
    ),

    // *** MODIFICATION: Changed eventImage -> image ***
    image: z.any().optional(), // File | undefined, validation handled via manual type check
  })
  .refine((data) => data.maxParticipants >= data.minParticipants, {
    message:
      "Max participants must be greater than or equal to min participants.",
    path: ["maxParticipants"],
  });

export type EventFormValues = z.infer<typeof EventFormSchema>;
