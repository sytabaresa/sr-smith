import { RxGraphQLReplicationClientState, RxGraphQLReplicationQueryBuilderResponseObject } from "rxdb/dist/types/types";

export const GRAPHQL_REPLICATION_PLUGIN_IDENTITY_PREFIX = 'graphql';

export interface GraphQLError {
    message: string;
    locations: Array<{
        line: number;
        column: number;
    }>;
    path: string[];
}
export type GraphQLErrors = Array<GraphQLError>;


export function ensureNotFalsy<T>(obj: T | false | undefined | null): T {
    if (!obj) {
        throw new Error('ensureNotFalsy() is falsy');
    }
    return obj;
}

export function graphQLRequest(
    httpUrl: string,
    clientState: RxGraphQLReplicationClientState,
    queryParams: RxGraphQLReplicationQueryBuilderResponseObject
) {

    const headers = new Headers(clientState.headers || {});
    headers.append('Content-Type', 'application/json');

    const req = new Request(
        ensureNotFalsy(httpUrl),
        {
            method: 'POST',
            body: JSON.stringify(queryParams),
            headers,
            credentials: clientState.credentials,
        }
    );
    return fetch(req)
        .then((res) => res.json())
        .then((body) => {
            return body;
        });
}