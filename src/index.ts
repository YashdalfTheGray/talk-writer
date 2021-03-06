import { promisify } from 'util';
import { resolve } from 'path';
import { exec } from 'child_process';

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
import Homepage from './templates/Homepage';
import { conditionallyWriteFile } from './utils';

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

export async function generate(
  lang: SupportedLanguages,
  root: string,
  overwrite: boolean
) {
  const prettierConfig = new PrettierConfig();
  const webpackConfig = new WebpackConfig();
  const homepage = new Homepage();

  if (lang === 'typescript') {
    const tsConfig = new TsConfig();
    const tslintConfig = new TslintConfig();

    console.log(`Generating ${resolve(root, tsConfig.name)}`);
    await conditionallyWriteFile(
      resolve(root, tsConfig.name),
      tsConfig.withFilesGlob(['./src/**/*.ts']).generate(),
      overwrite
    );

    console.log(`Generating ${resolve(root, tslintConfig.name)}`);
    await conditionallyWriteFile(
      resolve(root, tslintConfig.name),
      tslintConfig.generate(),
      overwrite
    );
  }

  if (lang === 'javascript') {
    const eslintConfig = new EslintConfig();

    console.log(`Generating ${resolve(root, eslintConfig.name)}`);
    await conditionallyWriteFile(
      resolve(root, eslintConfig.name),
      eslintConfig.generate(),
      overwrite
    );
  }

  console.log(`Generating ${resolve(root, prettierConfig.name)}`);
  await conditionallyWriteFile(
    resolve(root, prettierConfig.name),
    prettierConfig.generate(),
    overwrite
  );

  console.log(`Generating ${resolve(root, webpackConfig.name)}`);
  await conditionallyWriteFile(
    resolve(root, webpackConfig.name),
    webpackConfig.withLanguage(lang).generate(),
    overwrite
  );

  console.log(`Generating ${resolve(root, homepage.name)}`);
  await conditionallyWriteFile(
    resolve(root, homepage.name),
    homepage.generate(),
    overwrite
  );
}

export async function runDevServer(configPath: string, hot: boolean) {
  try {
    const child = exec(
      `webpack-dev-server --config ${configPath} ${
        hot ? '--hot' : ''
      } --mode=development --color --progress`
    );
    if (child.stdout) {
      child.stdout.pipe(process.stdout);
    }
    if (child.stderr) {
      child.stderr.pipe(process.stderr);
    }

    child.addListener('exit', (code, signal) => {
      console.log(`Process exited with ${code} via ${signal}.`);
    });

    process.on('SIGINT', function() {
      child.kill('SIGINT');
    });
  } catch (e) {
    console.log('Something went wrong trying to spin up webpack dev server');
    console.error(e);
  }
}
