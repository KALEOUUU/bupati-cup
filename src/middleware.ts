import withAuth from "./middleware/privatePage";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function Mainmiddleware(request: NextRequest) {
    const res = NextResponse.next()
    return res
}

export default withAuth(Mainmiddleware, ['/dashboard'])