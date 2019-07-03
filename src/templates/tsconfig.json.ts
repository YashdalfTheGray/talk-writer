const tsconfig = {
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
  compileOnSave: false,
  buildOnSave: false,
  atom: {
    rewriteTsconfig: false
  }
};

export default {
  name: 'tsconfig.json',
  content: JSON.stringify(tsconfig, null, 2)
};
