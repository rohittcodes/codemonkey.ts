import { CardBody, CardWithPlus } from "@/components/ui/feature-card";
import { Code2, Bot, Map, BrainCircuit } from "lucide-react";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const featureList: FeatureProps[] = [
  {
    icon: <Code2 size={24} className="text-primary" />,
    title: "Collaborative Code Editor",
    description:
      "Write, edit, and collaborate on code in real-time. Store your work as snippets or full packages with seamless version control.",
  },
  {
    icon: <Bot size={24} className="text-primary" />,
    title: "CodeChimp AI Assistant",
    description:
      "Your intelligent coding companion that helps solve doubts, explains concepts, and provides real-time guidance as you code.",
  },
  {
    icon: <Map size={24} className="text-primary" />,
    title: "Roadmap Planner",
    description:
      "Get structured learning paths tailored for interview preparation and exam success. Track your progress and master key concepts.",
  },
  {
    icon: <BrainCircuit size={24} className="text-primary" />,
    title: "Quiz Bot",
    description:
      "Test your knowledge with AI-generated quizzes that adapt to your learning pace. Reinforce concepts through interactive challenges.",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Core Features
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        Your Complete Learning Ecosystem
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
        Discover our powerful suite of tools designed to accelerate your coding
        journey. From collaborative coding to AI-powered learning, we&apos;ve
        got you covered.
      </h3>

      <div className="grid sm:grid-cols-2 gap-8">
        {featureList.map(({ icon, title, description }) => (
          <CardWithPlus key={title}>
            <CardBody
              title={title}
              description={description}
              icon={icon}
              className="flex flex-col items-center text-center"
            />
          </CardWithPlus>
        ))}
      </div>
    </section>
  );
};
