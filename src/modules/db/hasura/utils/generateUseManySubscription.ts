import * as gql from "gql-query-builder";

export type MetaQuery = {
    [k: string]: any;
    queryContext?: Omit<Record<string, any>, "meta">;
} & Record<string, any>;


type GenerateUseManySubscriptionParams = {
    resource: string;
    meta: MetaQuery;
    ids?: any[];
};

type GenerateUseManySubscriptionReturnValues = {
    variables: any;
    query: string;
    operation: string;
};

export const generateUseManySubscription = ({
    resource,
    meta,
    ids,
}: GenerateUseManySubscriptionParams): GenerateUseManySubscriptionReturnValues => {
    if (!ids) {
        console.error(
            "[useSubscription]: `ids` is required in `params` for graphql subscriptions",
        );
    }

    const operation = meta.operation ?? resource;

    const { query, variables } = gql.subscription({
        operation,
        fields: meta.fields,
        variables: meta.variables ?? {
            where: {
                type: `${operation}_bool_exp`,
                value: {
                    id: {
                        _in: ids,
                    },
                },
            },
        },
    });

    return { query, variables, operation };
};

/**
 * @deprecated Please use `generateUseManySubscription` instead.
 */
export const genereteUseManySubscription = generateUseManySubscription;
