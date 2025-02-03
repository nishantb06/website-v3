import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  title: string;
  subtitle: string;
  tags: string[];
  slug: string;
  coverImage?: string;
  date?: string;
}

export const BlogCard = ({ 
  title, 
  subtitle, 
  tags, 
  coverImage, 
  slug, 
  date 
}: BlogCardProps) => {
  return (
    <Link href={`/blog/${slug}`} className="block">
      <div className="flex flex-col mb-4">
      <Card 
        className={cn(
          "flex w-full max-w-2xl h-40 border-none shadow-md mb-4 hover:-translate-y-0.5 group cursor-pointer",
          // light styles
          "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
          // dark styles
          "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
        )}
      >
        {/* Content Section (75% width) */}
        <div className="flex-grow p-4 pr-0 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl mb-2 line-clamp-2">{title}</h2>
            <p className="text-lg text-muted-foreground line-clamp-2 mb-2">{subtitle}</p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {tags.map((tag) => (
                <Link href={`/blog/tag/${tag}`} key={tag}>
                  <Badge key={tag}>{tag}</Badge>
                </Link>
              ))}
            </div>
            
            {date && (
              <span className="text-xs text-muted-foreground mr-4">
                {new Date(date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            )}
          </div>
        </div>

        {/* Image Section (25% width) */}
        {coverImage && (
          <div className="w-1/4 flex-shrink-0 relative">
            <div className="absolute inset-0 m-4">
              <img 
                src={coverImage} 
                alt={title}
                className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowRightIcon className="w-5 h-5" />
            </div>
          </div>
        )}
      </Card>
      </div>
    </Link>
  );
};