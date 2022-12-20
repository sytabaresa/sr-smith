
export interface RouterProvider {
    useHistory: () => {
        push: (...args) => any,
        replace: (...args) => any,
        goBack: (...args) => any,
    },

    useLocation: () => {
        pathname: string,
        search: string,
    },
    
    useParams: <Params extends { [K in keyof Params]?: string } = {}>() => Params,

    // Link: React.FC<any>,
    RouterWrapper?: React.FC<any>,
    RouterComponent?: React.FC<any>,
}