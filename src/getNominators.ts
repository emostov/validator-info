import { ApiPromise } from '@polkadot/api';
import { AnyJson } from '@polkadot/types/types';

/**
 * Retrieve a list of all accounts that have the given `validatorId` as a nomination target.
 *
 * @param api ApiPromise connected to a node in the relevant network
 * @param validatorId ID of the validator to retrieve the nominators of
 */
export async function getNominators(
	api: ApiPromise,
	validatorId: string
): Promise<AnyJson[]> {
	const entries = await api.query.staking.nominators.entries();
	const nominators = entries
		.filter(
			([_storageKey, optNominations]) =>
				optNominations.isSome &&
				optNominations
					.unwrap()
					.targets.map((accountId) => accountId.toString())
					.includes(validatorId) // only include nominators that target `validatorId`
		)
		.map(([storageKey, _optNominations]) => storageKey) // storageKey === nominatorId
		.flatMap((s) => s.toHuman());

	return nominators;
}
