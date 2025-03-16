"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Problem } from "@/zod-schema/problems";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState, KeyboardEvent } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import dynamic from "next/dynamic";

const CodeEditor = dynamic(
  () =>
    import("@/components/globals/personal-editor").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="h-64 w-full bg-background rounded animate-pulse" />
    ),
  },
);

const SubmitProblem = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [editorContent, setEditorContent] = useState(
    "function solution(input) {\n  // Your code here\n  \n  return output;\n}",
  );

  const form = useForm<Problem>({
    resolver: zodResolver(Problem),
    defaultValues: {
      title: "",
      description: "",
      difficulty: "medium",
      tags: [],
      template:
        "function solution(input) {\n  // Your code here\n  \n  return output;\n} \n solution(input);",
      tests: [{ input: "", output: "" }],
    },
  });

  const tags = form.watch("tags") || [];

  const handleEditorChange = (code: string) => {
    setEditorContent(code);
    form.setValue("template", code);
  };

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();

      const newTag = tagInput.trim();
      const normalizedNewTag = newTag.toLowerCase();

      if (!tags.some((tag) => tag.toLowerCase() === normalizedNewTag)) {
        form.setValue("tags", [...tags, newTag]);
      }
      setTagInput("");
    }
  };

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    const newTag = tagInput.trim();
    const normalizedNewTag = newTag.toLowerCase();

    if (!tags.some((tag) => tag.toLowerCase() === normalizedNewTag)) {
      form.setValue("tags", [...tags, newTag]);
    }
    setTagInput("");
  };

  const removeTag = (indexToRemove: number) => {
    form.setValue(
      "tags",
      tags.filter((_, index) => index !== indexToRemove),
    );
  };

  const onSubmit = async (data: Problem) => {
    setIsSubmitting(true);
    try {
      const finalData = {
        ...data,
        template: editorContent,
      };

      await axios.post("/api/problems", finalData);
      alert("Problem submitted successfully!");
      form.reset();
      setEditorContent(
        "function solution(input) {\n  // Your code here\n  \n  return output;\n} \n solution(input);",
      );
    } catch (error: unknown) {
      console.error(error);
      alert("An error occurred while submitting the problem.");
    }
    setIsSubmitting(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4">
        <h1 className="text-2xl font-bold">Submit a Problem</h1>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Problem Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Two Sum, Valid Parentheses, etc."
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Problem Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Describe the problem here"
                  className="h-32 resize-none"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="difficulty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Difficulty</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={() => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-md text-sm"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(index)}
                      className="text-muted-foreground hover:text-destructive focus:outline-none"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <FormControl>
                  <Input
                    placeholder="Add tags (e.g., Array, String, etc.)"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                  />
                </FormControl>
                <Button type="button" variant="outline" onClick={handleAddTag}>
                  Add
                </Button>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="template"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code Template</FormLabel>
              <FormControl>
                <div className="h-64 border rounded overflow-hidden">
                  <CodeEditor
                    initialValue={field.value}
                    language="javascript"
                    onCodeChange={handleEditorChange}
                  />
                </div>
              </FormControl>
              <p className="text-sm text-muted-foreground mt-1">
                Provide the starter code for the problem that users will see
              </p>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Test Cases</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  {field.value.map((test, index) => (
                    <div key={index} className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="Input"
                        {...form.register(`tests.${index}.input` as const)}
                      />
                      <Input
                        placeholder="Output"
                        {...form.register(`tests.${index}.output` as const)}
                      />
                    </div>
                  ))}
                </div>
              </FormControl>
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  form.setValue("tests", [
                    ...field.value,
                    { input: "", output: "" },
                  ])
                }
              >
                Add Test Case
              </Button>
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            className="mr-2"
          >
            Reset
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            variant="default"
            className="mt-6"
          >
            {isSubmitting ? "Submitting..." : "Submit Problem"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SubmitProblem;
