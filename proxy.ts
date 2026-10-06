import {NextRequest,NextResponse} from 'next/server';
export function proxy(request:NextRequest){
 const path=request.nextUrl.pathname;
 if(path.startsWith('/_next')||path.includes('.')||path.startsWith('/api'))return NextResponse.next();
 const stored=request.cookies.get('hanxw-locale')?.value;
 const preferred=stored==='ru'||stored==='en'?stored:request.headers.get('accept-language')?.toLowerCase().startsWith('ru')?'ru':'en';
 const locale=path.split('/')[1];
 if(locale!=='en'&&locale!=='ru'){const url=request.nextUrl.clone();url.pathname=`/${preferred}${path==='/'?'':path}`;return NextResponse.redirect(url);}
 const headers=new Headers(request.headers);headers.set('x-hanxw-locale',locale);return NextResponse.next({request:{headers}});
}
export const config={matcher:['/((?!_next/static|_next/image|favicon.ico).*)']};
