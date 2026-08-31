const isProd: boolean= process.env.NODE_ENV=== "production"

export const cookieOptions: object= {
    httpOnly: true, // Cookie only accesible throughout HTTP requests, no via JS
    secure: isProd, // If it is in production, it will be only accesible via HTTPS
    samesite: isProd ? "none" : "lax", // If its prod, allows different domain communication
    maxAge: 60 * 60 * 1000 // 1 hour in miliseconds
}
