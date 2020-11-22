import { ApiPromise, WsProvider } from '@polkadot/api';

import { getNominators } from './getNominators';
const NODE_WS_URL = process.env.NODE_WS_URL || 'ws://127.0.0.1:9944';

/// This will become a CLI argument
const VALIDATOR_ID = 'HngUT2inDFPBwiey6ZdqhhnmPKHkXayRpWw9rFj55reAqvi';

async function main(): Promise<void> {
	const api = await ApiPromise.create({
		provider: new WsProvider(NODE_WS_URL),
	});

	// Specifying this function will become a CLI argument
	const nominators = await getNominators(api, VALIDATOR_ID);
	console.log(nominators);

	process.exit();
}

main().catch(console.log);
