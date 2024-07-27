export function formatTimeAgo(isoDateString: string): string {
	const date = new Date(isoDateString);
	const now = new Date();
	const diffInMs = now.getTime() - date.getTime();
	const diffInMinutes = Math.floor(diffInMs / 60000);
	const diffInHours = Math.floor(diffInMinutes / 60);
	const diffInDays = Math.floor(diffInHours / 24);

	if (diffInMinutes < 60) {
		return `${diffInMinutes} minutes ago`;
	} else if (diffInHours < 24) {
		return `${diffInHours} hours ago`;
	} else if (diffInDays === 1) {
		return `1 day ago`;
	} else {
		return `${diffInDays} days ago`;
	}
}
