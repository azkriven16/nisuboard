"use client";

import {
    SignedIn,
    SignedOut,
    UserButton as ClerkUserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { IconUser } from "@tabler/icons-react";

export default function UserButton({ className }: { className?: string }) {
    return (
        <div className={cn(className)}>
            <SignedOut>
                <Link
                    className={cn(
                        buttonVariants({
                            variant: "ghost",
                            size: "icon",
                        })
                    )}
                    href="/sign-in"
                >
                    <IconUser className={cn("size-4")} />
                    <span className={cn("sr-only")}>Sign in</span>
                </Link>
            </SignedOut>
            <SignedIn>
                <ClerkUserButton
                    appearance={{
                        elements: {
                            avatarBox: cn("size-7"),
                        },
                    }}
                />
            </SignedIn>
        </div>
    );
}
