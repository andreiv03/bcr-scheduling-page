const DEFAULTS = {
	NODE_ENV: "development",
};

export const ENV = {
	BCR_API_KEY: process.env["NEXT_PUBLIC_BCR_API_KEY"] as string,
	IPSTACK_API_KEY: process.env["NEXT_PUBLIC_IPSTACK_API_KEY"] as string,
	MAPBOX_API_KEY: process.env["NEXT_PUBLIC_MAPBOX_API_KEY"] as string,
	NODE_ENV: process.env["NODE_ENV"] || DEFAULTS.NODE_ENV,
} as const;

Object.entries(ENV).forEach(([key, value]) => {
	if (!key || !value) {
		throw new Error(`Missing required environment variable: ${key}`);
	}
});

export const AXIOS_HEADERS = {
	Accept: "application/json",
	"Content-Type": "application/json",
} as const;
