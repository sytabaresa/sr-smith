import { RouterProvider } from "./router"
import { useLocation, Route } from "wouter"
import { qParams, qStr } from "@utils/common";

export class RouterWrapper implements RouterProvider {

    useHistory() {
        const [location, navigate] = useLocation();

        return {
            push: (path: string, query: Record<string, string> = {}) => navigate(path + qStr(query)),
            replace: (path: string, query: Record<string, string> = {}) => navigate(path + qStr(query), { replace: true }),
            goBack: (...args) => null,
        }
    }

    useLocation() {
        const [location, navigate] = useLocation();

        return {
            pathname: location,
            search: window.location.search,
        };
    }

    useParams() {
        const params = qParams(window.location.search);
        return params as any
    }

    // Link: React.FC<any>,
    RouterWrapper = (props) => props.children
    RouterComponent = Route
}

export function useRouter() {
    return new RouterWrapper()
}