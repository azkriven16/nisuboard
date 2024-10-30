"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import UserButton from "./user-button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Logo } from "@/components/logo";

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
    const searchParams = useSearchParams();
    const closeTo = searchParams.get("close_to");

    return (
        <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-lg shadow-lg border border-border p-4">
            <div className="flex flex-col justify-center gap-4">
                {/* Logo, Theme Toggle and User Button */}
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex-shrink-0">
                        <Logo />
                    </Link>
                    <div className="flex gap-2">
                        <ThemeToggle />
                        <UserButton />
                    </div>
                </div>

                {/* Search Input */}
                <div className="relative">
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

                {/* Filter Buttons */}
                <div className="flex justify-center gap-2">
                    <Link
                        href="?close_to=west"
                        className={`${
                            closeTo === "west"
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-secondary-foreground"
                        } px-4 h-8 flex items-center justify-center rounded-full text-xs font-medium hover:bg-primary/90 transition-colors`}
                        title="West Campus"
                    >
                        West
                    </Link>
                    <Link
                        href="?close_to=main"
                        className={`${
                            closeTo === "main"
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-secondary-foreground"
                        } px-4 h-8 flex items-center justify-center rounded-full text-xs font-medium hover:bg-primary/90 transition-colors`}
                        title="Main Campus"
                    >
                        Main
                    </Link>
                    <Link
                        href="?close_to=both"
                        className={`${
                            closeTo === "both"
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-secondary-foreground"
                        } px-4 h-8 flex items-center justify-center rounded-full text-xs font-medium hover:bg-primary/90 transition-colors`}
                        title="Both Campus"
                    >
                        Both
                    </Link>
                    <Link
                        href="?close_to=null"
                        className="bg-destructive/10 text-destructive w-8 h-8 flex items-center justify-center rounded-full hover:bg-destructive/20 transition-colors"
                        title="Reset Filters"
                    >
                        ×
                    </Link>
                </div>
            </div>
        </div>
    );
}
