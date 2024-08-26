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

const PAGE_SIZE = 10;

const ConversationPage = () => {
  const { user } = useUser();
  const [comments, setComments] = useState<Comment[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/comments");
        // Sort comments by timestamp in descending order
        const sortedComments = response.data.sort((a: Comment, b: Comment) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        setComments(sortedComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
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
      timestamp: new Date().toISOString(), // Ensure this is in ISO 8601 format
    };

    try {
      const response = await axios.post("http://localhost:5000/api/comments", newComment);
      // Update comments with the new comment at the top
      setComments([response.data, ...comments].sort((a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      ));
      setCurrentPage(1); // Reset to the first page after adding a comment
    } catch (error) {
      console.error("Error submitting comment:", error);
    }

    form.reset();
  };

  // Pagination logic
  const totalComments = comments.length;
  const totalPages = Math.ceil(totalComments / PAGE_SIZE);
  const displayedComments = comments.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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
                        placeholder="Write your comments..."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="col-span-12 w-full" disabled={isLoading}>
                Send
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4 comments-container">
          {displayedComments.map((comment, index) => {
            const formattedDate = new Date(comment.timestamp);
            const displayDate = !isNaN(formattedDate.getTime()) 
              ? formattedDate.toLocaleString() 
              : `Invalid Date: ${comment.timestamp}`;
            
            return (
              <div key={index} className="border p-4 rounded-lg">
                <div className="font-bold">
                  {comment.name} {comment.surname}
                </div>
                <div>
                  {comment.prompt}
                </div>
                <div className="text-gray-500 text-sm mt-2">
                  {displayDate}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-200 px-4 py-2 rounded"
          >
            Previous
          </button>
          <span className="self-center">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-200 px-4 py-2 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
