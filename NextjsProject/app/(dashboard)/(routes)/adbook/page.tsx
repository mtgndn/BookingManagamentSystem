"use client";

import * as z from "zod";
import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Heading } from "@/components/heading";
import { BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from '@clerk/clerk-react';

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  publishedYear: z.string()
    .length(4, "Published year must be exactly 4 digits")
    .regex(/^\d+$/, "Published year must be numeric"),
  description: z.string().optional(),
  userId: z.string().optional()
});

interface Book {
  title: string;
  author: string;
  publishedYear: string;
  description?: string;
  userId: string;
}

const BookFormPage = () => {
  const { user } = useUser(); // Kullanıcı bilgilerini al
  const userId = user?.id; // userId'yi al

  const [notificationVisible, setNotificationVisible] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      publishedYear: "",
      description: "",
      userId: ""
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const newBook: Omit<Book, 'timestamp'> = {
      title: values.title,
      author: values.author,
      publishedYear: values.publishedYear,
      description: values.description,
      userId: userId || ""
    };

    try {
      const response = await axios.post("http://localhost:5000/api/books", newBook);
      if (response.status === 201) {
        setNotificationVisible(true);
        form.reset();
        setRedirectUrl("/booklist"); // Set redirect URL but don't redirect yet
      }
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  const handleRedirect = () => {
    if (redirectUrl) {
      router.push(redirectUrl);
    }
  };

  return (
    <div>
      <Heading
        title="Add a Book"
        description="Add and list new books."
        icon={BookOpen}
        iconColor="text-green-500"
        bgColor="bg-green-500/10"
      />
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="
              rounded-lg
              border
              w-full
              p-4
              px-3
              md:px-6
              focus-within:shadow-sm
              grid
              grid-cols-12
              gap-2
            "
          >
            <FormField
              name="title"
              render={({ field }) => (
                <FormItem className="col-span-12">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="Book Title"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="author"
              render={({ field }) => (
                <FormItem className="col-span-12">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="Author"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="publishedYear"
              render={({ field }) => (
                <FormItem className="col-span-12">
                  <FormControl className="m-0 p-0">
                    <Input
                      type="text"
                      value={field.value}
                      onChange={e => {
                        if (/^\d{0,4}$/.test(e.target.value)) {
                          form.setValue("publishedYear", e.target.value);
                        }
                      }}
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="Published Year (4 digits)"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="description"
              render={({ field }) => (
                <FormItem className="col-span-12">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="Description (Optional)"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="col-span-12 w-full" disabled={isLoading}>
              Add Book
            </Button>
          </form>
        </Form>
        {notificationVisible && (
          <div className="mt-4 p-4 border rounded-lg bg-green-100 text-green-800">
            Book successfully added! You can view it in the 
            <button 
              onClick={handleRedirect}
              className="text-blue-600 underline ml-1"
            >
              Book List
            </button> page.
          </div>
        )}
      </div>
    </div>
  );
};

export default BookFormPage;
