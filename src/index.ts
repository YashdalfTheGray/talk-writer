import { promisify } from 'util';
import { resolve } from 'path';
import { writeFile } from 'fs';

import webpack from 'webpack';
import merge from 'webpack-merge';
import chalk from 'chalk';

import baseWebpackConfig from './baseWebpackConfig';
import SupportedLanguages from './models/SupportedLanguages';
import PrettierConfig from './templates/PrettierConfig';
import TsConfig from './templates/TsConfig';
import TslintConfig from './templates/TslintConfig';
import EslintConfig from './templates/EslintConfig';
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
  const writeFileAsync = promisify(writeFile);

  const prettierConfig = new PrettierConfig();
  const webpackConfig = new WebpackConfig();

  if (lang === 'typescript') {
    const tsConfig = new TsConfig();
    const tslintConfig = new TslintConfig();

    console.log(`Generating ${resolve(root, tsConfig.name)}`);
    await writeFileAsync(
      resolve(root, tsConfig.name),
      tsConfig.withFilesGlob(['./src/**/*.ts']).generate(),
      'utf-8'
    );
    console.log('\n');

    console.log(`Generating ${resolve(root, tslintConfig.name)}`);
    await writeFileAsync(
      resolve(root, tslintConfig.name),
      tslintConfig.generate(),
      'utf-8'
    );
    console.log('\n');
  }

  if (lang === 'javascript') {
    const eslintConfig = new EslintConfig();

    console.log(`Generating ${resolve(root, eslintConfig.name)}`);
    await writeFileAsync(
      resolve(root, eslintConfig.name),
      eslintConfig.generate(),
      'utf-8'
    );
    console.log('\n');
  }

  console.log(`Generating ${resolve(root, prettierConfig.name)}`);
  await writeFileAsync(
    resolve(root, prettierConfig.name),
    prettierConfig.generate(),
    'utf-8'
  );
  console.log('\n');

  console.log(`Generating ${resolve(root, webpackConfig.name)}`);
  await writeFileAsync(
    resolve(root, webpackConfig.name),
    webpackConfig.withLanguage(lang).generate(),
    'utf-8'
  );
  console.log('\n');
}
