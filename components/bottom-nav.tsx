"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNav() {
    const pathname = usePathname();

    return (
        <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-full shadow-lg border border-border">
            <div className="flex justify-between items-center p-2">
                <Link
                    href="/listing"
                    className={`flex flex-col items-center px-4 py-2 text-sm font-medium ${
                        pathname === "/listing"
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground transition-colors"
                    }`}
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
                    className={`flex flex-col items-center px-4 py-2 text-sm font-medium ${
                        pathname === "/map"
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground transition-colors"
                    }`}
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
                    className={`flex flex-col items-center px-4 py-2 text-sm font-medium ${
                        pathname === "/create"
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground transition-colors"
                    }`}
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
    );
} 