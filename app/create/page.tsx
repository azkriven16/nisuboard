import { Metadata } from "next";
import CreateForm from "@/components/section/create-form";
import { BottomNav } from "@/components/bottom-nav";
import { Logo } from "@/components/logo";

export const metadata: Metadata = {
    title: "Create Listing | Dormie",
    description: "Create a new listing for your property on Dormie",
};

export default function CreatePage() {
    return (
        <div>
            <nav className="shadow-sm bg-background">
                <div className="container mx-auto px-4 py-4">
                    <Logo />
                </div>
            </nav>
            <div className="container py-10 pb-24">
                <div className="max-w-2xl mx-auto">
                    <CreateForm />
                </div>
                {/* Bottom Navigation */}
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-md px-4">
                    <BottomNav />
                </div>
            </div>
        </div>
    );
}
