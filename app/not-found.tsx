import React from "react";

import Link from "next/link";
import Layout from "@/components/layout/layout";

export const metadata = {
  title: "Page not found | 119th Derby Scout Group",
  description: "Uh oh, this page is missing! Try returning to the homepage or check out our latest events.",
};

export default function NotFound() {
  return (
    <Layout>
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="text-center px-4 md:px-20 py-16 z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-logo-purple mb-4">
            You've wandered off the trail!
          </h1>

          <p className="text-xl text-black font-medium mb-8 max-w-xl mx-auto">
            This page seems to have gone missing. Don't worry, even the best navigators take a wrong turn sometimes.
          </p>

          <Link
            href="/"
            className="inline-block py-4 px-8 bg-logo-purple text-white font-bold rounded shadow-lg hover:bg-logo-purple-dark transition-colors"
          >
            Return to Base Camp
          </Link>
        </div>
      </section>
    </Layout>
  );
}
