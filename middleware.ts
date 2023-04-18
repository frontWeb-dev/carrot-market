import { NextRequest, NextResponse, userAgent } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/chats')) {
    console.log(request.nextUrl);
  }
  if (userAgent(request).isBot) {
    // 새로운 error 화면을 만들고 그쪽으로 rewrite 시켜줄것
  }

  if (!request.cookies.has('carrot-session') && !request.url.includes('/enter')) {
    request.nextUrl.searchParams.set('from', request.nextUrl.pathname);
    request.nextUrl.pathname = '/enter';
    return NextResponse.redirect(request.nextUrl);
  }
}
