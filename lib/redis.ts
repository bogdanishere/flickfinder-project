// test;

import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(1000, "10 s"), // 1000 requests per 10 seconds
});

export function isSuspiciousPath(pathname: string): boolean {
  const suspiciousPaths = [
    // Căi existente
    "/env",
    "/.env",
    "/env.",
    "/.env.",
    "/.git",
    "/wp-admin",
    "/phpMyAdmin",
    "/phpmyadmin",
    "/admin",
    "/.aws",
    "/config",
    "/.config",
    "/backup",
    "/.backup",

    // Execuție comenzi
    "/exec",

    // GraphQL scanning
    "/graphql",
    "/api/graphql",
    "/graphql/api",
    "/api/gql",

    // Swagger scanning
    "/swagger-ui.html",
    "/swagger/index.html",
    "/swagger/swagger-ui.html",
    "/webjars/swagger-ui/index.html",
    "/swagger.json",
    "/swagger/v1/swagger.json",
    "/swagger",

    // API docs scanning
    "/v2/api-docs",
    "/v3/api-docs",
    "/api-docs/swagger.json",
    "/api/swagger.json",
    "/api-docs",

    // API action scanning (bots)
    "/apps",
    "/api/action",
    "/api/actions",

    // Alte căi comune de scanare
    "/wp-login.php",
    "/wp-content",
    "/wp-includes",
    "/wordpress",
    "/db",
    "/database",
    "/sql",
    "/dump",
    "/mysql",
    "/pma",
    "/actuator",
    "/actuator/health",
    "/actuator/env",
    "/debug",
    "/trace",
    "/metrics",
    "/console",
    "/shell",
    "/cmd",
    "/eval",
    "/run",
    "/invoke",
    "/.svn",
    "/joomla",
    "/drupal",
  ];

  // Extensii suspecte
  const suspiciousExtensions = [".php", ".asp", ".aspx", ".jsp", ".cgi"];

  const lowerPathname = pathname.toLowerCase();

  // Verifică extensii suspecte
  const hasSuspiciousExtension = suspiciousExtensions.some((ext) =>
    lowerPathname.endsWith(ext)
  );

  if (hasSuspiciousExtension) {
    return true;
  }

  return suspiciousPaths.some(
    (path) =>
      lowerPathname.startsWith(path.toLowerCase()) ||
      lowerPathname.includes(path.toLowerCase())
  );
}

export async function unbanIP(ip: string): Promise<void> {
  await redis.del(`banned:${ip}`);
  console.log(`✅ IP ${ip} unbanned`);
}
