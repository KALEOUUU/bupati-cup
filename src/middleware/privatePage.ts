import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

export default function PrivatePage (
    middleware: NextMiddleware,
    requireAuth: string[] = []
) {
    return async (req: NextRequest, next: NextFetchEvent) => {
        const pathName = req.nextUrl.pathname
        if (requireAuth.includes(pathName)) {
            const token = await getToken({
             req, secret: process.env.AUTH_SECRET,
        })
        if (!token) {
            const url = new URL('/', req.url)
            url.searchParams.set("callBackUrl", encodeURI(req.url))
            return NextResponse.redirect(url)
        }
        }
        return middleware(req,next)
    }
}