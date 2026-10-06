'use client';
import Scene from '@/components/hanxw/Scene';
import {Header} from '@/components/hanxw/Shell';
import {useExperience} from '@/components/hanxw/ExperienceProvider';
export default function NotFound(){const{locale,t}=useExperience();return <><Header/><main className="not-found wrap"><div><p className="eyebrow">{t.errors.label}</p><h1>404</h1><h2>{t.errors.headline[0]}<br/>{t.errors.headline[1]}</h2><a href={`/${locale}`} className="primary">{t.errors.home} <span>→</span></a></div><Scene variant="broken"/></main></>}
