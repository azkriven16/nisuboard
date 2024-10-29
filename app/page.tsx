import type { Metadata } from "next";
import LandingPage from "@/components/section/landing-page";

export const metadata: Metadata = {
    title: "Nisuboard - Find Your Perfect Boarding House",
    description:
        "Discover and manage boarding houses efficiently with Nisuboard. Advanced search, user-friendly interface, and comprehensive management tools.",
};

export default function Home() {
    return <LandingPage />;
}
