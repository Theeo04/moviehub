import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import type { Post } from "../../types/types";
import Avatar from "./Avatar";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

interface CreatePostProps {
  onPostSubmit?: (post: Post) => void;
}

export default function CreatePost({ onPostSubmit }: CreatePostProps) {
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [llmResponse, setLlmResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const newPost: Post = {
      content: content.trim(),
      date: new Date().toISOString(),
    };

    // Call parent callback
    onPostSubmit?.(newPost);
    setContent("");
    setLoading(true);
    setLlmResponse(null);

    try {
      console.log("Sending request to:", `${BACKEND_URL}/chat`); // Log URL
      const res = await fetch(`${BACKEND_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: newPost.content }),
      });

      console.log("Response status:", res.status); // Log status
      if (!res.ok) {
        const detail = await res.json();
        console.error("Error detail:", detail); // Log error detail
        throw new Error(detail.detail || "Backend error");
      }

      const data = await res.json();
      console.log("Response data:", data); // Log response data
      setLlmResponse(data.response);
    } catch (err: any) {
      console.error("Fetch error:", err); // Log fetch error
      setLlmResponse(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const borderClass = error ? "border-red-500" : "border-gray-300";

  return (
    <>
      <h1 className="text-3xl font-semibold mb-8">
        Share your thought about last movie!
      </h1>
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
          <div className="flex space-x-10 text-blue-500 text-xl select-none pl-12">
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
            disabled={!content.trim() || loading}
            className="bg-blue-400 text-white rounded-full px-5 py-2 font-semibold
            disabled:opacity-50 disabled:cursor-not-allowed
            hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </div>
      </form>

      {llmResponse && (
        <div className="mt-4 p-3 border rounded-lg bg-gray-50">
          <h3 className="font-bold mb-1">LLM Response:</h3>
          <p>{llmResponse}</p>
        </div>
      )}
    </>
  );
}
