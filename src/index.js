import program from 'commander';
import fs from 'fs';
import path from 'path';
import logWith from 'log-with';
import Representation from 'representation';
import ConfigReader from 'representation-tool-file-reader';
import pkg from '../package.json';

const logger = logWith(module);

program
  .version(pkg.version)
  .option('-c, --config [path]', 'Set config path. defaults to ./config.yml')
  .option('-l, --log', 'Log everything')
  .parse(process.argv);

if (program.log) {
  logger.level = 'debug';
}
const ls = (folder) => {
  const dir = path.resolve(process.cwd(), folder);
  logger.debug('Listing files');
  fs.readdirSync(dir).forEach((file) => {
    logger.debug(`${folder}/${file}`);
  });
};

logger.debug('Starting to build');
const env = process.env;
const config = ConfigReader.read(program.config, env);
const representation = new Representation(config);
logger.debug('Building');
representation.build()
  .then(() => {
    ls(config.folder);
    logger.debug('Done');
  });