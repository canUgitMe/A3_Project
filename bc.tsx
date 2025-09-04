import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


// Middleware to protect /explore route
export function middleware(request: NextRequest) {
	// Only run for /explore
	if (request.nextUrl.pathname.startsWith('/explore')) {
		// Check for a session cookie (Firebase Auth sets a cookie like __session or you may use your own)
		// Adjust the cookie name as per your Firebase Auth setup
		const hasSession = request.cookies.has('__session');
		if (!hasSession) {
			// Redirect to /signin if not authenticated
			const signinUrl = request.nextUrl.clone();
			signinUrl.pathname = '/signin';
			return NextResponse.redirect(signinUrl);
		}
	}
	return NextResponse.next();
}

export const config = {
	matcher: ['/explore']
}
