import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

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
    const body = await req.json();
    try {
        const listing = await prisma.listing.create({
            data: {
                address: body.address as string,
                latitude: body.latitude as number,
                longitude: body.longitude as number,
                title: body.title as string,
                price: body.price as number,
                bedroom_no: body.bedroom_no as number,
                bathroom_no: body.bathroom_no as number,
                wifi_available: body.wifi_available as boolean,
                watersupply_available: body.watersupply_available as boolean,
                close_to: body.close_to as "west" | "main" | "both",
                owner_name: body.owner_name as string,
                owner_contact: body.owner_contact as string,
                owner_image: body.owner_image as string,
                userId: body.userId as string,
                images: body.images as string[],
                approved: false,
            },
        });

        return NextResponse.json(listing);
    } catch (error) {
        console.error("Error creating listing:", error);
        return NextResponse.json(
            { error: "Error creating listing" },
            { status: 500 }
        );
    }
}

// Update listing
// export async function PATCH(req: Request) {
//     try {
//         const { userId } = await auth();
//         if (!userId) {
//             return NextResponse.json(
//                 { error: "Unauthorized" },
//                 { status: 401 }
//             );
//         }

//         const body = await req.json();
//         const { id, ...data } = body;

//         // Verify ownership
//         const listing = await prisma.listing.findUnique({
//             where: { id },
//         });

//         if (!listing || listing.userId !== userId) {
//             return NextResponse.json(
//                 { error: "Unauthorized" },
//                 { status: 401 }
//             );
//         }

//         const updatedListing = await prisma.listing.update({
//             where: { id },
//             data,
//         });

//         return NextResponse.json(updatedListing);
//     } catch (error) {
//         return NextResponse.json(
//             { error: "Error updating listing" },
//             { status: 500 }
//         );
//     }
// }

// Delete listing
// export async function DELETE(req: Request) {
//     try {
//         const { userId } = await auth();
//         if (!userId) {
//             return NextResponse.json(
//                 { error: "Unauthorized" },
//                 { status: 401 }
//             );
//         }

//         const { searchParams } = new URL(req.url);
//         const id = searchParams.get("id");

//         if (!id) {
//             return NextResponse.json(
//                 { error: "Listing ID required" },
//                 { status: 400 }
//             );
//         }

//         // Verify ownership
//         const listing = await prisma.listing.findUnique({
//             where: { id },
//         });

//         if (!listing || listing.userId !== userId) {
//             return NextResponse.json(
//                 { error: "Unauthorized" },
//                 { status: 401 }
//             );
//         }

//         await prisma.listing.delete({
//             where: { id },
//         });

//         return NextResponse.json({ message: "Listing deleted successfully" });
//     } catch (error) {
//         return NextResponse.json(
//             { error: "Error deleting listing" },
//             { status: 500 }
//         );
//     }
// }
