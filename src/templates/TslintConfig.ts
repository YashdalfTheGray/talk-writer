import Template from '../models/Template';

export default class TslintConfig implements Template {
  private innerTemplate = {
    defaultSeverity: 'error',
    extends: ['tslint:recommended', 'tslint-react', 'tslint-config-prettier'],
    jsRules: {},
    rules: {
      'arrow-parens': [false],
      indent: [true, 'spaces', 2],
      'object-literal-sort-keys': [false],
      'one-line': [true, 'check-open-space', 'check-whitespace'],
      'trailing-comma': [false]
    },
    rulesDirectory: ['tslint-plugin-prettier']
  };

  public readonly name: string = 'tslint.json';

  public generate(): string {
    return JSON.stringify(this.innerTemplate, null, 2);
  }
}
