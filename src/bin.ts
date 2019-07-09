#! /usr/bin/env node

import * as yargs from 'yargs';
import { Configuration } from 'webpack';

import buildTalk from '.';

yargs
  .command(
    'build',
    'build the application assets',
    y =>
      y
        .option('config', {
          alias: 'c',
          describe: 'the config file to use',
          demand: true,
          type: 'string'
        })
        .option('production', {
          alias: 'p',
          describe: 'whether to run Webpack in production mode or not',
          default: false,
          type: 'boolean'
        })
        .demandOption(['config']),
    args => {
      const incomingConfig: Partial<Configuration> = require(args.config);
      buildTalk(incomingConfig, args.config, args.production);
    }
  )
  .command(
    'generate',
    'generate the minimal required boilerplate',
    y =>
      y.option('language', {
        alias: 'l',
        describe: 'the language that you want to write the project in',
        demand: true,
        choices: ['typescript', 'ts', 'javascript', 'js']
      }),
    args => console.log(args)
  )
  .demandCommand()
  .help().argv;
