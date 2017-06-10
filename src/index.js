import program from 'commander';
import Representation from 'representation';
import reader from 'representation-tool-file-reader';
import logWith from 'log-with';
import pkg from '../package.json';

const logger = logWith(module);

program
  .version(pkg.version)
  .option('-c, --config [path]', 'Set config path. defaults to ./config.yml', './config.yml')
  .option('-d, --debug', 'Log everything')
  .parse(process.argv);

if (program.debug) {
  logger.level = 'debug';
}
logger.debug('Starting to build');
const env = process.env;
const config = reader(program.config, env);
const representation = new Representation(config);
logger.debug('Building');
representation.build()
  .then(() => {
    logger.debug('Done');
  });
