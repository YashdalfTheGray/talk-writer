import { promisify } from 'util';
import { resolve } from 'path';

import webpack from 'webpack';
import merge from 'webpack-merge';
import chalk from 'chalk';

import baseWebpackConfig from './baseWebpackConfig';
import SupportedLanguages from './models/SupportedLanguages';
import PrettierConfig from './templates/PrettierConfig';
import TsConfig from './templates/TsConfig';
import TslintConfig from './templates/TslintConfig';
import WebpackConfig from './templates/WebpackConfig';

export async function buildTalk(
  incomingConfig: Partial<webpack.Configuration>,
  configPath: string,
  production: boolean
) {
  const fullConfig = merge(baseWebpackConfig, incomingConfig, {
    mode: production ? 'production' : 'development'
  });
  console.log(`using config from ${chalk.green(configPath)}`);

  const compiler = webpack(fullConfig);
  const runAsync = promisify(compiler.run);
  const runAsyncBound: typeof runAsync = runAsync.bind(compiler);
  const stats = await runAsyncBound();

  console.log(stats.toString());
}

export async function generate(lang: SupportedLanguages, root: string) {
  const prettierConfig = new PrettierConfig();
  const tsConfig = new TsConfig();
  const tslintConfig = new TslintConfig();
  const webpackConfig = new WebpackConfig();

  if (lang === 'typescript') {
    console.log(`Generating ${resolve(root, tsConfig.name)}`);
    console.log(tsConfig.withFilesGlob(['./src/**/*.ts']).generate());
    console.log('\n');

    console.log(`Generating ${resolve(root, tslintConfig.name)}`);
    console.log(tslintConfig.generate());
    console.log('\n');
  }

  console.log(`Generating ${resolve(root, prettierConfig.name)}`);
  console.log(prettierConfig.generate());
  console.log('\n');

  console.log(`Generating ${resolve(root, webpackConfig.name)}`);
  console.log(webpackConfig.withLanguage(lang).generate());
  console.log('\n');
}
