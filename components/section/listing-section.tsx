"use client";

import { BottomNav } from "@/components/bottom-nav";
import { TopNav } from "@/components/top-nav";
import { Listing } from "@prisma/client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useQuery } from "react-query";

const ListingSection = () => {
    const searchParams = useSearchParams();
    const minPrice = Number(searchParams.get("minPrice")) || 0;
    const maxPrice = Number(searchParams.get("maxPrice")) || 5000;
    const searchQuery = searchParams.get("q") || "";
    const closeTo = searchParams.get("close_to") as
        | "west"
        | "main"
        | "both"
        | "null";

    const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
    const [searchTerm, setSearchTerm] = useState(searchQuery);
    const [hasWifi, setHasWifi] = useState(false);
    const [hasWater, setHasWater] = useState(false);

    const {
        data: listings,
        isLoading,
        error,
    } = useQuery<Listing[]>({
        queryKey: ["listings"],
        queryFn: async () => {
            const response = await fetch("/api/listing");
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        },
    });

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex items-center justify-center min-h-[200px]">
                    <p className="text-lg text-muted-foreground animate-pulse">
                        Loading...
                    </p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="flex items-center justify-center min-h-[200px]">
                    <p className="text-lg text-red-500">
                        Error loading listings
                    </p>
                </div>
            );
        }

        if (!listings || listings.length === 0) {
            return (
                <div className="flex items-center justify-center min-h-[200px]">
                    <p className="text-lg text-muted-foreground">
                        No listings found
                    </p>
                </div>
            );
        }

        const filteredListings = listings.filter((listing) => {
            const matchesSearch =
                listing.title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                listing.address
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
            const matchesPrice =
                listing.price >= priceRange[0] &&
                listing.price <= priceRange[1];
            const matchesLocation =
                closeTo === "null" || // Reset filter if closeTo is 'null'
                !closeTo ||
                listing.close_to === closeTo ||
                listing.close_to === "both";

            const matchesWifi = !hasWifi || listing.wifi_available;
            const matchesWater = !hasWater || listing.watersupply_available;

            return (
                matchesSearch &&
                matchesPrice &&
                matchesLocation &&
                matchesWifi &&
                matchesWater
            );
        });

        if (filteredListings.length === 0) {
            return (
                <div className="flex items-center justify-center min-h-[200px]">
                    <p className="text-lg text-muted-foreground">
                        No listings match your filters
                    </p>
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 gap-8">
                {filteredListings.map((listing) => (
                    <div
                        key={listing.id}
                        className="group bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200"
                    >
                        <div className="flex flex-col md:flex-row">
                            <div className="relative w-full md:w-2/5 h-[240px] md:min-h-[320px]">
                                <Image
                                    src={listing.images[0]}
                                    alt={listing.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                                <div className="absolute top-4 right-4 md:hidden">
                                    <span className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-lg font-bold text-primary shadow-lg">
                                        ₱{listing.price.toLocaleString()}/month
                                    </span>
                                </div>
                            </div>
                            <div className="w-full md:w-3/5 p-6 md:p-8">
                                <div className="flex flex-col md:flex-row justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                                            {listing.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-2 flex items-center gap-2">
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg>
                                            {listing.address}
                                        </p>
                                    </div>
                                    <span className="hidden md:block bg-primary/10 px-6 py-3 rounded-full text-lg font-bold text-primary">
                                        ₱{listing.price.toLocaleString()}/month
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-4 md:gap-6 text-sm text-gray-600 mb-6">
                                    <span className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl">
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                            />
                                        </svg>
                                        {listing.bedroom_no} Bedrooms
                                    </span>
                                    <span className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl">
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                            />
                                        </svg>
                                        {listing.bathroom_no} Bathrooms
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    {listing.wifi_available && (
                                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-blue-50 text-blue-700">
                                            <svg
                                                className="w-4 h-4"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4.8c3.977 0 7.2 3.223 7.2 7.2 0 .395-.032.784-.096 1.168l-1.46-1.46c.037-.225.056-.455.056-.688 0-2.316-1.884-4.2-4.2-4.2-.233 0-.463.019-.688.056L11.632 5.696c.384-.064.773-.096 1.168-.096zM5.777 7.488l1.46 1.46c-.037.225-.056.455-.056.688 0 2.316 1.884 4.2 4.2 4.2.233 0 .463-.019.688-.056l1.46 1.46c-.384.064-.773.096-1.168.096-3.977 0-7.2-3.223-7.2-7.2 0-.395.032-.784.096-1.168zM12 8.4c1.43 0 2.6 1.17 2.6 2.6 0 .233-.019.463-.056.688l-3.232-3.232c.225-.037.455-.056.688-.056zm-2.544.968l3.232 3.232c-.225.037-.455.056-.688.056-1.43 0-2.6-1.17-2.6-2.6 0-.233.019-.463.056-.688z" />
                                            </svg>
                                            WiFi Available
                                        </span>
                                    )}
                                    {listing.watersupply_available && (
                                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-green-50 text-green-700">
                                            <svg
                                                className="w-4 h-4"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                                            </svg>
                                            Water Supply
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Search and Filter Section */}
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg shadow-sm">
                <div className="max-w-6xl mx-auto px-4 py-3">
                    <TopNav
                        priceRange={priceRange}
                        onPriceRangeChange={setPriceRange}
                        searchValue={searchTerm}
                        onSearchChange={setSearchTerm}
                    />
                </div>
            </div>

            {/* Listings Grid */}
            <div className="container max-w-6xl mx-auto px-4 py-8">
                {renderContent()}
            </div>

            {/* Bottom Navigation */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-6xl px-4">
                <BottomNav />
            </div>
        </div>
    );
};

export default ListingSection;
