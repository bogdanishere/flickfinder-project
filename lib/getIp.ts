// test;
import type { NextRequest } from "next/server";
import { headers } from "next/headers";

export function getIp(req: NextRequest): string {
  const xfwd = req.headers.get("x-forwarded-for");
  if (xfwd) return xfwd.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}

// test

export function getIpForMiddleware(req: NextRequest): string {
  const xfwd = req.headers.get("x-forwarded-for");
  if (xfwd) return xfwd.split(",")[0].trim();

  const real = req.headers.get("x-real-ip");
  if (real) return real;

  const cfConnecting = req.headers.get("cf-connecting-ip");
  if (cfConnecting) return cfConnecting;

  const remoteAddr = req.headers.get("remote-addr");
  if (remoteAddr) return remoteAddr;

  return "unknown";
}

export const getIpForServerActions = async () => {
  const header = await headers();

  // x-forwarded-for este cel mai comun pe Hostinger și CloudFront
  const xfwd = header.get("x-forwarded-for");
  if (xfwd) return xfwd.split(",")[0].trim();

  // Backup headers
  const real = header.get("x-real-ip");
  if (real) return real;

  const cfConnecting = header.get("cf-connecting-ip"); // dacă folosești Cloudflare
  if (cfConnecting) return cfConnecting;

  const remoteAddr = header.get("remote-addr");
  if (remoteAddr) return remoteAddr;

  return "unknown";
};
