"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { CopyIcon } from "lucide-react";
import { EyeIcon } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

export default function UrlList() {
  const [urlList, setUrlList] = useState([]);

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const fetchUrls = async () => {
    try {
      const response = await axios.get("/api/url-list");
      setUrlList(response?.data);
    } catch (error) {
      toast.error("Failed to fetch URLs");
    }
  };

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    toast.success("URL copied to clipboard");
  };

  const handleVisits = async (urlId) => {
    try {
      await axios.put(`/api/visits`, { urlId });
      fetchUrls();
    } catch (error) {
      toast.error("Failed to update visits");
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  return (
    <div className="flex flex-col gap-y-4 px-4">
      <h2 className="text-2xl font-bold mb-2">Recent URLs</h2>
      <ul className="space-y-2">
        {urlList?.length > 0 &&
          urlList?.map((url) => (
            <li
              key={url?.id}
              className="flex items-center gap-2 justify-between"
            >
              <Link
                href={url?.originalUrl}
                target="_blank"
                className="text-blue-800 hover:text-red-800 visited:text-violet-800 transition-transform"
                onClick={() => handleVisits(url?.id)}
              >
                {baseUrl}/{url?.shortCode}
              </Link>
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:bg-muted"
                  onClick={() => handleCopy(url?.originalUrl)}
                >
                  <CopyIcon className="w-4 h-4" />
                  <span className="sr-only">Copy</span>
                </Button>
                <span className="md:items-center hidden md:flex gap-x-2">
                  <EyeIcon className="w-4 h-4" />
                  {url?.visits} views
                </span>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
