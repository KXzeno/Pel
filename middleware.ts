import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

export function middleware(request: NextRequest) {
  console.info(request);
  return NextResponse.redirect("chrome://https://blog.karnovah.com");
}
 

export const config = {
  matcher: '',
}
