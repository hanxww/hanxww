import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
 title:'Hanxw — Creative Developer', description:'Hanxw is a creative developer building modern web products, interactive experiences and ambitious digital ideas.',
 metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL || (process.env.RAILWAY_PUBLIC_DOMAIN ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}` : 'https://hanxw-digital-experience.iroikanneikann-aeze.chatgpt.site')),
 icons:{icon:[{url:'/favicon.svg'},{url:'/icon-32.png',sizes:'32x32'},{url:'/icon-16.png',sizes:'16x16'}],apple:'/apple-touch-icon.png'},
 openGraph:{title:'Hanxw — Creative Developer',description:'I build digital experiences.',images:['/og.png']},
 twitter:{card:'summary_large_image',title:'Hanxw — Creative Developer',description:'I build digital experiences.',images:['/og.png']}
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><head><link rel="preload" href="/fonts/geist.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/></head><body>{children}</body></html>}
