"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import UserButton from "./user-button";

interface TopNavProps {
    priceRange: number[];
    onPriceRangeChange: (value: number[]) => void;
    searchValue?: string;
    onSearchChange?: (value: string) => void;
}

export function TopNav({
    priceRange,
    onPriceRangeChange,
    searchValue = "",
    onSearchChange = () => {},
}: TopNavProps) {
    return (
        <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-lg shadow-lg border border-border p-4">
            <div className="flex flex-col justify-center gap-4">
                {/* Search Input and Theme Toggle */}
                <div className="flex gap-2 items-center">
                    <div className="relative flex-1">
                        <Input
                            type="text"
                            placeholder="Search locations..."
                            className="w-full pl-4 pr-10 py-2"
                            value={searchValue}
                            onChange={(e) => onSearchChange(e.target.value)}
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
                    <UserButton />
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
                        defaultValue={[0, 5000]}
                        max={5000}
                        step={100}
                        value={priceRange}
                        onValueChange={onPriceRangeChange}
                        className="w-full"
                    />
                </div>
            </div>
        </div>
    );
}
