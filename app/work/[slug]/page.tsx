import {redirect} from 'next/navigation';
export default async function LegacyCase({params}:{params:Promise<{slug:string}>}){const{slug}=await params;redirect(`/en/work/${slug}`)}
