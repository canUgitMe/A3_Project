import { auth } from "@/lib/firebase";
import { getAuth } from "firebase/auth";

export const getCurrentUser = () => {
	const user = auth.currentUser;
	if (!user) return null;
	return user;
};
