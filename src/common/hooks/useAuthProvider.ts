import { useAtomValue } from "jotai"
import { authAtom, authProviderAtom } from "@core/atoms/auth"

export function useAuthProvider() {
    return useAtomValue(authProviderAtom)
}

export function useUser() {
    return useAtomValue(authAtom)
}