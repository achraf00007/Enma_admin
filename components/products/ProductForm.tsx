"use client";

import { z } from "zod";
import { Separator } from "../ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Textarea } from "../ui/textarea";
import ImageUpload from "../custom ui/ImageUpload";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Delete from "../custom ui/Delete";
import { ChevronRight, X } from "lucide-react";
import Loader from "../custom ui/Loader";
import MultiText from "../custom ui/MultiText";
import MultiSelect from "../custom ui/MultiSelect";

const formSchema = z.object({
  title: z.string().min(2).max(20),
  description: z.string().min(2).max(500).trim(),
  media: z.array(z.string()),
  category: z.string(),
  collections: z.array(z.string()),
  tags: z.array(z.string()),
  sizes: z.array(z.string()),
  colors: z.array(z.string()),
  price: z.coerce.number().min(1),
  cost: z.coerce.number().min(1),
});

interface ProductFormProps {
  initialData?: ProductType | null;
}

export default function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [collections, setCollections] = useState<CollectionType[]>([]);

  const getCollections = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/collections", { method: "GET" });
      const data = await response.json();
      setCollections(data);
      setLoading(false);
    } catch (error) {
      console.log("[Collections_GET]", error);
      toast.error("Something went wrong! Please try again");
    }
  };

  useEffect(() => {
    getCollections();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: //initialData
    //   ? initialData :
       {
          title: "",
          description: "",
          media: [],
          category: "",
          collections: [],
          tags: [],
          sizes: [],
          colors: [],
          price: 1,
          cost: 1,
        },
  });

  const handleKeyPress = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // console.log(values);
    try {
      setLoading(true);
      const url = initialData
        ? `/api/products/${initialData._id}`
        : "/api/products";
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setLoading(false);
        toast.success(`Product ${initialData ? "updated" : "created"}`);
        window.location.href = "/products";
        router.push("/products");
      }
    } catch (err) {
      console.log("[Product_POST]", err);
      toast.error("Something went wrong! Please try again");
    }
  };

  return (
    <div className="p-10">
      {loading ? (
        <Loader />
      ) : (
        <>
          {initialData ? (
            <div className="flex items-center justify-between">
              <p className="text-heading2-bold text-primary-700">
                Edit Product
              </p>
              <Delete item="product" id={initialData._id} />
            </div>
          ) : (
            <p className="text-heading2-bold text-primary-700">
              Create Product
            </p>
          )}
          <Separator className="bg-primary-300 mt-4 mb-7" />

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Title"
                        {...field}
                        onKeyDown={handleKeyPress}
                      />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Description"
                        {...field}
                        rows={5}
                        onKeyDown={handleKeyPress}
                      />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="media"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value}
                        onChange={(url) =>
                          field.onChange([...field.value, url])
                        }
                        onRemove={(url) =>
                          field.onChange([
                            ...field.value.filter((image) => image !== url),
                          ])
                        }
                      />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />

              <div className="md:grid md:grid-cols-3 md:gap-10">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price ($)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Price"
                          {...field}
                          onKeyDown={handleKeyPress}
                        />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cost"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cost ($)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Cost"
                          {...field}
                          onKeyDown={handleKeyPress}
                        />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Category"
                          {...field}
                          onKeyDown={handleKeyPress}
                        />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <MultiText
                          placeholder="Tags"
                          value={field.value}
                          onChange={(tag) =>
                            field.onChange([...field.value, tag])
                          }
                          onRemove={(tagToRemove) =>
                            field.onChange([
                              ...field.value.filter(
                                (tag) => tag !== tagToRemove,
                              ),
                            ])
                          }
                        />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />

                

                <FormField
                  control={form.control}
                  name="colors"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Colors</FormLabel>
                      <FormControl>
                        <MultiText
                          placeholder="Colors"
                          value={field.value}
                          onChange={(color) =>
                            field.onChange([...field.value, color])
                          }
                          onRemove={(colorToRemove) =>
                            field.onChange([
                              ...field.value.filter(
                                (color) => color !== colorToRemove,
                              ),
                            ])
                          }
                        />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sizes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sizes</FormLabel>
                      <FormControl>
                        <MultiText
                          placeholder="Sizes"
                          value={field.value}
                          onChange={(size) =>
                            field.onChange([...field.value, size])
                          }
                          onRemove={(sizeToRemove) =>
                            field.onChange([
                              ...field.value.filter(
                                (size) => size !== sizeToRemove,
                              ),
                            ])
                          }
                        />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />

<FormField
                  control={form.control}
                  name="collections"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Collections</FormLabel>
                      <FormControl>
                        <MultiSelect
                          placeholder="Collections"
                          collections={collections}
                          value={field.value}
                          onChange={(_id) =>
                            field.onChange([...field.value, _id])
                          }
                          onRemove={(idToRemove) =>
                            field.onChange([
                              ...field.value.filter(
                                (collectionId) => collectionId !== idToRemove,
                              ),
                            ])
                          }
                        />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />

              </div>

              <Separator className="bg-primary-300 !my-16" />

              <div className="flex justify-end gap-16">
                <Button
                  type="button"
                  onClick={() => router.push("/products")}
                  variant="outline"
                  className=""
                >
                  <X className="text-red-700" />
                  Discard
                </Button>
                <Button
                  type="submit"
                  className="bg-primary-700 text-white flex items-center"
                >
                  {initialData ? "Update" : "Create"}
                  <ChevronRight />
                </Button>
              </div>
            </form>
          </Form>
        </>
      )}
    </div>
  );
}
