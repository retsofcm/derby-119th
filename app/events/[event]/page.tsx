import { use } from "react";
import client from "@/tina/__generated__/client";
import ClientPage from "./page.client";
import Layout from "@/components/layout/layout";

const QUERY = `
  query Event($relativePath: String!) {
    event(relativePath: $relativePath) {
      eventName
      heroImg
      startDate
      endDate
      location
      body
      price
    }
  }
`;

export async function generateMetadata(props: {
  params: Promise<{ event: string }>;
}) {
  const { event } = await props.params;
  const relativePath = `${event}.mdx`;
  
  try {
    const { data } = await client.request({
      query: QUERY,
      variables: { relativePath },
    }, {});
    
    const eventData = data?.event;
    const description =
      eventData?.body || 
      "Discover upcoming events at 119th Derby Scout Group.";
    
      return {
      title: eventData?.eventName ? `${eventData.eventName} | 119th Derby Scout Group` : "Upcoming event | 119th Derby Scout Group",
      description,
    };
  } catch {
    return {
      title: "Event Not Found | 119th Derby Scout Group",
      description: "This event could not be found.",
    };
  }
}

export default function EventPage({ params }: { params: Promise<{ event: string }> }) {
  const { event } = use(params);
  const relativePath = `${event}.mdx`;
  const options = {};

  const { data } = use(
    client.request({
      query: QUERY,
      variables: { relativePath },
    }, options)
  );

  return (
    <Layout>
      <ClientPage
        query={QUERY}
        variables={{ relativePath }}
        data={data}
      />
    </Layout>
  );
}
