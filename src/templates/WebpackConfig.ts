import Template from '../models/Template';
import SupportedLanguages from '../models/SupportedLanguages';

type TemplateOptions = {
  ext: string;
};

export default class WebpackConfig implements Template {
  private innerTemplate = (
    options: TemplateOptions
  ) => `const { resolve } = require('path');

module.exports = {
  entry: [resolve(__dirname, './index.${options.ext}')],
  output: {
    path: resolve(__dirname, './dist')
  },
  devServer: {
    contentBase: resolve(__dirname, './dist')
  }
};`;

  private lang: SupportedLanguages;

  public readonly name: string = 'webpack.config.js';

  public withLanguage(lang: SupportedLanguages): this {
    this.lang = lang;
    return this;
  }

  public generate(): string {
    return this.innerTemplate({
      ext: this.lang === 'typescript' ? 'tsx' : 'jsx'
    });
  }
}
