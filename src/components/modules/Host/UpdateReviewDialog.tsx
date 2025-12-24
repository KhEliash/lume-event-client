 
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { Edit, Star } from "lucide-react";
import { updateReviewAction } from "@/services/review/review-actions";
import { toast } from "sonner";

const formSchema = z.object({
  rating: z.number().min(1, "Min rating is 1").max(5, "Max rating is 5"),
  comment: z.string().min(2, "Comment too short").max(300, "Comment too long"),
});

export function UpdateReviewDialog({
  reviewId,
  defaultValues,
}: {
  reviewId: string;
  defaultValues: any;
}) {
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleSubmit = async (values: { rating: number; comment: string }) => {
    const result = await updateReviewAction(reviewId, values);

    if (result.success) {
      toast.success("TRANSMISSION UPDATED");
      setOpen(false);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 rounded-none border-2 border-emerald-950 text-emerald-950 font-black uppercase tracking-widest hover:bg-emerald-950 hover:text-amber-400 transition-colors cursor-pointer"
        >
          <Edit size={14} /> Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md rounded-none border-4 border-emerald-950 bg-white p-8">
        <DialogHeader>
          <DialogTitle className="text-3xl font-black uppercase tracking-tighter text-emerald-950 border-b-2 border-emerald-950 pb-2">
            Edit Feedback
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6 mt-4"
          >
            {/* Rating */}
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-black uppercase tracking-widest text-[10px] text-emerald-950/50">
                    Intensity Rating (1–5)
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="number"
                        className="rounded-none border-2 border-emerald-950 focus-visible:ring-amber-400 font-bold"
                        {...field}
                        onChange={(e) => field.onChange(+e.target.value)}
                      />
                      <Star
                        className="absolute right-3 top-2.5 text-amber-500"
                        size={18}
                        fill="currentColor"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-[10px] uppercase font-bold" />
                </FormItem>
              )}
            />

            {/* Comment */}
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-black uppercase tracking-widest text-[10px] text-emerald-950/50">
                    Your Debrief
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      className="rounded-none border-2 border-emerald-950 focus-visible:ring-amber-400 font-medium italic"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[10px] uppercase font-bold" />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2 md:gap-4">
              <Button
                type="button"
                variant="outline"
                className="rounded-none border-2 border-emerald-950 font-black uppercase tracking-widest text-xs"
                onClick={() => setOpen(false)}
              >
                Abondon
              </Button>
              <Button
                type="submit"
                className="rounded-none bg-emerald-950 text-amber-400 border-2 border-emerald-950 font-black uppercase tracking-widest text-xs hover:bg-amber-400 hover:text-emerald-950 transition-all shadow-[4px_4px_0px_0px_rgba(6,78,59,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
