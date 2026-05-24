import { NextResponse } from 'next/server';

export function middleware(req) {
    const token = req.cookies.get('access_token_cookie')?.value;

    if (!token) {
        // Construct the absolute URL correctly
        const loginUrl = new URL('/guest/login', req.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
