"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("regenerator-runtime/runtime.js");

var Sphinx = _interopRequireWildcard(require("sphinx-bot"));

var fetch = _interopRequireWildcard(require("node-fetch"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var msg_types = Sphinx.MSG_TYPE;

require('dotenv').config();

var redis = require('redis');

var storage = redis.createClient(process.env.REDISCLOUD_URL, {
  no_ready_check: true
});
var initted = false;
console.log("bot connected");
/*
// SPHINX_TOKEN contains id,secret,and url
// message.channel.send sends to the url the data
*/

var sphinxToken = process.env.SPHINX_TOKEN; //ON INSTALL:
//get tribe ID
//plug tribe ID into https://tribes.sphinx.chat/tribes/ID
//await fetch() from above url
//pull feed_url from above url
//plug feed_url into https://tribes.sphinx.chat/podcast?url=FEED_URL
//pull "episodes" array, first object, id: number
//store epidode ID number in object with storage.set(TRIBE_UUID, LATEST_EPISODE_ID)
//send install message

function init() {
  if (initted) return;
  initted = true;
  console.log("Bot Connected");
  var client = new Sphinx.Client();
  client.login(sphinxToken);
  client.on(msg_types.INSTALL, /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(message) {
      var embed;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              embed = new Sphinx.MessageEmbed().setAuthor('PodBot').setDescription('Welcome to Pod Bot!').setThumbnail(botSVG);
              message.channel.send({
                embed: embed
              });

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
  client.on(msg_types.MESSAGE, /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(message) {
      var arr, cmd, response, isAdmin, tribeId, episodeData, embed2, embed3;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              arr = message.content.split(' ');

              if (!(arr.length < 2)) {
                _context2.next = 3;
                break;
              }

              return _context2.abrupt("return");

            case 3:
              if (!(arr[0] !== '/pod')) {
                _context2.next = 5;
                break;
              }

              return _context2.abrupt("return");

            case 5:
              cmd = arr[1];
              _context2.t0 = cmd;
              _context2.next = _context2.t0 === 'watch' ? 9 : 23;
              break;

            case 9:
              console.log("=> watch");
              response = 'PodBot will notify your tribe when a new episode is released';
              isAdmin = message.member.roles.find(function (role) {
                return role.name === 'Admin';
              });
              console.log('=> IS ADMIN?', isAdmin);

              if (isAdmin) {
                _context2.next = 15;
                break;
              }

              return _context2.abrupt("return");

            case 15:
              tribeId = message.channel.id;
              _context2.next = 18;
              return getLatestEpisode(tribeId);

            case 18:
              episodeData = _context2.sent;

              if (episodeData && episodeData.id) {
                joinPodWatch(tribeId, episodeId);
              } else {
                response = 'There is no podcast associated with this tribe';
              }

              embed2 = new Sphinx.MessageEmbed().setAuthor('PodBot').setTitle('Status:').setDescription(response).setThumbnail(botSVG);
              message.channel.send({
                embed: embed2
              });
              return _context2.abrupt("return");

            case 23:
              embed3 = new Sphinx.MessageEmbed().setAuthor('PodBot').setTitle('PodBot Commands:').addFields([{
                name: 'Watch for new episodes',
                value: '/pod watch'
              }, {
                name: 'Help',
                value: '/pod help'
              }]).setThumbnail(botSVG);
              message.channel.send({
                embed: embed3
              });
              return _context2.abrupt("return");

            case 26:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }());
}

var botSVG = "<svg viewBox=\"64 64 896 896\" height=\"12\" width=\"12\" fill=\"white\">\n  <path d=\"M300 328a60 60 0 10120 0 60 60 0 10-120 0zM852 64H172c-17.7 0-32 14.3-32 32v660c0 17.7 14.3 32 32 32h680c17.7 0 32-14.3 32-32V96c0-17.7-14.3-32-32-32zm-32 660H204V128h616v596zM604 328a60 60 0 10120 0 60 60 0 10-120 0zm250.2 556H169.8c-16.5 0-29.8 14.3-29.8 32v36c0 4.4 3.3 8 7.4 8h729.1c4.1 0 7.4-3.6 7.4-8v-36c.1-17.7-13.2-32-29.7-32zM664 508H360c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h304c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z\" />\n</svg>";
init();
setInterval(function () {
  client.keys('*', function (err, keys) {
    if (err) return console.log(err);
    asyncForEach(keys, checkForLatest);
  });
}, 300000);

function getLatestEpisode(_x3) {
  return _getLatestEpisode.apply(this, arguments);
}

function _getLatestEpisode() {
  _getLatestEpisode = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(tribeId) {
    var r, tribeData, r2, feedData;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return fetch("https://tribes.sphinx.chat/tribes/".concat(tribeId));

          case 3:
            r = _context4.sent;
            _context4.next = 6;
            return r.json();

          case 6:
            tribeData = _context4.sent;

            if (!(tribeData && tribeData.feed_url)) {
              _context4.next = 16;
              break;
            }

            _context4.next = 10;
            return fetch("https://tribes.sphinx.chat/podcast?url=".concat(value));

          case 10:
            r2 = _context4.sent;
            _context4.next = 13;
            return r2.json();

          case 13:
            feedData = _context4.sent;

            if (!(feedData && feedData.episodes && feedData.episodes[0])) {
              _context4.next = 16;
              break;
            }

            return _context4.abrupt("return", feedData.episodes[0]);

          case 16:
            _context4.next = 21;
            break;

          case 18:
            _context4.prev = 18;
            _context4.t0 = _context4["catch"](0);
            console.log('error');

          case 21:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 18]]);
  }));
  return _getLatestEpisode.apply(this, arguments);
}

function joinPodWatch(tribeId, episodeId) {
  storage.set(tribeId, episodeId);
}

function asyncForEach(_x4, _x5) {
  return _asyncForEach.apply(this, arguments);
}

function _asyncForEach() {
  _asyncForEach = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(array, callback) {
    var index;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            index = 0;

          case 1:
            if (!(index < array.length)) {
              _context5.next = 7;
              break;
            }

            _context5.next = 4;
            return callback(array[index], index, array);

          case 4:
            index++;
            _context5.next = 1;
            break;

          case 7:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _asyncForEach.apply(this, arguments);
}

function checkForLatest(key, index, keys) {
  if (key.length !== 92) return;
  storage.get(key, /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(err, storedId) {
      var episodeData, relevantChannel, embed;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(storedId.length !== 10)) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt("return");

            case 2:
              _context3.next = 4;
              return getLatestEpisode(key);

            case 4:
              episodeData = _context3.sent;

              if (episodeData && episodeData.id) {
                _context3.next = 7;
                break;
              }

              return _context3.abrupt("return");

            case 7:
              if (!(storedId === episodeData.id)) {
                _context3.next = 9;
                break;
              }

              return _context3.abrupt("return");

            case 9:
              storage.set(key, episodeData.id);
              relevantChannel = client.channels.cache.get(key);

              if (relevantChannel) {
                _context3.next = 13;
                break;
              }

              return _context3.abrupt("return");

            case 13:
              embed = new Sphinx.MessageEmbed().setAuthor('PodBot').setTitle('New Episode!').addDescription(episodeData.title).setThumbnail(botSVG);
              relevantChannel.send({
                embed: embed
              });

            case 15:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x6, _x7) {
      return _ref3.apply(this, arguments);
    };
  }());
} //EVERY FIVE MINUTES:
// setInterval(function ()
// {
// }, 300000);
//
//const allKeys = storage.keys('*')
//AsyncForEach:
//  plug each tribe ID into https://tribes.sphinx.chat/tribes/ID
//  await fetch() from above url
//  pull feed_url from above url
//  plug feed_url into https://tribes.sphinx.chat/podcast?url=FEED_URL
//  pull "episodes" array, first object, id: number
//  Check if episode ID matches stored ID
//  IF YES: Return
//  IF NOT: Replace with epidode ID number in object with storage.set(TRIBE_UUID, LATEST_EPISODE_ID)
//  Send message to tribe announcing New Episode
//# sourceMappingURL=index.js.map