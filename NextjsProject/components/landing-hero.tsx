"use client";

import { useAuth } from "@clerk/nextjs"
import  Link  from "next/link"
import TypewriterComponent from "typewriter-effect";
import { Button } from "@/components/ui/button";

export const LandingHero = () => {
	const { isSignedIn } = useAuth();


	return (
		<div className="text-white font-bold py-36 text-center space-y-5">
			<div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
				<h1> The Best Book Management Page </h1>
				<div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
					<TypewriterComponent
						options={{
							strings:[
								"Chat.",
								"Ad Book.",
								"List Book.",
								"Social Book.",
							],
							autoStart: true,
							loop: true
						}}
					/>
				</div>
			</div>
			<div className="text-sm md:text-xl font-light text-zinc-400">
				The most beautiful social book network...	
			</div>
			<div>
				<Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
						<Button variant="default" className="md:text-lg p-4 md:p-6 rounded-full font-semibold bg-white text-zinc-900">
							Start for free...
						</Button>
				</Link>
			</div>
			<div className="text-zinc-400 text-xs md:text-sm font-normal">
						No credit card required.
			</div>
		</div>
	)
}