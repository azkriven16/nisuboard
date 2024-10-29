import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

// Get all listings
export async function GET() {
    try {
        const listings = await prisma.listing.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        return NextResponse.json(listings);
    } catch (error) {
        return NextResponse.json(
            { error: "Error fetching listings" },
            { status: 500 }
        );
    }
}

// Create new listing
export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await req.json();
        const listing = await prisma.listing.create({
            data: {
                ...body,
                userId,
            },
        });

        return NextResponse.json(listing);
    } catch (error) {
        return NextResponse.json(
            { error: "Error creating listing" },
            { status: 500 }
        );
    }
}

// Update listing
export async function PATCH(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await req.json();
        const { id, ...data } = body;

        // Verify ownership
        const listing = await prisma.listing.findUnique({
            where: { id },
        });

        if (!listing || listing.userId !== userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const updatedListing = await prisma.listing.update({
            where: { id },
            data,
        });

        return NextResponse.json(updatedListing);
    } catch (error) {
        return NextResponse.json(
            { error: "Error updating listing" },
            { status: 500 }
        );
    }
}

// Delete listing
export async function DELETE(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { error: "Listing ID required" },
                { status: 400 }
            );
        }

        // Verify ownership
        const listing = await prisma.listing.findUnique({
            where: { id },
        });

        if (!listing || listing.userId !== userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        await prisma.listing.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Listing deleted successfully" });
    } catch (error) {
        return NextResponse.json(
            { error: "Error deleting listing" },
            { status: 500 }
        );
    }
}
