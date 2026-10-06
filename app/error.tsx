'use client';
import {useExperience} from '@/components/hanxw/ExperienceProvider';
export default function ErrorPage({reset}:{reset:()=>void}){const{t,locale}=useExperience();return <main className="not-found wrap"><div><p className="eyebrow">HANXW / SYSTEM</p><h1>↯</h1><h2>{t.errors.failed}</h2><button className="primary" onClick={reset}>{t.errors.retry} ↻</button><a className="case-back" href={`/${locale}`}>{t.errors.home} →</a></div></main>}
