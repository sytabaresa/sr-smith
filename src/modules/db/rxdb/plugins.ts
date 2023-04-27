import { RxDBUpdatePlugin } from 'rxdb/plugins/update';
import {
    // pullQueryBuilderFromRxSchema,
    // pushQueryBuilderFromRxSchema,
    // pullStreamBuilderFromRxSchema,
    RxGraphQLReplicationState,
    replicateGraphQL
} from 'rxdb/plugins/replication-graphql';
import { addRxPlugin } from 'rxdb';

// import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
// addRxPlugin(RxDBDevModePlugin);
// also create your RxDatabase and RxCollection.

addRxPlugin(RxDBUpdatePlugin);

// TODO import these only in non-production build
async function loadDebugRxdb() {
    const { RxDBDevModePlugin } = await import('rxdb/plugins/dev-mode')
    addRxPlugin(RxDBDevModePlugin);
    // const { wrappedValidateAjvStorage } = await import('rxdb/plugins/validate-ajv')

    // const { RxDBUpdatePlugin } = await import('rxdb/plugins/update')
    // addRxPlugin(RxDBUpdatePlugin);

    const { RxDBQueryBuilderPlugin } = await import('rxdb/plugins/query-builder')
    addRxPlugin(RxDBQueryBuilderPlugin);

    const { RxDBLeaderElectionPlugin } = await import('rxdb/plugins/leader-election')
    addRxPlugin(RxDBLeaderElectionPlugin);
}

if (process.env.NODE_ENV == 'development' && typeof window != 'undefined') {
    loadDebugRxdb()
}
