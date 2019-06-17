import * as webpack from 'webpack';
import { readFile } from 'fs';
import { promisify } from 'util';
import * as yargs from 'yargs';

const readFileAsync = promisify(readFile);

const config = yargs
  .scriptName('talk-writer')
  .usage('$0 [args]')
  .option('config', {
    alias: 'c',
    describe: 'the config file to use'
  })
  .demandOption('config')
  .help().argv;

console.log(config);
