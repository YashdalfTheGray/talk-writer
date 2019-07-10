import Template from '../models/Template';

export default class TsConfig implements Template {
  private innerTemplate = {
    compilerOptions: {
      outDir: 'dist',
      target: 'esnext',
      module: 'commonjs',
      moduleResolution: 'node',
      isolatedModules: false,
      jsx: 'react',
      experimentalDecorators: true,
      emitDecoratorMetadata: true,
      declaration: true,
      strictFunctionTypes: true,
      strictNullChecks: true,
      noImplicitAny: true,
      noImplicitThis: true,
      alwaysStrict: true,
      removeComments: false,
      esModuleInterop: true,
      noLib: false,
      preserveConstEnums: true,
      suppressImplicitAnyIndexErrors: true
    },
    filesGlob: [] as string[],
    exclude: ['node_modules', 'dist'],
    compileOnSave: false,
    buildOnSave: false,
    atom: {
      rewriteTsconfig: false
    }
  };

  public readonly name: string = 'tsconfig.json';

  public withFilesGlob(filesGlob: string[]): this {
    this.innerTemplate.filesGlob = filesGlob;
    return this;
  }

  public generate(): string {
    return JSON.stringify(this.innerTemplate, null, 2);
  }
}
