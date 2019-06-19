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
  .help().argv;

const incomingConfig: Partial<Configuration> = require(options.config);

buildTalk(incomingConfig);
