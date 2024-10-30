import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin";

export default clerkMiddleware((auth, request) => {
    const isAdminRoute = createRouteMatcher("/admin")(request);

    if (isAdminRoute) {
        const authHeader = request.headers.get("Authorization");
        if (!authHeader) {
            return new Response("Authentication required", {
                status: 401,
                headers: {
                    "WWW-Authenticate": "Basic realm='Access to admin'",
                },
            });
        }

        const [type, credentials] = authHeader.split(" ");
        if (type !== "Basic") {
            return new Response("Invalid authentication method", {
                status: 401,
            });
        }

        const decodedCredentials = atob(credentials);
        const [username, password] = decodedCredentials.split(":");

        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            return; // User is authenticated, proceed to the admin route
        }

        return new Response("Invalid credentials", {
            status: 401,
            headers: {
                "WWW-Authenticate": "Basic realm='Access to admin'",
            },
        });
    }
});

export const config = {
    matcher: [
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        "/(api|trpc)(.*)",
    ],
};
