"use client";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";

export default function Shortenform() {
  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/shorten", { url });
      const data = await response?.data;

      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex flex-col gap-y-10 p-4">
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="h-12 text-lg border-2 border-gray-300"
          type="url"
          placeholder="Enter URL to shorten"
          required
        />
        <Button className="w-full p-6" type="submit">
          Shorten URL
        </Button>
      </div>
    </form>
  );
}
