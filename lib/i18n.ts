import en from '@/locales/en.json';
import ru from '@/locales/ru.json';
export type Locale = 'en' | 'ru';
export const locales = ['en','ru'] as const;
export const isLocale = (value:string):value is Locale => value==='en'||value==='ru';
export const dictionaries:{en:typeof en;ru:typeof en}={en,ru};
export const siteOrigin=process.env.NEXT_PUBLIC_SITE_URL || 'https://hanxw-web-production-167c.up.railway.app';
export function localizedPath(path:string,locale:Locale){return `/${locale}${path.replace(/^\/(en|ru)(?=\/|$)/,'').replace(/^\/$/,'')}`;}
