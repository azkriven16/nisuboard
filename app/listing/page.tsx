"use client";

import { BottomNav } from "@/components/bottom-nav";
import { TopNav } from "@/components/top-nav";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Post {
    id: string;
    title: string;
    price: number;
    address: string;
    latitude: number;
    longitude: number;
    bedroom_no: number;
    bathroom_no: number;
    wifi_available: boolean;
    watersupply_available: boolean;
    close_to: string;
    owner_name: string;
    owner_contact: string;
    owner_image: string;
    images: string[];
    ratings: {
        value: number;
        review: string;
        user_name: string;
        user_image: string;
    }[];
}

// Mock data generator
const generateMockPosts = (count: number): Post[] => {
    const posts = [];
    for (let i = 0; i < count; i++) {
        posts.push({
            id: `post${i}`,
            title: `${i % 2 === 0 ? "Cozy" : "Spacious"} Student Apartment ${
                i + 1
            }`,
            price: Math.floor(Math.random() * (5000 - 1500) + 1500),
            address: `${Math.floor(Math.random() * 100)} University Street`,
            latitude: 11.461424460015792 + (Math.random() - 0.5) * 0.01,
            longitude: 123.14389088712784 + (Math.random() - 0.5) * 0.01,
            bedroom_no: Math.floor(Math.random() * 3) + 1,
            bathroom_no: Math.floor(Math.random() * 2) + 1,
            wifi_available: Math.random() > 0.5,
            watersupply_available: Math.random() > 0.3,
            close_to: ["west", "main", "both"][Math.floor(Math.random() * 3)],
            owner_name: `Owner ${i + 1}`,
            owner_contact: `09${Math.floor(Math.random() * 1000000000)}`,
            owner_image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
            images: [
                `https://source.unsplash.com/400x300/?apartment,${i}`,
                `https://source.unsplash.com/400x300/?room,${i}`,
            ],
            ratings: Array(Math.floor(Math.random() * 5))
                .fill(null)
                .map((_, idx) => ({
                    value: Math.floor(Math.random() * 5) + 1,
                    review: "Great place to stay!",
                    user_name: `User ${idx}`,
                    user_image: `https://api.dicebear.com/7.x/avataaars/svg?seed=user${idx}`,
                })),
        });
    }
    return posts;
};

export default function ListingPage() {
    const [priceRange, setPriceRange] = useState([0, 5000]);
    const [searchTerm, setSearchTerm] = useState("");
    const [posts, setPosts] = useState<Post[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setPosts(generateMockPosts(10));
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Search and Filter Section */}
            <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
                <div className="container mx-auto px-4 py-4">
                    <TopNav
                        priceRange={priceRange}
                        onPriceRangeChange={setPriceRange}
                        searchValue={searchTerm}
                        onSearchChange={setSearchTerm}
                    />
                </div>
            </div>

            {/* Listings Grid */}
            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="bg-card rounded-lg shadow-lg overflow-hidden border border-border"
                        >
                            <div className="relative h-48">
                                <Image
                                    src={post.images[0]}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-card-foreground">
                                    {post.title}
                                </h3>
                                <p className="text-xl font-bold text-primary mt-1">
                                    ₱{post.price}/month
                                </p>
                                <p className="text-sm text-muted-foreground mt-2">
                                    {post.address}
                                </p>
                                <div className="flex gap-4 mt-3">
                                    <span className="text-sm text-card-foreground">
                                        🛏️ {post.bedroom_no} Beds
                                    </span>
                                    <span className="text-sm text-card-foreground">
                                        🚿 {post.bathroom_no} Baths
                                    </span>
                                </div>
                                <div className="flex gap-2 mt-3">
                                    {post.wifi_available && (
                                        <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs">
                                            WiFi
                                        </span>
                                    )}
                                    {post.watersupply_available && (
                                        <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs">
                                            Water Supply
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Navigation */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-md px-4">
                <BottomNav />
            </div>
        </div>
    );
}
