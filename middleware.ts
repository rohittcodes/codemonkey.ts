import authConfig from "./lib/auth.config";
import NextAuth from "next-auth";

const {auth} = NextAuth(authConfig);

const DEFAULT_LOGIN_REDIRECT = '/app';
const PUBLIC_ROUTES = ['/', '/blog', '/blog/[slug]', '/login'];
const DEFAULT_LOGIN_URL = '/login';
const AUTH_API = '/api/auth';

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const isLoginUrl = nextUrl.pathname === DEFAULT_LOGIN_URL;
    const isProtected = !PUBLIC_ROUTES.includes(nextUrl.pathname);
    const isAuthApi = nextUrl.pathname.startsWith(AUTH_API);
    
    if (isAuthApi) {
        return;
    }

    if (isLoggedIn && isLoginUrl) {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    if (!isLoggedIn && isProtected) {
        return Response.redirect(new URL(DEFAULT_LOGIN_URL, nextUrl));
    }
    
    return;
});

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}