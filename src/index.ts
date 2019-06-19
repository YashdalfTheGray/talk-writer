import * as webpack from 'webpack';

export default function buildTalk(
  incomingConfig: Partial<webpack.Configuration>
) {
  console.log(incomingConfig);
}
