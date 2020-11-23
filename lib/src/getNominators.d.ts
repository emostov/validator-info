import { ApiPromise } from '@polkadot/api';
/**
 * Retrieve a list of all accounts that have the given `validatorId` as a nomination target.
 *
 * @param api ApiPromise connected to a node in the relevant network
 * @param validatorId ID of the validator to retrieve the nominators of
 */
export declare function getNominators(api: ApiPromise, validatorId: string): Promise<any>;
