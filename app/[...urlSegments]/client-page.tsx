"use client";

import { useTina } from "tinacms/dist/react";
import { Blocks } from "@/components/blocks";
import ErrorBoundary from "@/components/error-boundary";
import { SectionCards } from "@/components/blocks/section-cards";
import { EventSummary } from "@/types/EventSummary";
import { PageQuery } from "@/tina/__generated__/types";

export interface ClientPageProps {
  data: {
    page: PageQuery["page"];
  };
  variables: {
    relativePath: string;
  };
  query: string;
  events: EventSummary[];
}

export default function ClientPage(props: ClientPageProps) {
  const { data } = useTina({ ...props });

  if (!data?.page) {
    return <div></div>;
  }

  const isSectionPage = props.variables.relativePath.includes("squirrels") || 
                        props.variables.relativePath.includes("beavers") || 
                        props.variables.relativePath.includes("cubs") || 
                        props.variables.relativePath.includes("scouts");

  return (
    <ErrorBoundary>
      <Blocks {...data.page} events={props.events} />
      {isSectionPage && (
        <SectionCards data={{ title: "Explore Other Sections" }} />
      )}
    </ErrorBoundary>
  );
}
