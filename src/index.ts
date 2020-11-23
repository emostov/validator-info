#!/usr/bin/env node

import { ApiPromise, WsProvider } from '@polkadot/api';
import chalk from 'chalk';
import clear from 'clear';
import { program } from 'commander';
import figlet from 'figlet';
import path from 'path';

import * as pkg from '../package.json';
import { getNominators } from './getNominators';

const WS_URL = process.env.WS_URL || 'ws://127.0.0.1:9944';

async function main(): Promise<void> {
	const api = await ApiPromise.create({
		provider: new WsProvider(WS_URL),
	});

	prompt();

	program
		.version(pkg.version)
		.description(
			'Description:' +
				'\nA CLI for gathering useful info about validators and their nominators' +
				'\n by Zeke Mostov | github: @emostov' +
				'\nHint: specify node by running `export NODE_WS_URL=<ws url>`'
		)
		.option(
			'-noms, --get-noms-for-validator-id <validatorId>',
			'Retrieve a list of nominators (with their bonded funds) who are targeting <validatorId>'
		)
		.parse();

	console.log(program.getNomsForValidatorId);
	if (program.getNomsForValidatorId) {
		console.log(await getNominators(api, program.getNomsForValidatorId));
	}

	if (!process.argv.slice(2).length) {
		program.outputHelp();
	}

	process.exit();
}

function prompt() {
	clear();
	console.log(
		chalk.blueBright(
			figlet.textSync('Validator Info CLI', {
				horizontalLayout: 'full',
			})
		)
	);
}

main().catch(console.log);
