'use client';
import {createContext,useContext,useState,useEffect,useCallback,ReactNode} from 'react';
import {flushSync} from 'react-dom';
import {dictionaries,Locale,localizedPath} from '@/lib/i18n';
import {localizedProjects} from '@/lib/project-content';
type Theme='dark'|'light';
type Experience={locale:Locale;theme:Theme;t:typeof dictionaries.en;setLocale:(l:Locale)=>void;setTheme:(t:Theme,origin?:{x:number;y:number})=>void};
const Context=createContext<Experience|null>(null);
export const useExperience=()=>{const c=useContext(Context);if(!c)throw Error('Missing ExperienceProvider');return c;};
export default function ExperienceProvider({children,initialLocale,initialTheme}:{children:ReactNode;initialLocale:Locale;initialTheme:Theme}){
 const[locale,updateLocale]=useState(initialLocale),[theme,updateTheme]=useState(initialTheme),[announcement,setAnnouncement]=useState('');
 useEffect(()=>{updateTheme(document.documentElement.dataset.theme==='light'?'light':'dark');},[]);
 const setTheme=useCallback((value:Theme,origin?:{x:number;y:number})=>{
  const apply=()=>{document.documentElement.dataset.theme=value;document.documentElement.style.colorScheme=value;document.querySelector('meta[name="theme-color"]')?.setAttribute('content',value==='dark'?'#050507':'#f2f1f6');updateTheme(value);try{localStorage.setItem('hanxw-theme',value);document.cookie=`hanxw-theme=${value};path=/;max-age=31536000;SameSite=Lax`;}catch{}setAnnouncement(dictionaries[locale].accessibility.themeChanged);};
  const doc=document as Document&{startViewTransition?:(fn:()=>void)=>{ready:Promise<void>;finished:Promise<void>}};
  if(!doc.startViewTransition||matchMedia('(prefers-reduced-motion: reduce)').matches){apply();return;}
  const x=origin?.x??innerWidth-40,y=origin?.y??40,r=Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y));document.documentElement.classList.add('theme-transition');
  const transition=doc.startViewTransition(()=>flushSync(apply));transition.ready.then(()=>{document.documentElement.animate({clipPath:[`circle(0px at ${x}px ${y}px)`,`circle(${r}px at ${x}px ${y}px)`]},{duration:innerWidth<768?550:800,easing:'cubic-bezier(.16,1,.3,1)',pseudoElement:'::view-transition-new(root)'});}).catch(()=>{});transition.finished.finally(()=>document.documentElement.classList.remove('theme-transition'));
 },[locale]);
 const setLocale=useCallback((value:Locale)=>{
  if(value===locale)return;const y=scrollY;document.documentElement.classList.add('locale-transition');updateLocale(value);document.documentElement.lang=value;document.documentElement.dataset.locale=value;
  const url=new URL(location.href);url.pathname=localizedPath(url.pathname,value);history.replaceState(history.state,'',url);try{localStorage.setItem('hanxw-locale',value);document.cookie=`hanxw-locale=${value};path=/;max-age=31536000;SameSite=Lax`;}catch{}
  requestAnimationFrame(()=>{window.scrollTo({top:y,behavior:'instant'});});setTimeout(()=>document.documentElement.classList.remove('locale-transition'),400);setAnnouncement(dictionaries[value].accessibility.langChanged);
 },[locale]);
 useEffect(()=>{const t=dictionaries[locale];document.documentElement.lang=locale;document.documentElement.dataset.locale=locale;const slug=location.pathname.split('/work/')[1];const project=localizedProjects(locale).find(p=>p.slug===slug);const description=project?.caseIntro||t.metadata.description;document.title=project?`${project.title} — HANXW Lab`:t.metadata.title;document.querySelector('meta[name="description"]')?.setAttribute('content',description);for(const name of ['og:title','twitter:title'])document.querySelector(`meta[property="${name}"],meta[name="${name}"]`)?.setAttribute('content',document.title);for(const name of ['og:description','twitter:description'])document.querySelector(`meta[property="${name}"],meta[name="${name}"]`)?.setAttribute('content',description);document.querySelector('link[rel="canonical"]')?.setAttribute('href',location.origin+location.pathname);},[locale]);
 useEffect(()=>{const mq=matchMedia('(prefers-color-scheme: light)');const change=()=>{try{if(!localStorage.getItem('hanxw-theme')){const value=mq.matches?'light':'dark';document.documentElement.dataset.theme=value;document.documentElement.style.colorScheme=value;document.querySelector('meta[name="theme-color"]')?.setAttribute('content',value==='dark'?'#050507':'#f2f1f6');updateTheme(value);}}catch{}};mq.addEventListener('change',change);return()=>mq.removeEventListener('change',change);},[]);
 return <Context.Provider value={{locale,theme,t:dictionaries[locale],setLocale,setTheme}}>{children}<span className="sr-only" aria-live="polite">{announcement}</span></Context.Provider>;
}
export function LanguageSwitcher(){const{locale,setLocale,t}=useExperience();return <div className="language-switch" role="group" aria-label={t.navigation.language}><span className="language-capsule" style={{transform:`translateX(${locale==='en'?'100':'0'}%)`}}/>{(['ru','en']as const).map(l=><button key={l} onClick={()=>setLocale(l)} aria-pressed={locale===l} lang={l}>{l.toUpperCase()}</button>)}</div>}
export function ThemeSwitcher({expanded=false}:{expanded?:boolean}){const{theme,setTheme,t}=useExperience();return expanded?<div className="theme-segment" role="group" aria-label={t.navigation.appearance}>{(['dark','light']as const).map(v=><button key={v} aria-pressed={theme===v} onClick={e=>{const r=e.currentTarget.getBoundingClientRect();setTheme(v,{x:r.x+r.width/2,y:r.y+r.height/2});}}>{t.navigation[v]}</button>)}</div>:<button className="theme-switch" aria-label={theme==='dark'?t.navigation.themeLight:t.navigation.themeDark} aria-pressed={theme==='light'} onClick={e=>{const r=e.currentTarget.getBoundingClientRect();setTheme(theme==='dark'?'light':'dark',{x:r.x+r.width/2,y:r.y+r.height/2});}}><span className="theme-material"/><span className="sr-only">{t.navigation.appearance}</span></button>}
