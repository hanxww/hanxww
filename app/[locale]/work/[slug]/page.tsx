import {notFound} from 'next/navigation';
import {isLocale,dictionaries,siteOrigin} from '@/lib/i18n';
import {localizedProjects} from '@/lib/project-content';
import CaseStudy from '@/components/hanxw/CaseStudy';
export async function generateMetadata({params}:{params:Promise<{locale:string;slug:string}>}){const{locale,slug}=await params;if(!isLocale(locale))return{};const p=localizedProjects(locale).find(p=>p.slug===slug);if(!p)return{};return{title:`${p.title} — HANXW Lab`,description:p.caseIntro,alternates:{canonical:`/${locale}/work/${slug}`,languages:{en:`/en/work/${slug}`,ru:`/ru/work/${slug}`}},openGraph:{title:`${p.title} — HANXW Lab`,description:p.caseIntro,locale:locale==='ru'?'ru_RU':'en_US',url:`${siteOrigin}/${locale}/work/${slug}`,images:['/og.png']}};}
export default async function Page({params}:{params:Promise<{locale:string;slug:string}>}){const{locale,slug}=await params;if(!isLocale(locale)||!localizedProjects(locale).some(p=>p.slug===slug))notFound();return <CaseStudy slug={slug}/>;}
