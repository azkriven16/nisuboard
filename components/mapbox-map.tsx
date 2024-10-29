"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

mapboxgl.accessToken =
    "pk.eyJ1IjoiYXprcml2ZW4xNiIsImEiOiJjbGhma3IxaWcxN3c3M2VyM3VhcGsxcHk3In0.pto_0eshW9NHMP-m1O_blg";

export default function MapboxMap({
    interactive = true,
    className,
}: {
    interactive?: boolean;
    className?: string;
}) {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const { theme } = useTheme();

    useEffect(() => {
        if (!mapContainerRef.current) return;

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style:
                theme === "dark"
                    ? "mapbox://styles/mapbox/dark-v11"
                    : "mapbox://styles/mapbox/streets-v11",
            center: [123.14389088712784, 11.461424460015792],
            zoom: 13,
            dragPan: interactive,
            dragRotate: interactive,
            scrollZoom: interactive,
            doubleClickZoom: interactive,
            keyboard: interactive,
        });

        return () => map.remove();
    }, [interactive, theme]);

    return (
        <div
            ref={mapContainerRef}
            className={cn(
                "w-full h-96 rounded-xl shadow-lg overflow-hidden",
                className
            )}
        />
    );
}
