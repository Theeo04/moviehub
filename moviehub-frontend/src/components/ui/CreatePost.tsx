import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import type { Post } from "../../types/types";
import Avatar from "./Avatar";

interface CreatePostProps {
  onPostSubmit?: (post: Post) => void;
}

export default function CreatePost({ onPostSubmit }: CreatePostProps) {
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  const validate = () => {
    if (!content.trim()) {
      setError("Conținutul este obligatoriu.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (error) validate();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const newPost: Post = {
      content: content.trim(),
      date: new Date().toISOString(),
    };

    onPostSubmit?.(newPost);
    setContent("");
  };

  const borderClass = error ? "border-red-500" : "border-gray-300";

  return (
    <>
      <h1 className="text-3xl font-semibold mb-8">
        Share your thought about last movie!
      </h1>{" "}
      <form
        onSubmit={handleSubmit}
        className="w-full border rounded-xl p-4 bg-white shadow-md"
        noValidate
        aria-live="polite"
      >
        <div className="flex space-x-3 items-start">
          <Avatar name="Theo" size={50} />

          <textarea
            className={`flex-grow resize-none border ${borderClass} rounded-xl p-3 text-lg placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-200`}
            placeholder="What's happening?"
            value={content}
            onChange={handleChange}
            rows={3}
            aria-invalid={!!error}
            aria-describedby={error ? "content-error" : undefined}
            spellCheck={true}
          />
        </div>

        {error && (
          <p id="content-error" className="mt-1 text-red-600 font-semibold">
            {error}
          </p>
        )}

        <div className="flex items-center justify-between mt-2">
          <div className="flex space-x-10  text-blue-500 text-xl select-none pl-12">
            {[
              { label: "Add media", icon: "📷" },
              { label: "Add GIF", icon: "GIF" },
              { label: "Add poll", icon: "📊" },
              { label: "Add emoji", icon: "🙂" },
              { label: "Add location", icon: "📍" },
              { label: "Add more", icon: "➕" },
            ].map(({ label, icon }) => (
              <button
                key={label}
                type="button"
                aria-label={label}
                className="hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
              >
                {icon}
              </button>
            ))}
          </div>

          <button
            type="submit"
            disabled={!content.trim()}
            className="bg-blue-400 text-white rounded-full px-5 py-2 font-semibold
            disabled:opacity-50 disabled:cursor-not-allowed
            hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Post
          </button>
        </div>
      </form>
    </>
  );
}
