'use client';

import React from "react";
import { Template } from "tinacms";
import Link from "next/link";
import { sectionLogosBalanced } from "@/utils/sectionLogos";

const sections: {
  name: "Squirrels" | "Beavers" | "Cubs" | "Scouts";
  age: string;
  times: string[];
  color: string;
  url: string;
}[] = [
  {
    name: "Squirrels",
    age: "4-6yrs",
    times: ["Thursday", "5:30 pm - 6:30 pm"],
    color: "#E22E12",
    url: "/squirrels",
  },
  {
    name: "Beavers",
    age: "6-8yrs",
    times: ["Monday", "5:30 pm - 6:45 pm", "Thursday", "5:30 pm - 6:45 pm"],
    color: "#006DDF",
    url: "/beavers",
  },
  {
    name: "Cubs",
    age: "8-10.5yrs",
    times: ["Tuesday", "6:30 pm - 8:00 pm"],
    color: "#23A950",
    url: "/cubs",
  },
  {
    name: "Scouts",
    age: "10.5-14yrs",
    times: ["Thursday", "7:00 pm - 8:30 pm"],
    color: "#004851",
    url: "/scouts",
  },
];

export const SectionCards = ({ data }: { data?: { title?: string } }) => {
  const title = data?.title;

  return (
    <section className="container py-12 lg:py-20">
      {title && (
        <h2 
          className="text-left text-[32px] font-black mb-12 text-logo-purple underline decoration-logo-gold underline-offset-3"
          style={{
            textDecorationColor: '#E7B824',
            textDecorationThickness: '3px',
            textUnderlineOffset: '16px',
          }}
        >
          {title}
        </h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sections.map((section) => (
          <Link
            key={section.name}
            href={section.url}
            className="flex flex-col items-center p-8 rounded transition-all hover:scale-[1.03] hover:shadow-xl no-underline border border-transparent hover:border-white/10 group"
            style={{ 
              backgroundColor: `${section.color}15`, // 15% opacity version of the brand color
            }}
          >
            <span 
              className="text-xs font-black uppercase tracking-widest mb-6 opacity-70"
              style={{ color: section.color }}
            >
              {section.age}
            </span>
            
            <div className="h-16 w-full flex items-center justify-center mb-10 transition-transform duration-300 group-hover:scale-110">
              <div 
                className="h-full w-auto max-w-[85%] flex items-center justify-center"
                dangerouslySetInnerHTML={{ __html: sectionLogosBalanced[section.name] }}
              />
            </div>

            <div className="flex flex-col gap-1 items-center mt-auto">
              {section.times.map((line, i) => (
                <span 
                  key={i} 
                  className={i % 2 === 0 ? "text-[10px] font-bold uppercase tracking-wider opacity-60 mt-3 first:mt-0" : "text-sm font-black"}
                  style={{ color: section.color }}
                >
                  {line}
                </span>
              ))}
            </div>

            <div 
              className="mt-8 px-4 py-2 rounded text-[10px] font-black tracking-wider transition-colors duration-300 group-hover:bg-white/20"
              style={{ 
                backgroundColor: section.color,
                color: "white"
              }}
            >
              Learn More
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export const sectionCardsBlockSchema: Template = {
  name: "sectionCards",
  label: "Section Cards (Meeting Times)",
  ui: {
    previewSrc: "/blocks/section-cards.png",
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title (Internal only)",
    },
  ],
};
