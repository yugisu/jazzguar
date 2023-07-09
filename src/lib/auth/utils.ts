export const constructLoginRedirectLink = <T extends { pathname: string; search: string }>(url: T) =>
	`/login?redirectTo=${encodeURIComponent(url.pathname + url.search)}`;

export const extractRedirectTo = (search: string) => {
	const searchParams = new URLSearchParams(search);

	const redirectTo = searchParams.get('redirectTo');

	return redirectTo;
};
