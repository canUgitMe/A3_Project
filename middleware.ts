import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// For future use if needed
export function middleware(request: NextRequest) {
	return NextResponse.next()
}

export const config = {
	matcher: [] // No paths for now
}
