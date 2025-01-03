"use client";

import { Trash } from "lucide-react";
import { Button } from "../ui/button";

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
import toast from "react-hot-toast";

interface DeleteProps {
    id: string;
}

export default function Delete({ id }:DeleteProps) {
    const onDelete = async () => {
        try {
            const response = await fetch(`/api/collections/${id}`, {
                method: "DELETE",
            });

            if(response.ok) {
                window.location.reload();
                toast.success("Collection deleted successfully");
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong! Please try again");
        }
    };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="bg-red-700 text-white">
          <Trash className="h4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-700">Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            collection.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-700 text-white-1" onClick={onDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
