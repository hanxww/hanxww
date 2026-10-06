import {siteOrigin} from '@/lib/i18n';
import {projects} from '@/lib/projects';
export default function sitemap(){return ['en','ru'].flatMap(locale=>['',...projects.map(p=>`/work/${p.slug}`)].map(path=>({url:`${siteOrigin}/${locale}${path}`,alternates:{languages:{en:`${siteOrigin}/en${path}`,ru:`${siteOrigin}/ru${path}`}}})));}
