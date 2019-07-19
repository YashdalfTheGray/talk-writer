import Template from '../models/Template';

export default class Homepage implements Template {
  private innerTemplate = (title: string) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width initial-scale=1 user-scalable=no" />
  <title>${title}</title>
  <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet">
</head>
<body>
  <div id="root"></div>
  <script src="./dist/bundle.js"></script>
</body>
</html>`;

  private title: string = 'Index';

  public readonly name: string = 'dist/index.html';

  public withTitle(title: string): this {
    this.title = title;
    return this;
  }

  public generate(): string {
    return this.innerTemplate(this.title);
  }
}
