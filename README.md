# talk-writer

The base boilerplate code that runs the talks repository. This comes fairly "batteries included" so that it can be installed and start compiling things right away.

## Installation

This is vended as an NPM package so you can just run a `npm install talk-writer` and get all the code necessary.

## Running

There are a couple of modes to run this tool. They're documented below.

### Generation

There are some files that we need to generate in the repository first before we can start compiling. You can generate files for either Typescript or Javascript by running the commands below.

For Typescript, run `talk-writer init --language ts` and for Javascript, run `talk-writer init --language js`. You can also abbreviate the `--language` flag as `-l`.

### Building

You can use this package to build a talk or any kind of Javascript application using `talk-writer build`. This subcoomand takes a couple of flags that are of interest.

#### `--config`

The partial Webpack config file to use to build the application. One is already generated for you by the generation subcommand which can just be used.

#### `--production`

The default is to generate development builds through Webpack. You can use this flag to tell `talk-writer` to output production builds instead.

### Dev server

You can use the `talk-writer dev-server` subcommand to spin up a dev server with hot module reloading so that you can see your changes as you're developing your application.
