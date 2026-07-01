import { NextResponse } from "next/server";

export function middleware(request) {
    const hostname = request.headers.get("host");

    if (hostname === "sirbrownad.name.ng" || hostname === "www.sirbrownad.name.ng") {
        const url = request.nextUrl.clone();
        url.hostname = "browncode.name.ng";
        url.protocol = "https";
        return NextResponse.redirect(url, 301);
    }

    return NextResponse.next();
}

export const config = {
    matcher: "/:path*",
};