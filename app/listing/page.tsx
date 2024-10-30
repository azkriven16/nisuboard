import ListingSection from "@/components/section/listing-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Listings",
    description: "Browse available listings",
};

export const dynamic = "force-dynamic";

export default function ListingPage() {
    return <ListingSection />;
}
