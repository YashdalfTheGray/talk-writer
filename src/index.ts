import * as webpack from 'webpack';
import merge from 'webpack-merge';

import baseConfig from './baseConfig';

export default function buildTalk(
  incomingConfig: Partial<webpack.Configuration>
) {
  console.log('incoming config');
  console.log(incomingConfig);
  console.log('merged config');
  console.log(merge(baseConfig, incomingConfig));
}
