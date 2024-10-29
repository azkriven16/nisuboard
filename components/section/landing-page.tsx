"use client";

import MapboxMap from "@/components/mapbox-map";
import { ThemeToggle } from "@/components/theme-toggle";
import { IconDownload, IconMenu2 } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import { Drawer, DrawerContent, DrawerOverlay } from "@/components/ui/drawer";

export default function LandingPage() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        <div className="min-h-screen transition-colors overflow-x-hidden">
            {/* Navigation Bar */}
            <nav className="shadow-sm bg-background">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-foreground">
                        Nisuboard
                    </h1>
                    <div className="flex space-x-4 items-center">
                        <div className="hidden md:flex space-x-4">
                            <Link
                                href="/platform"
                                className="text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium"
                            >
                                See Platform
                            </Link>
                            <Link
                                href="/map"
                                className="text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Map
                            </Link>
                            <Link
                                href="/listing"
                                className="text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Listing
                            </Link>
                            <Link
                                href="/sign-in"
                                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Get Started
                            </Link>
                        </div>
                        <ThemeToggle />
                        <button
                            className="md:hidden p-2 rounded-full text-foreground"
                            onClick={() => setIsDrawerOpen(true)}
                        >
                            <IconMenu2 className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </nav>
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <div className="p-4 space-y-4">
                        <Link
                            href="/platform"
                            className="block text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium"
                            onClick={() => setIsDrawerOpen(false)}
                        >
                            See Platform
                        </Link>
                        <Link
                            href="/map"
                            className="block text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium"
                            onClick={() => setIsDrawerOpen(false)}
                        >
                            Map
                        </Link>
                        <Link
                            href="/listing"
                            className="block text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium"
                            onClick={() => setIsDrawerOpen(false)}
                        >
                            Listing
                        </Link>
                        <Link
                            href="/sign-in"
                            className="block text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium"
                            onClick={() => setIsDrawerOpen(false)}
                        >
                            Get Started
                        </Link>
                    </div>
                </DrawerContent>
            </Drawer>

            {/* Main Content */}
            <div className="flex flex-col lg:flex-row min-h-[calc(100vh-73px)]">
                {/* Content Section */}
                <div className="w-full lg:w-1/2 p-4">
                    <div className="container mx-auto">
                        {/* Hero Section */}
                        <div className="text-center lg:text-left mb-12">
                            <h1 className="text-5xl font-extrabold mb-4 text-foreground">
                                Welcome to Nisuboard
                            </h1>
                            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
                                Discover the ultimate platform for finding and
                                managing boarding houses efficiently. Our
                                platform offers a seamless experience with
                                advanced search options, user-friendly
                                interface, and comprehensive management tools.
                            </p>
                            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors">
                                <IconDownload className="inline-block w-5 h-5 mr-2" />
                                Download App
                            </button>
                        </div>
                        <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                            <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full font-semibold hover:bg-secondary/90 transition-colors">
                                Next.js
                            </button>
                            <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full font-semibold hover:bg-secondary/90 transition-colors">
                                React
                            </button>
                            <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full font-semibold hover:bg-secondary/90 transition-colors">
                                Tailwind CSS
                            </button>
                            <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full font-semibold hover:bg-secondary/90 transition-colors">
                                TypeScript
                            </button>
                            <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full font-semibold hover:bg-secondary/90 transition-colors">
                                Next Themes
                            </button>
                            <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full font-semibold hover:bg-secondary/90 transition-colors">
                                Tabler Icons
                            </button>
                        </div>
                    </div>
                </div>
                {/* Map Section */}
                <div className="w-full lg:w-1/2 h-[500px] lg:h-auto p-4">
                    <MapboxMap
                        interactive={false}
                        className="w-full h-full rounded-none"
                    />
                </div>
            </div>
        </div>
    );
}
