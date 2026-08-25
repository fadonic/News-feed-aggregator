import { formatDistanceToNow, parseISO } from 'date-fns';

export function formatRelativeDate(iso: string): string {
	try {
		return formatDistanceToNow(parseISO(iso), { addSuffix: true });
	} catch {
		return iso;
	}
}
