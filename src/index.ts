import { promisify } from 'util';

import webpack from 'webpack';
import merge from 'webpack-merge';
import chalk from 'chalk';

import baseConfig from './baseConfig';

export default async function buildTalk(
  incomingConfig: Partial<webpack.Configuration>,
  configPath: string,
  development: boolean
) {
  const fullConfig = merge(
    baseConfig,
    incomingConfig,
    development ? {} : { mode: 'production' }
  );
  console.log(`using config from ${chalk.green(configPath)}`);

  const compiler = webpack(fullConfig);
  const runAsync = promisify(compiler.run);
  const runAsyncBound: typeof runAsync = runAsync.bind(compiler);
  const stats = await runAsyncBound();

  console.log(stats.toString());
}
