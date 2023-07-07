/**
 * User profile type derived from Firebase's User types.
 */
export type UserProfile = {
	uid: string;
	email: string | undefined;
	displayName: string | undefined;
	photoURL: string | undefined;
	phoneNumber: string | undefined;
};
