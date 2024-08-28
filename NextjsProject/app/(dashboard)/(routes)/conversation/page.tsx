"use client";

import * as z from "zod";
import { useState, useEffect } from "react";
import axios from "axios";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Heading } from "@/components/heading";
import { MessagesSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@clerk/nextjs";

import { formSchema } from "./constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Comment {
  name: string;
  surname: string;
  prompt: string;
  timestamp: string;
}

const ConversationPage = () => {
  const { user } = useUser();
  const [comments, setComments] = useState<Comment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 10;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/comments");
        const sortedComments = response.data.sort((a: Comment, b: Comment) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        setComments(sortedComments);
      } catch (error) {
        console.error("Yorumlar getirilirken hata oluştu:", error);
      }
    };

    fetchComments();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const newComment = {
      name: user?.firstName || "Anonymous",
      surname: user?.lastName || "User",
      prompt: values.prompt,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await axios.post("http://localhost:5000/api/comments", newComment);
      setComments([response.data, ...comments].sort((a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      ));
    } catch (error) {
      console.error("Yorum gönderilirken hata oluştu:", error);
    }

    form.reset();
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * commentsPerPage;
  const currentComments = comments.slice(startIndex, startIndex + commentsPerPage);
  const totalPages = Math.ceil(comments.length / commentsPerPage);

  return (
    <div>
      <Heading
        title="Conversation"
        description="Our most advanced conversation model."
        icon={MessagesSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
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
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Yorumunuzu yazın..."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="col-span-12 w-full" disabled={isLoading}>
                Gönder
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4 comments-container">
          {currentComments.map((comment, index) => {
            const formattedDate = new Date(comment.timestamp);
            const displayDate = !isNaN(formattedDate.getTime()) 
              ? formattedDate.toLocaleString('tr-TR')
              : "Tarih bulunamadı";

            return (
              <div key={index} className="border p-4 rounded-lg">
                <div className="font-bold">
                  {comment.name} {comment.surname}
                </div>
                <div className="mt-2">
                  {comment.prompt}
                </div>
                <div className="text-gray-500 text-sm mt-2">
                  {displayDate}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center space-x-2 mt-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <Button
              key={page}
              onClick={() => handlePageChange(page)}
              disabled={currentPage === page}
            >
              {page}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
