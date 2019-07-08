#! /usr/bin/env node

import * as yargs from 'yargs';
import { Configuration } from 'webpack';

import buildTalk from '.';

yargs
  .command(
    ['build', '$0'],
    'build the application assets',
    y =>
      y
        .option('config', {
          alias: 'c',
          describe: 'the config file to use',
          demand: true,
          type: 'string'
        })
        .option('development', {
          alias: 'dev',
          describe: 'whether to run Webpack in development mode or not',
          demand: true,
          type: 'boolean'
        }),
    args => {
      const incomingConfig: Partial<Configuration> = require(args.config);
      buildTalk(incomingConfig, args.config, args.development);
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
  .help();
