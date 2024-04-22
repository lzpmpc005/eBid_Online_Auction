"use client";

import * as z from "zod";
import axios from "@/utils/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { auctionType } from "@/utils/types";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Combobox } from "@/components/ui/combobox";

interface CategoryFormProps {
  initialData: {
    categoryId: string;
  };
  auctionId: string;
  options: { label: string; value: string }[];
  onAuctionUpdate: (auction: auctionType) => void;
}

const formSchema = z.object({
  categoryId: z.string().min(1),
});

export const CategoryForm = ({
  initialData,
  auctionId,
  options,
  onAuctionUpdate,
}: CategoryFormProps) => {
  const [categoryId, setCategoryId] = useState(initialData.categoryId);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: initialData?.categoryId || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userId = localStorage.getItem("userId");
      const res = await axios.patch(`/auctions/${auctionId}`, {
        ...values,
        userId,
      });
      setCategoryId(res.data.categoryId);
      onAuctionUpdate(res.data);
      toast.success("auction updated");
      toggleEdit();
    } catch (error) {
      if (error instanceof Error) {
        const axiosError = error as any;
        if (axiosError.response) {
          toast.error(axiosError.response.data.error);
        } else if (axiosError.request) {
          toast.error("No response from server");
        } else {
          toast.error("Error setting up request");
        }
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  const selectedOption = options.find((option) => option.value === categoryId);

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        auction category
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Choose category
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn("text-sm mt-2", !categoryId && "text-slate-500 italic")}
        >
          {selectedOption?.label || "Category unspecified"}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => {
                const { ref, ...restField } = field;
                return (
                  <FormItem>
                    <FormControl>
                      <Combobox options={options} {...restField} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
