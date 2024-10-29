"use client";

import MapboxMap from "@/components/mapbox-map";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export default function MapPage() {
    const [priceRange, setPriceRange] = useState([0, 10000]);

    return (
        <div className="h-screen w-full relative">
            <MapboxMap interactive={true} className="w-full h-full" />

            {/* Floating Navigation */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4">
                <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-lg shadow-lg border border-border p-4">
                    <div className="flex flex-col gap-4">
                        {/* Search Input and Theme Toggle */}
                        <div className="flex gap-2 items-center">
                            <div className="relative flex-1">
                                <Input
                                    type="text"
                                    placeholder="Search locations..."
                                    className="w-full pl-4 pr-10 py-2"
                                />
                                <svg
                                    className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                            <ThemeToggle />
                        </div>

                        {/* Filter Buttons */}
                        <div className="flex flex-wrap gap-2">
                            <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium hover:bg-secondary/90 transition-colors">
                                West Campus
                            </button>
                            <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium hover:bg-secondary/90 transition-colors">
                                Main Campus
                            </button>
                            <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium hover:bg-secondary/90 transition-colors">
                                With WiFi
                            </button>
                            <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium hover:bg-secondary/90 transition-colors">
                                With Water Supply
                            </button>
                        </div>

                        {/* Price Range Filter */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm text-muted-foreground">
                                <span>Price Range</span>
                                <span>
                                    ₱{priceRange[0]} - ₱{priceRange[1]}
                                </span>
                            </div>
                            <Slider
                                defaultValue={[0, 10000]}
                                max={10000}
                                step={100}
                                value={priceRange}
                                onValueChange={setPriceRange}
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Navigation */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-md px-4">
                <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-full shadow-lg border border-border">
                    <div className="flex justify-between items-center p-2">
                        <Link
                            href="/listing"
                            className="flex flex-col items-center px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <svg
                                className="w-5 h-5"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                                />
                            </svg>
                            <span>Listings</span>
                        </Link>
                        <Link
                            href="/map"
                            className="flex flex-col items-center px-4 py-2 text-sm font-medium text-foreground"
                        >
                            <svg
                                className="w-5 h-5"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                                />
                            </svg>
                            <span>Map</span>
                        </Link>
                        <Link
                            href="/create"
                            className="flex flex-col items-center px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <svg
                                className="w-5 h-5"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                            <span>Create</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
