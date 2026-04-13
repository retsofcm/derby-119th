"use client";


import { Template } from "tinacms";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getSectionColor } from '@/utils/sectionColors';
import { Clock } from "lucide-react";


type Props = {
  data: {
    imageSrc: string | null | undefined;
    imagePosition?: string | null;
    title?: string | null;
    content: TinaMarkdownContent | TinaMarkdownContent[];
    meetingTimes?: (string | null)[] | null;
    buttonText?: string | null;
    buttonUrl?: string | null;

  };
};

export const ImageWithTextBlock = ({ data }: Props) => {
  const { imageSrc, title, content, buttonText, buttonUrl } = data;
  const pathname = usePathname();
  const sectionColor = getSectionColor(pathname || "");

  const imagePosition =
    data.imagePosition === "left" || data.imagePosition === "right"
      ? data.imagePosition
      : "right";
  
  return (
    <div className="container">
      <div className="grid grid-cols-12 gap-y-8 md:gap-x-4 items-center">
        {/* Text Section (5 cols) */}
        <div className={`col-span-12 lg:col-span-5 xl:col-span-4 order-2 ${imagePosition === "left" ? "lg:col-start-8 xl:col-start-8 lg:order-2" : "lg:col-start-1 xl:col-start-2 lg:order-1"}`}>
          <h2 
            className="text-[32px] font-black leading-[2] mb-6 text-logo-purple underline decoration-logo-gold underline-offset-3"
            style={{
              textDecorationColor: '#E7B824',
              textDecorationThickness: '3px',
              textUnderlineOffset: '16px',
            }}
          >
            {title}
          </h2>
          <div className="prose prose-lg mb-8">
            <TinaMarkdown content={content} />
          </div>

          {data.meetingTimes && data.meetingTimes.length > 0 && (
            <div className="mb-10 p-6 rounded border-l-4 bg-white shadow-sm flex items-start gap-4 transition-transform hover:scale-[1.01]" 
                 style={{ borderLeftColor: sectionColor }}>
              <div className="mt-1 p-2 rounded-full" style={{ backgroundColor: `${sectionColor}15` }}>
                <Clock className="w-5 h-5" style={{ color: sectionColor }} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: sectionColor }}>
                  Meeting Times
                </span>
                <div className="flex flex-col gap-1">
                  {data.meetingTimes.map((time, idx) => (
                    <span key={idx} className="text-base font-bold text-logo-purple">
                      {time}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {buttonText && buttonUrl && (
            <Link
              href={buttonUrl || ""}
              className="block text-center w-full py-4 px-5 text-white rounded transition-opacity hover:opacity-90"
              style={{ backgroundColor: sectionColor }}
              onClick={() => {
                if (buttonUrl?.includes("youtube.com") || buttonUrl?.includes("youtu.be")) {
                  window.gtag?.("event", "youtube_click", {
                    event_category: "Engagement",
                    event_label: buttonUrl,
                    value: 1,
                    link_text: buttonText || "YouTube Link",
                    component_title: title || "Untitled Section"
                  });
                }
              }}
            >
              {buttonText}
            </Link>
          )}


        </div>

        <div className={`col-span-12 lg:col-span-6 order-1 ${imagePosition === "left" ? "lg:order-1" : "lg:col-start-7 lg:order-2"}`}>
          <div className="relative w-full aspect-1">
            <img
              src={imageSrc || ""}
              alt={title ?? ""}
              className="w-full h-full object-cover object-top rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ImageWithTextBlockSchema: Template = {
  name: "ImageWithText",
  label: "Image with Text",
  ui: {
    previewSrc: "/blocks/image-with-text.png",
  },
  fields: [
    {
      type: "image",
      label: "Image",
      name: "imageSrc",
      required: true,
    },
    {
      type: "string",
      name: "imagePosition",
      label: "Image Position",
      options: [
        { label: "Left", value: "left" },
        { label: "Right", value: "right" },
      ],
      ui: {
        component: "radio-group",
        defaultValue: "left",
      },
      required: true,
    },    
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      type: "rich-text",
      label: "Content",
      name: "content",
      required: true,
    }, 
    {
      type: "string",
      label: "Meeting Times",
      name: "meetingTimes",
      list: true,
    },
    {
      type: "string",
      label: "Button Text",
      name: "buttonText",
      ui: {
        component: "text",
      },
      required: false,
    },
    {
      type: "string",
      label: "Button URL",
      name: "buttonUrl",
      required: false,
    },
  ],
};
