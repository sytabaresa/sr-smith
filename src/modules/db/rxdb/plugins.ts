import { RxDBUpdatePlugin } from 'rxdb/plugins/update';
import { addRxPlugin } from 'rxdb';

// migration
import { RxDBMigrationPlugin } from 'rxdb/plugins/migration';
addRxPlugin(RxDBMigrationPlugin);

addRxPlugin(RxDBUpdatePlugin);

async function loadDebugRxdb() {
    const { RxDBDevModePlugin } = await import('rxdb/plugins/dev-mode')
    addRxPlugin(RxDBDevModePlugin);

    // const { wrappedValidateAjvStorage } = await import('rxdb/plugins/validate-ajv')

    // for chained query methods
    // const { RxDBQueryBuilderPlugin } = await import('rxdb/plugins/query-builder')
    // addRxPlugin(RxDBQueryBuilderPlugin);

    // for multiple taps
    //     const { RxDBLeaderElectionPlugin } = await import('rxdb/plugins/leader-election')
    //     addRxPlugin(RxDBLeaderElectionPlugin);
}

if (process.env.NODE_ENV == 'development' && typeof window != 'undefined') {
    loadDebugRxdb()
}
