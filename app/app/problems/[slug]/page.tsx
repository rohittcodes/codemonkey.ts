import { DualEditor } from "@/components/globals/dual-editor";
import { auth } from "@/lib/auth";

type Props = {
  params: {
    slug: string;
  };
};

const ProblemPage = async ({ params }: Props) => {
  const session = await auth();
  const userId = session?.user?.id || "anonymous";

  const { slug } = await params;

  const initialCode = `function solution(input: any): any {
  // Your solution here
  
  return null;
}`;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="problem-description p-4 border rounded-lg">
          <h1 className="text-2xl font-bold mb-4">Problem: {slug}</h1>
          <p className="text-gray-700">
            This is where your problem description would go.
          </p>
          {/* TODO: Add problem description here */}
        </div>

        <div className="h-[600px]">
          <DualEditor
            problemId={slug}
            userId={userId}
            initialCode={initialCode}
            language="typescript"
          />
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;
