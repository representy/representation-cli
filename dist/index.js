'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _representation = require('representation');

var _representation2 = _interopRequireDefault(_representation);

var _representationToolFileReader = require('representation-tool-file-reader');

var _representationToolFileReader2 = _interopRequireDefault(_representationToolFileReader);

var _logWith = require('log-with');

var _logWith2 = _interopRequireDefault(_logWith);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const logger = (0, _logWith2.default)(module);

_commander2.default.version(_package2.default.version).option('-c, --config [path]', 'Set config path. defaults to ./config.yml', './config.yml').option('-d, --debug', 'Log everything').parse(process.argv);

if (_commander2.default.debug) {
  logger.level = 'debug';
}
logger.debug('Starting to build');
const env = process.env;
const config = (0, _representationToolFileReader2.default)(_commander2.default.config, env);
const representation = new _representation2.default(config);
logger.debug('Building');
representation.build().then(() => {
  logger.debug('Done');
});