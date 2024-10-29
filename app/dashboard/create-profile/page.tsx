"use client"

import config from '@/config';
import { useUser } from '@clerk/nextjs'

export default function Settings() {
    let user = null;

    if (config?.auth?.enabled) {
        user = useUser();
    }

    return (
        <div className='flex justify-start items-center flex-wrap px-4 pt-5 gap-4'>
            PLaceholder: Hello World!
        </div>
    )
}
