import Template from '../models/Template';

export default class EslintConfig implements Template {
  private innerTemplate = {
    extends: ['airbnb-base', 'plugin:prettier/recommended'],
    plugins: ['import'],
    rules: {
      'class-methods-use-this': ['off'],
      'comma-dangle': ['error', 'never'],
      'linebreak-style': ['off'],
      'max-len': ['warn', 160],
      'object-shorthand': ['error', 'consistent-as-needed']
    }
  };

  public readonly name: string = '.eslintrc.json';

  public generate(): string {
    return JSON.stringify(this.innerTemplate, null, 2);
  }
}
