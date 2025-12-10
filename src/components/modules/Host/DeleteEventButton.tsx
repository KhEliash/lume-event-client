 "use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteEvent } from "@/services/host/event-actions";
 

interface DeleteEventButtonProps {
  eventId: string;
}

export function DeleteEventButton({ eventId }: DeleteEventButtonProps) {
  const [loading, setLoading] = useState(false);
  

  const handleDelete = async () => {
    setLoading(true);
    const response = await deleteEvent(eventId);
    setLoading(false);

    if (response.success) {
      toast.success(response.message || "Event deleted successfully");
       
    } else {
      toast.error(response.message || "Failed to delete event");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="flex-1 flex items-center justify-center text-sm px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium cursor-pointer" >
          <Trash2 className="w-4 h-4 mr-1" /> Delete
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Event</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this event? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex justify-end gap-2">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="cursor-pointer bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
