"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Listing } from "@prisma/client";
import { useQuery } from "react-query";
import { TopNav } from "@/components/top-nav";
import { BottomNav } from "@/components/bottom-nav";
import { useSearchParams } from "next/navigation";
import UserButton from "@/components/user-button";

const ListingSection = () => {
    const searchParams = useSearchParams();
    const minPrice = Number(searchParams.get("minPrice")) || 0;
    const maxPrice = Number(searchParams.get("maxPrice")) || 5000;
    const searchQuery = searchParams.get("q") || "";

    const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
    const [searchTerm, setSearchTerm] = useState(searchQuery);
    const [selectedLocation, setSelectedLocation] = useState<string>("all");
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
                selectedLocation === "all" ||
                listing.address.includes(selectedLocation) ||
                listing.close_to.includes(selectedLocation);

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredListings.map((listing) => (
                    <div
                        key={listing.id}
                        className="bg-card rounded-lg shadow-lg overflow-hidden border border-border"
                    >
                        <div className="relative h-48">
                            <Image
                                src={listing.images[0]}
                                alt={listing.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-card-foreground">
                                {listing.title}
                            </h3>
                            <p className="text-xl font-bold text-primary mt-1">
                                ₱{listing.price}/month
                            </p>
                            <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                                <span>{listing.bedroom_no} Bedrooms</span>
                                <span>{listing.bathroom_no} Bathrooms</span>
                            </div>
                            <div className="mt-2 text-sm text-muted-foreground">
                                {listing.address}
                            </div>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {listing.wifi_available && (
                                    <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                                        WiFi
                                    </span>
                                )}
                                {listing.watersupply_available && (
                                    <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                                        Water Supply
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Search and Filter Section */}
            <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
                <div className="max-w-md mx-auto px-4 py-4">
                    <TopNav
                        {...{
                            priceRange,
                            onPriceRangeChange: setPriceRange,
                            searchValue: searchTerm,
                            onSearchChange: setSearchTerm,
                            selectedLocation,
                            onLocationChange: setSelectedLocation,
                            hasWifi,
                            onWifiChange: setHasWifi,
                            hasWater,
                            onWaterChange: setHasWater,
                        }}
                    />
                </div>
            </div>

            {/* Listings Grid */}
            <div className="container mx-auto px-4 py-6">{renderContent()}</div>

            {/* Bottom Navigation */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-md px-4">
                <BottomNav />
            </div>
        </div>
    );
};

export default ListingSection;
