#! /usr/bin/env node

import * as yargs from 'yargs';
import { Configuration } from 'webpack';

import buildTalk from '.';

const options = yargs
  .scriptName('talk-writer')
  .usage('$0 [args]')
  .option('config', {
    alias: 'c',
    describe: 'the config file to use',
    demand: true,
    string: true
  })
  .option('development', {
    alias: 'dev',
    describe: 'whether to run Webpack in development mode or not',
    demand: true,
    boolean: true
  })
  .help().argv;

const incomingConfig: Partial<Configuration> = require(options.config);

buildTalk(incomingConfig, options.config, options.development);
