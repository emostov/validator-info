import { ApiPromise } from '@polkadot/api';
import BN from 'bn.js';

interface NominatorActive {
	nominatorId: string;
	active: string | undefined;
}

interface NominatingValidator {
	nominators: NominatorActive[];
	nominatorsActiveSum: string;
}

/**
 * Retrieve a list of all accounts that have the given `validatorId` as a nomination target.
 *
 * @param api ApiPromise connected to a node in the relevant network
 * @param validatorId ID of the validator to retrieve the nominators of
 */
export async function getNominators(
	api: ApiPromise,
	validatorId: string
): Promise<NominatingValidator> {
	const ledgerEntries = await api.query.staking.ledger.entries();
	const nominatorsEntries = await api.query.staking.nominators.entries();

	const nominators = nominatorsEntries
		.filter(
			([_storageKey, optNominations]) =>
				optNominations.isSome &&
				optNominations
					.unwrap()
					.targets.map((accountId) => accountId.toString())
					.includes(validatorId) // only include nominators that target `validatorId`
		)
		.map(([storageKey, _optNominations]) => {
			const nominatorId = storageKey.args[0];
			const ledgerOrUndefined = ledgerEntries.find(
				// The Ledger map is keyed by controller address, so we iterate through the ledgers and
				// identify the correct one by stash property
				([_storageKey, optStakingLedger]) =>
					optStakingLedger.isSome &&
					optStakingLedger.unwrap().stash.toHex() === nominatorId.toHex()
			);

			const active = ledgerOrUndefined
				? ledgerOrUndefined[1].unwrap().active.unwrap().toString(10)
				: undefined;

			return {
				nominatorId: nominatorId.toString(),
				active,
			};
		});

	const nominatorsActiveSum = nominators
		.reduce(
			(sum: BN, curr: NominatorActive) =>
				curr.active ? sum.add(new BN(curr.active)) : sum,
			new BN(0)
		)
		.toString(10);

	return {
		nominators,
		nominatorsActiveSum,
	};
}
