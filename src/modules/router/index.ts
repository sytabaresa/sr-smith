import { RouterProvider } from "./router"
import { navigate } from "vite-plugin-ssr/client/router";
// import { useLocation, Route, Switch } from "wouter"
import { qParams, qStr } from "@utils/common";
import { usePageContext } from "@/renderer/usePageContext";
import { HTMLAttributes } from "react";

export class RouterWrapper implements RouterProvider {

    useHistory() {
        // const [location, navigate] = useLocation();

        return {
            push: (path: string, query: Record<string, string> = {}) => navigate(path + qStr(query)),
            // replace: (path: string, query: Record<string, string> = {}) => navigate(path + qStr(query), { replace: true }),
            replace: (path: string, query: Record<string, string> = {}) => navigate(path + qStr(query), { overwriteLastHistoryEntry: true }),
            goBack: (...args) => {
                if (typeof window != 'undefined') {
                    window.history.back() //TODO: implement
                }
            },
        }
    }

    useLocation() {
        const pageContext = usePageContext()
        // const [location, navigate] = useLocation();
        return {
            // pathname: location,
            pathname: pageContext?.urlPathname,
            search: pageContext?.urlParsed?.searchOriginal,
        };
    }

    useParams() {
        const pageContext = usePageContext()
        return pageContext?.urlParsed?.searchAll as any
    }

    // Link: React.FC<any>,
    // RouterWrapper = Switch
    // RouterComponent = Route
    RouterWrapper = null
    RouterComponent = null
}

export function useRouter() {
    return new RouterWrapper()
}