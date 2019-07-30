# talk-writer

The base boilerplate code that runs the talks repository. This comes fairly "batteries included" so that it can be installed and start compiling things right away.

## Installation

This is vended as an NPM package so you can just run a `npm install talk-writer` and get all the code necessary.

## Running

There are a couple of modes to run this tool. They're documented below.

### Generation

There are some files that we need to generate in the repository first before we can start compiling. You can generate files for either Typescript or Javascript by running `talk-writer generate`. The flags that it takes are listed below.

#### `--language`

For Typescript, run `talk-writer init --language ts --root $(pwd)` and for Javascript, run `talk-writer init --language js --root $(pwd)`. You can also abbreviate the `--language` flag as `-l`. `typescript` and `ts`, and `javascript` and `js` are equivalent and will produce the aame results.

#### `--root`

Passing in the `--root` flag tells us where to put the files and is required. Generally, `$(pwd)` in your project root is the best place to put them.

#### `--overwrite`

Use this flag when the files that this package will generate already exist but you want this package to overwrite them with the defaults. You can find the default file templates in the `src/templates` directory.

### Building

You can use this package to build a talk or any kind of Javascript application using `talk-writer build`. This subcoomand takes a few flags that are of interest.

#### `--config`

The partial Webpack config file to use to build the application. One is already generated for you by the generation subcommand which can just be used.

#### `--production`

The default is to generate development builds through Webpack. You can use this flag to tell `talk-writer` to output production builds instead.

### Dev server

You can use the `talk-writer server` subcommand to spin up a dev server with hot module reloading so that you can see your changes as you're developing your application.

#### `--config`

The partial Webpack config file to use to build the application. One is already generated for you by the generation subcommand which can just be used.

#### `--hot`

Whether to enable hot module reloading or not. The application being built must be configured correctly for this option to work.
