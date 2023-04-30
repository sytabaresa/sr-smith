import { useEffect, useMemo, useState } from "react";

export const useScreen = (reactive = false) => {
    // const tailwindData = { screens: null }
    // console.log(tailwindData)
    const [screen, setScreen] = useState(getCurrentBreakpoint())
    useEffect(() => {
        if (reactive && typeof window != 'undefined')
            window.addEventListener('resize', () => setScreen(getCurrentBreakpoint()));

    }, [])


    return useMemo(() => screen, [screen])
}

export const getCurrentBreakpoint = (): string => {
    if (typeof window != 'undefined') {
        const breakpointUnknown: string = 'unknown';
        const breakpointXS: string | null = document.getElementById('breakpoint-xs')?.offsetParent === null ? null : 'xs';
        const breakpointSM: string | null = document.getElementById('breakpoint-sm')?.offsetParent === null ? null : 'sm';
        const breakpointMD: string | null = document.getElementById('breakpoint-md')?.offsetParent === null ? null : 'md';
        const breakpointLG: string | null = document.getElementById('breakpoint-lg')?.offsetParent === null ? null : 'lg';
        const breakpointXL: string | null = document.getElementById('breakpoint-xl')?.offsetParent === null ? null : 'xl';
        const breakpoint2XL: string | null = document.getElementById('breakpoint-2xl')?.offsetParent === null ? null : '2xl';
        const breakpoint = breakpointXS ?? breakpointSM ?? breakpointMD ?? breakpointLG ?? breakpointXL ?? breakpoint2XL ?? breakpointUnknown;
        return breakpoint;
    } else {
        return 'xs'
    }
};

export function CurrentBreakpoint() {
    return <>
        <div id="breakpoint-xs" class="block sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden w-0 h-0"></div>
        <div id="breakpoint-sm" class="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden w-0 h-0"></div>
        <div id="breakpoint-md" class="hidden sm:hidden md:block lg:hidden xl:hidden 2xl:hidden w-0 h-0"></div>
        <div id="breakpoint-lg" class="hidden sm:hidden md:hidden lg:block xl:hidden 2xl:hidden w-0 h-0"></div>
        <div id="breakpoint-xl" class="hidden sm:hidden md:hidden lg:hidden xl:block 2xl:hidden w-0 h-0"></div>
        <div id="breakpoint-2xl" class="hidden sm:hidden md:hidden lg:hidden xl:hidden 2xl:block w-0 h-0"></div>
    </>
}

export const isMobile = (s: string) => ['xs', 'sm'].includes(s)

export const isDesktop = (s: string) => ['lg', 'xl', '2xl'].includes(s)