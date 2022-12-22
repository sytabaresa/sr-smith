import { useEffect, useState } from "react"
import { useConfig } from "./useConfig"

export function useTranslation() {
    return { t }
}

export function useLanguageQuery() {
    const [lang] = useConfig<string>('lang')
    return [{ lang }]
}

function t(str: string) {
    return str
}