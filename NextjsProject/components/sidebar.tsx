"use client";


import { Book, Code, ImageIcon, LayoutDashboard, List, MessageSquare, Music, Settings, Users, VideoIcon } from "lucide-react";
import { Montserrat } from "next/font/google";

import { cn } from "@/lib/utils";
import Image from "next/image";

import Link from "next/link";
import { usePathname } from "next/navigation";

const montserrat = Montserrat({ 
	weight: "600",
	subsets: ["latin"]
});

const routes = [{
		label: "Dashboard",
		icon: LayoutDashboard,
		href: "/dashboard",
		color: "text-sky-500",
	},
	{
		label: "Converstation",
		icon: MessageSquare,
		href: "/converstation",
		color: "text-violet-500",
	},
	{
		label: "Add Book Page",
		icon: Book,
		href: "/adbook",
		color: "text-pink-700",
	},
	{
		label: "List Book Page",
		icon: List,
		href: "/listbook",
		color: "text-orange-700",
	},
	{
		label: "Social Book Page ",
		icon: Users,
		href: "/socialbook",
		color: "text-emrald-500",
	},
	{
		label: "Settings",
		icon: Settings,
		href: "/settings",
	},
];



const Sidebar = () => {
	const pathname = usePathname ();
	return ( 
		<div className="spac-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
			<div className="px-3 py-2 flex-1">
				<Link href="/dashboard" className="flex items-center pl-3 mb-14">
					<div className="relative w-10 h-10 mr-6">
						<Image
							fill
							alt="logo"
							src="/logo.png"
						/>
					</div>
					<h1 className={cn("text-2xl font-bold", montserrat.className)}>
						Book Management
					</h1>
				</Link>
				<div className="space-y-1">
					{routes.map((route) =>(
						<Link 
							href={route.href}
							key={route.href}
							className={cn("text-sm group flex p-3 w-full justify-start font-medium cursour-pointer hover:text-white hover:bg-white/10 rounded-lg transitation",
							pathname === route.href ? "text-white bg-white/10" : "text-zinc-400"
							 )}
						>
							<div className="flex items-center flex-1">
								<route.icon className={cn("h-5 w-5 mr-3", route.color)} />
								{route.label}
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	 );
}
 
export default Sidebar;
