import { createPortal } from "react-dom"

export function CurrentBreakpoint() {
    if (typeof window == 'undefined') {
        return <></>
    }
    return createPortal(<>
        <div id="breakpoint-xs" class="block sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden w-0 h-0"></div>
        <div id="breakpoint-sm" class="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden w-0 h-0"></div>
        <div id="breakpoint-md" class="hidden sm:hidden md:block lg:hidden xl:hidden 2xl:hidden w-0 h-0"></div>
        <div id="breakpoint-lg" class="hidden sm:hidden md:hidden lg:block xl:hidden 2xl:hidden w-0 h-0"></div>
        <div id="breakpoint-xl" class="hidden sm:hidden md:hidden lg:hidden xl:block 2xl:hidden w-0 h-0"></div>
        <div id="breakpoint-2xl" class="hidden sm:hidden md:hidden lg:hidden xl:hidden 2xl:block w-0 h-0"></div>
    </>, document.body)
}
