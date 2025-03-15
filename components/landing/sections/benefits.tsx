import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Rocket, Brain, Target } from "lucide-react";

interface BenefitsProps {
	icon: React.ReactNode;
	title: string;
	description: string;
}

const benefitList: BenefitsProps[] = [
	{
		icon: <Users size={32} className="mb-6 text-primary" />,
		title: "Learn Together",
		description:
			"Join a vibrant community of developers. Share knowledge, collaborate on projects, and grow together in real-time.",
	},
	{
		icon: <Brain size={32} className="mb-6 text-primary" />,
		title: "AI-Powered Growth",
		description:
			"Get personalized learning recommendations and instant help from our AI assistant. Never get stuck in your coding journey.",
	},
	{
		icon: <Target size={32} className="mb-6 text-primary" />,
		title: "Structured Learning",
		description:
			"Follow clear roadmaps designed for your goals, whether it&apos;s landing your dream job or mastering new technologies.",
	},
	{
		icon: <Rocket size={32} className="mb-6 text-primary" />,
		title: "Rapid Skill Building",
		description:
			"Accelerate your learning through interactive quizzes, hands-on coding, and real-time feedback from our intelligent tools.",
	},
];

export const BenefitsSection = () => {
	return (
		<section id="benefits" className="container py-24 sm:py-32">
			<div className="grid lg:grid-cols-2 place-items-center lg:gap-24">
				<div>
					<h2 className="text-lg text-primary mb-2 tracking-wider">Why Choose Us</h2>

					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Supercharge Your Development Journey
					</h2>
					<p className="text-xl text-muted-foreground mb-8">
						Experience a smarter way to learn programming. Our platform combines
						collaborative learning, AI assistance, and structured guidance to help
						you achieve your coding goals faster.
					</p>
				</div>

				<div className="grid lg:grid-cols-2 gap-4 w-full">
					{benefitList.map(({ icon, title, description }, index) => (
						<Card
							key={title}
							className="bg-muted/50 dark:bg-card hover:bg-background transition-all delay-75 group/number"
						>
							<CardHeader>
								<div className="flex justify-between">
									{icon}
									<span className="text-5xl text-muted-foreground/15 font-medium transition-all delay-75 group-hover/number:text-muted-foreground/30">
										0{index + 1}
									</span>
								</div>

								<CardTitle>{title}</CardTitle>
							</CardHeader>

							<CardContent className="text-muted-foreground">
								{description}
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
};
