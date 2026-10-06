import Portfolio from '@/components/hanxw/Portfolio';
import {dictionaries,isLocale} from '@/lib/i18n';
import {notFound} from 'next/navigation';
export async function generateMetadata({params}:{params:Promise<{locale:string}>}){const{locale}=await params;if(!isLocale(locale))notFound();const d=dictionaries[locale].metadata;return{title:d.title,description:d.description,alternates:{canonical:`/${locale}`,languages:{en:'/en',ru:'/ru','x-default':'/'}},openGraph:{title:d.title,description:d.description,locale:locale==='ru'?'ru_RU':'en_US',images:['/og.png']},twitter:{card:'summary_large_image',title:d.title,description:d.description,images:['/og.png']}};}
export default async function Home({params}:{params:Promise<{locale:string}>}){const{locale}=await params;if(!isLocale(locale))notFound();return <Portfolio/>}
