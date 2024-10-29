"use client";

import { BottomNav } from "@/components/bottom-nav";
import MapboxMap from "@/components/mapbox-map";
import { TopNav } from "@/components/top-nav";
import { useState } from "react";

export default function MapPage() {
    const [priceRange, setPriceRange] = useState([0, 5000]);
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="h-screen w-full relative">
            <MapboxMap interactive={true} className="w-full h-full" />

            {/* Top Navigation */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-full max-w-md px-4">
                <TopNav
                    priceRange={priceRange}
                    onPriceRangeChange={setPriceRange}
                    searchValue={searchTerm}
                    onSearchChange={setSearchTerm}
                />
            </div>

            {/* Bottom Navigation */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-md px-4">
                <BottomNav />
            </div>
        </div>
    );
}
