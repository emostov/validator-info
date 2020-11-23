"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNominators = void 0;
const bn_js_1 = __importDefault(require("bn.js"));
/**
 * Retrieve a list of all accounts that have the given `validatorId` as a nomination target.
 *
 * @param api ApiPromise connected to a node in the relevant network
 * @param validatorId ID of the validator to retrieve the nominators of
 */
async function getNominators(api, validatorId
// ): Promise<NominatingValidator> {
) {
    const [ledgerEntries, nominatorsEntries] = await Promise.all([
        await api.query.staking.ledger.entries(),
        await api.query.staking.nominators.entries(),
    ]);
    const nominators = nominatorsEntries
        .filter(([_storageKey, optNominations]) => optNominations.isSome &&
        optNominations
            .unwrap()
            .targets.map((accountId) => accountId.toString())
            .includes(validatorId) // only include nominators that target `validatorId`
    )
        .map(([storageKey, _optNominations]) => {
        const nominatorId = storageKey.args[0];
        const keyAndLedgerOrUndefined = ledgerEntries.find(
        // The Ledger map is keyed by controller address, so we iterate through the ledgers and
        // identify the correct one by stash property
        ([_storageKey, optStakingLedger]) => optStakingLedger.isSome &&
            optStakingLedger.unwrap().stash.toHex() === nominatorId.toHex());
        const active = keyAndLedgerOrUndefined
            ? keyAndLedgerOrUndefined[1].unwrap().active.unwrap().toString(10)
            : undefined;
        return {
            nominatorId: nominatorId.toString(),
            active,
        };
    });
    const nominatorsActiveSum = nominators
        .reduce((sum, curr) => curr.active ? sum.add(new bn_js_1.default(curr.active)) : sum, new bn_js_1.default(0))
        .toString(10);
    return {
        nominators,
        nominatorsActiveSum,
    };
}
exports.getNominators = getNominators;
//# sourceMappingURL=getNominators.js.map