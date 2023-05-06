export function CurrentBreakpoint() {
    return <>
        <div id="breakpoint-xs" class="block sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden h-0 w-0"></div>
        <div id="breakpoint-sm" class="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden h-0 w-0"></div>
        <div id="breakpoint-md" class="hidden sm:hidden md:block lg:hidden xl:hidden 2xl:hidden h-0 w-0"></div>
        <div id="breakpoint-lg" class="hidden sm:hidden md:hidden lg:block xl:hidden 2xl:hidden h-0 w-0"></div>
        <div id="breakpoint-xl" class="hidden sm:hidden md:hidden lg:hidden xl:block 2xl:hidden h-0 w-0"></div>
        <div id="breakpoint-2xl" class="hidden sm:hidden md:hidden lg:hidden xl:hidden 2xl:block h-0 w-0"></div>
    </>
}