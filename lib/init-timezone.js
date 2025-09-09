// Initialize Node.js timezone from APP_TZ if provided
// Use this in server-side modules to ensure consistent timezone without touching scripts
if (typeof process !== "undefined") {
	const appTz = process.env.APP_TZ || process.env.NEXT_PUBLIC_APP_TZ;
	if (appTz && (!process.env.TZ || process.env.TZ !== appTz)) {
		process.env.TZ = appTz;
	}
} 