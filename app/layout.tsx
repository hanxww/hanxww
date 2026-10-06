import type {Metadata} from 'next';
import {headers,cookies} from 'next/headers';
import ExperienceProvider from '@/components/hanxw/ExperienceProvider';
import {siteOrigin} from '@/lib/i18n';
import './globals.css';
import './universe.css';
export const metadata:Metadata={metadataBase:new URL(siteOrigin),icons:{icon:'/favicon.svg',apple:'/apple-touch-icon.png'},robots:{index:true,follow:true}};
const init=`try{var t=localStorage.getItem('hanxw-theme');if(t!=='dark'&&t!=='light')t=matchMedia('(prefers-color-scheme:light)').matches?'light':'dark';document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t;document.querySelector('meta[name="theme-color"]').content=t==='dark'?'#050507':'#f2f1f6'}catch(e){}`;
export default async function RootLayout({children}:{children:React.ReactNode}){const h=await headers(),c=await cookies();const locale=h.get('x-hanxw-locale')==='ru'?'ru':'en',theme=c.get('hanxw-theme')?.value==='light'?'light':'dark';return <html lang={locale} data-locale={locale} data-theme={theme} suppressHydrationWarning><head><meta name="theme-color" content={theme==='dark'?'#050507':'#f2f1f6'}/><script dangerouslySetInnerHTML={{__html:init}}/><link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/>{locale==='ru'&&<link rel="preload" href="/fonts/inter-cyrillic.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/>}</head><body><ExperienceProvider initialLocale={locale} initialTheme={theme}>{children}</ExperienceProvider></body></html>}
