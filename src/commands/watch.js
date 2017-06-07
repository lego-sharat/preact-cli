import asyncCommand from '../lib/async-command';
import webpackConfig from '../lib/webpack-config';
import transformConfig from '../lib/transform-config';
import runWebpack, { showStats } from '../lib/run-webpack';

export default asyncCommand({
	command: 'watch [src]',

	desc: 'Start a development live-reload server.',

	builder: {
		src: {
			description: 'Entry file (index.js)',
			default: 'src'
		},
		port: {
			description: 'Port to start a server on',
			default: '8080',
			alias: 'p'
		},
		host: {
			description: 'Hostname to start a server on',
			default: '0.0.0.0',
			alias: 'h'
		},
		https: {
			description: 'Use HTTPS?',
			type: 'boolean',
			default: false
		},
		prerender: {
			description: 'Pre-render static app content on initial build',
			default: false
		},
		config: {
			description: 'Path to custom preact.config.js',
			alias: 'c'
		}
	},

	async handler(argv) {
		argv.production = false;
		let config = webpackConfig(argv);
		await transformConfig(argv, config);

		let stats = await runWebpack(true, config, showStats);
		showStats(stats);
	}
});
