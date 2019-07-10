import Template from '../models/Template';

export default class PrettierConfig implements Template {
  private innerTemplate = {
    singleQuote: true,
    jsxBracketSameLine: true
  };

  public readonly name: string = '.prettierrc';

  public generate(): string {
    return JSON.stringify(this.innerTemplate, null, 2);
  }
}
