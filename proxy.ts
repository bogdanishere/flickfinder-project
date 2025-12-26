import { NextRequest, NextResponse, userAgent } from "next/server";
import { getIp } from "./lib/getIp";
import { isSuspiciousPath, ratelimit, redis } from "./lib/redis";

const ALLOWED_ORIGIN = process.env.NEXT_URL || "http://localhost:3000";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const origin = request.headers.get("origin");

  // Check if origin is allowed
  const isAllowedOrigin = origin === ALLOWED_ORIGIN;

  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": isAllowedOrigin ? origin : "",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, x-requested-with",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Max-Age": "86400",
      },
    });
  }

  const res = NextResponse.next();

  const ip = getIp(request);

  const isBanned = await redis.get(`banned:${ip}`);

  const { device, browser, cpu, os, engine } = userAgent(request);

  // device.type can be: 'mobile', 'tablet', 'console', 'smarttv',
  // 'wearable', 'embedded', or undefined (for desktop browsers)
  const viewport = device.type || "desktop";

  const userAgentInfo = {
    device: {
      type: device.type || "desktop",
      vendor: device.vendor,
      model: device.model,
    },
    browser: {
      name: browser.name,
      version: browser.version,
    },
    os: {
      name: os.name,
      version: os.version,
    },
    cpu: {
      architecture: cpu.architecture,
    },
    engine: {
      name: engine.name,
      version: engine.version,
    },
    raw: request.headers.get("user-agent") || "unknown",
  };

  if (isBanned) {
    console.log(`🚫 Blocked banned IP: ${ip}`);
    return new NextResponse("Access Denied", {
      status: 403,
      headers: {
        "X-Ban-Reason": "Security violation",
      },
    });
  }

  if (isSuspiciousPath(pathname)) {
    console.log(`⚠️ SECURITY ALERT: ${ip} tried to access: ${pathname}`);

    // Banează IP-ul
    const BAN_DURATION = 86400 * 30; // 30 zile
    await redis.setex(
      `banned:${ip}`,
      BAN_DURATION,
      JSON.stringify({
        reason: "Suspicious path access",
        path: pathname,
        timestamp: new Date().toISOString(),
        userAgent: userAgentInfo,
      })
    );

    // Log incident
    await redis.lpush(
      "security:incidents",
      JSON.stringify({
        ip,
        path: pathname,
        timestamp: new Date().toISOString(),
        userAgent: userAgentInfo,
      })
    );

    console.log(`🔒 IP ${ip} BANNED for accessing ${pathname}`);

    return new NextResponse("Forbidden", { status: 403 });
  }

  let success: boolean, limit: number, remaining: number, reset: number;
  try {
    ({ success, limit, remaining, reset } = await ratelimit.limit(ip));
  } catch (err) {
    console.error("🔥 Upstash fetch error:", err);
    return new NextResponse("Internal RateLimiter Error", { status: 500 });
  }

  if (!success) {
    return NextResponse.redirect(new URL("/many-requests", request.url));
  }

  console.info(
    `Viewport: ${viewport}, Middleware applied on path: ${pathname} from IP: ${ip} using ${browser.name} on ${cpu.architecture}`
  );

  res.headers.set("X-RateLimit-Limit", limit.toString());
  res.headers.set("X-RateLimit-Remaining", remaining.toString());
  res.headers.set("X-RateLimit-Reset", reset.toString());

  if (isAllowedOrigin && origin) {
    res.headers.set("Access-Control-Allow-Origin", origin);
    res.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, x-requested-with"
    );
    res.headers.set("Access-Control-Allow-Credentials", "true");
  }

  if (pathname.startsWith("/api/auth")) {
    return res;
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, manifests, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg|.*\\.webp|.*\\.ico|manifest.webmanifest).*)",
  ],
};
