import { NextResponse } from 'next/server';
import { syncUser } from '@/actions/user.action';

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { firebaseId, email, displayName, photoURL } = body;

		if (!firebaseId || !email) {
			return NextResponse.json(
				{ error: 'Missing required fields' },
				{ status: 400 }
			);
		}

		const user = await syncUser(firebaseId, email, displayName, photoURL);
		return NextResponse.json({ user });
	} catch (error) {
		console.error('Error syncing user:', error);
		return NextResponse.json(
			{ error: 'Failed to sync user' },
			{ status: 500 }
		);
	}
}
