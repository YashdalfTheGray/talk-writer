#! /usr/bin/env node

import * as yargs from 'yargs';
import { Configuration } from 'webpack';

import { buildTalk, generate, runDevServer } from '.';
import SupportedLanguages from './models/SupportedLanguages';

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
      y
        .option('language', {
          alias: 'l',
          describe: 'the language that you want to write the project in',
          demand: true,
          choices: ['typescript', 'ts', 'javascript', 'js'],
          coerce: function(arg: string) {
            if (arg === 'ts') {
              return 'typescript';
            } else if (arg === 'js') {
              return 'javascript';
            } else {
              return arg;
            }
          }
        })
        .option('root', {
          alias: 'r',
          describe: 'the root of the project to generate files in',
          demand: true,
          type: 'string'
        }),
    args => {
      generate(args.language as SupportedLanguages, args.root);
    }
  )
  .command(
    'server',
    'serve the assets out in development mode for testing',
    y =>
      y
        .option('config', {
          alias: 'c',
          describe: 'the config file to use',
          demand: true,
          type: 'string'
        })
        .option('hot', {
          alias: 'h',
          describe: 'enable hot reloading - the app must support it',
          default: true,
          type: 'boolean'
        })
        .demandOption(['config']),
    args => {
      runDevServer(args.config, args.hot);
    }
  )
  .demandCommand()
  .help().argv;
