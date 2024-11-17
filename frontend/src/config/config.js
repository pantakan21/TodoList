// export const development = "http://localhost:8080";
// export const production = "vercel";

export const apiUrl = process.env.NODE_ENV === 'development' ? "http://localhost:8080" : "https://your-production-url.com";