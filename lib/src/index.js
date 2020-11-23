#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("@polkadot/api");
const chalk_1 = __importDefault(require("chalk"));
const clear_1 = __importDefault(require("clear"));
const commander_1 = require("commander");
const figlet_1 = __importDefault(require("figlet"));
const pkg = __importStar(require("../package.json"));
const getNominators_1 = require("./getNominators");
const WS_URL = process.env.WS_URL || 'ws://127.0.0.1:9944';
/// This will become a CLI argument
const VALIDATOR_ID = 'HngUT2inDFPBwiey6ZdqhhnmPKHkXayRpWw9rFj55reAqvi';
async function main() {
    const api = await api_1.ApiPromise.create({
        provider: new api_1.WsProvider(WS_URL),
    });
    prompt();
    commander_1.program
        .version(pkg.version)
        .description('Description:' +
        '\nA CLI for gathering useful info about validators and their nominators' +
        '\n by Zeke Mostov | github: @emostov' +
        '\nHint: specify node by running `export NODE_WS_URL=<ws url>`')
        .option('-noms, --get-noms-for-validator-id <validatorId>', 'Retrieve a list of nominators (with their bonded funds) who are targeting <validatorId>')
        .parse();
    console.log(commander_1.program.getNomsForValidatorId);
    if (commander_1.program.getNomsForValidatorId) {
        console.log(await getNominators_1.getNominators(api, commander_1.program.getNomsForValidatorId));
    }
    if (!process.argv.slice(2).length) {
        commander_1.program.outputHelp();
    }
    process.exit();
}
function prompt() {
    clear_1.default();
    console.log(chalk_1.default.blueBright(figlet_1.default.textSync('Validator Info CLI', {
        horizontalLayout: 'full',
    })));
}
main().catch(console.log);
//# sourceMappingURL=index.js.map