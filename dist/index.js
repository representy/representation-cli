'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _logWith = require('log-with');

var _logWith2 = _interopRequireDefault(_logWith);

var _representation = require('representation');

var _representation2 = _interopRequireDefault(_representation);

var _representationToolFileReader = require('representation-tool-file-reader');

var _representationToolFileReader2 = _interopRequireDefault(_representationToolFileReader);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const logger = (0, _logWith2.default)(module);

_commander2.default.version(_package2.default.version).option('-c, --config [path]', 'Set config path. defaults to ./config.yml').option('-l, --log', 'Log everything').parse(process.argv);

if (_commander2.default.log) {
  logger.level = 'debug';
}
const ls = folder => {
  const dir = _path2.default.resolve(process.cwd(), folder);
  logger.debug('Listing files');
  _fs2.default.readdirSync(dir).forEach(file => {
    logger.debug(`${folder}/${file}`);
  });
};

logger.debug('Starting to build');
const env = process.env;
const config = _representationToolFileReader2.default.read(_commander2.default.config, env);
const representation = new _representation2.default(config);
logger.debug('Building');
representation.build().then(() => {
  ls(config.folder);
  logger.debug('Done');
});