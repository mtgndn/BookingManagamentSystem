"use client";

const tools = [
  {
  label: "Conversation",
  icon: MessageSquare,
  color :"text-violet-500",
  bgColor:"bg-violet-500/50",
  href:"/conversation"
  },
  {
  label: "Ad Book Page",
  icon: Book,
  color :"text-violet-500",
  bgColor:"bg-violet-500/50",
  href:"/adbook"
  },
  {
  label: "List Book Page",
  icon: List,
  color :"text-violet-500",
  bgColor:"bg-violet-500/50",
  href:"/booklist"
  },
  {
    label: "Social Book Page",
    icon: Users,
    color :"text-violet-500",
    bgColor:"bg-violet-500/50",
    href:"/socialbook"
  },  
]

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, Book, Icon, List, MessageSquare, Users } from "lucide-react";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const router =useRouter();
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
        The best option to review and share books!
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
        Comment according to your experiences, share your ideas and gain new experiences...
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card
          onClick={() => router.push(tool.href) }
          key={tool.href}
          className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
          >
              <div className="flex items-center gap-x-4">
                  <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                      <tool.icon className={cn("w-8 h-8", tool.color)} />
                  </div>
                  <div className="font-semibold">
                    {tool.label}

                  </div>
              </div>
              <ArrowRight className="w-5 h-5"/>
          </Card>
        ))}
      </div>
    </div>
  )
   
}

export default DashboardPage;