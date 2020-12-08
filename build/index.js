"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("regenerator-runtime/runtime.js");

var Sphinx = _interopRequireWildcard(require("sphinx-bot"));

var fetch = _interopRequireWildcard(require("node-fetch"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
storage.set('foo', 'bar');
storage.get('foo', function (err, reply) {
  console.log(reply.toString()); // Will print `bar`
});
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
//EVERY FIVE MINUTES:
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

function init() {
  if (initted) return;
  initted = true;
  console.log("Bot Connected");
  var client = new Sphinx.Client();
  client.login(sphinxToken);
  client.on(msg_types.INSTALL, /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(message) {
      var tribeId, feedData, episodeId, tribeData, _i, _Object$entries, _Object$entries$_i, key, value, _i2, _Object$entries2, _Object$entries2$_i, _key, _value, episodes, _i3, _Object$entries3, _Object$entries3$_i, _key2, _value2, embed;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              tribeId = "";
              feedData = "";
              episodeId = "";
              _context.next = 5;
              return fetch("https://tribes.sphinx.chat/tribes/".concat(tribeId));

            case 5:
              tribeData = _context.sent;
              _i = 0, _Object$entries = Object.entries(tribeData);

            case 7:
              if (!(_i < _Object$entries.length)) {
                _context.next = 17;
                break;
              }

              _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), key = _Object$entries$_i[0], value = _Object$entries$_i[1];

              if (!(key === "feed_url")) {
                _context.next = 14;
                break;
              }

              _context.next = 12;
              return fetch("https://tribes.sphinx.chat/podcast?url=".concat(value));

            case 12:
              feedData = _context.sent;
              return _context.abrupt("break", 17);

            case 14:
              _i++;
              _context.next = 7;
              break;

            case 17:
              _i2 = 0, _Object$entries2 = Object.entries(feedData);

            case 18:
              if (!(_i2 < _Object$entries2.length)) {
                _context.next = 34;
                break;
              }

              _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2), _key = _Object$entries2$_i[0], _value = _Object$entries2$_i[1];

              if (!(_key === 'episodes')) {
                _context.next = 31;
                break;
              }

              episodes = _value;
              _i3 = 0, _Object$entries3 = Object.entries(episodes[0]);

            case 23:
              if (!(_i3 < _Object$entries3.length)) {
                _context.next = 31;
                break;
              }

              _Object$entries3$_i = _slicedToArray(_Object$entries3[_i3], 2), _key2 = _Object$entries3$_i[0], _value2 = _Object$entries3$_i[1];

              if (!(_key2 === 'id')) {
                _context.next = 28;
                break;
              }

              episodeId = _value2;
              return _context.abrupt("break", 31);

            case 28:
              _i3++;
              _context.next = 23;
              break;

            case 31:
              _i2++;
              _context.next = 18;
              break;

            case 34:
              storage.set(tribeId, episodeId);
              embed = new Sphinx.MessageEmbed().setAuthor('PodBot').setDescription('Welcome to Pod Bot!').setThumbnail(botSVG);
              message.channel.send({
                embed: embed
              });

            case 37:
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
      var arr, cmd, isAdmin, r, j, _embed, embed;

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
              _context2.next = _context2.t0 === 'watch' ? 9 : 31;
              break;

            case 9:
              console.log("=> watch");
              isAdmin = message.member.roles.find(function (role) {
                return role.name === 'Admin';
              });
              console.log('=> IS ADMIN?', isAdmin);

              if (isAdmin) {
                _context2.next = 14;
                break;
              }

              return _context2.abrupt("return");

            case 14:
              _context2.prev = 14;
              _context2.next = 17;
              return fetch(TRIBE_URL + '/podcast?url=' + podurl);

            case 17:
              r = _context2.sent;

              if (r.ok) {
                _context2.next = 20;
                break;
              }

              return _context2.abrupt("return");

            case 20:
              _context2.next = 22;
              return r.json();

            case 22:
              j = _context2.sent;
              _embed = new Sphinx.MessageEmbed().setAuthor('PodBot').setTitle('Status:').setDescription('PodBot will notify your tribe when a new episode is released').setThumbnail(botSVG);
              message.channel.send({
                embed: _embed
              });
              _context2.next = 30;
              break;

            case 27:
              _context2.prev = 27;
              _context2.t1 = _context2["catch"](14);
              console.log('Pod bot error', _context2.t1);

            case 30:
              return _context2.abrupt("return");

            case 31:
              embed = new Sphinx.MessageEmbed().setAuthor('PodBot').setTitle('PodBot Commands:').addFields([{
                name: 'Watch for new episodes',
                value: '/pod watch'
              }, {
                name: 'Help',
                value: '/pod help'
              }]).setThumbnail(botSVG);
              message.channel.send({
                embed: embed
              });
              return _context2.abrupt("return");

            case 34:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[14, 27]]);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }());
}

var botSVG = "<svg viewBox=\"64 64 896 896\" height=\"12\" width=\"12\" fill=\"white\">\n  <path d=\"M300 328a60 60 0 10120 0 60 60 0 10-120 0zM852 64H172c-17.7 0-32 14.3-32 32v660c0 17.7 14.3 32 32 32h680c17.7 0 32-14.3 32-32V96c0-17.7-14.3-32-32-32zm-32 660H204V128h616v596zM604 328a60 60 0 10120 0 60 60 0 10-120 0zm250.2 556H169.8c-16.5 0-29.8 14.3-29.8 32v36c0 4.4 3.3 8 7.4 8h729.1c4.1 0 7.4-3.6 7.4-8v-36c.1-17.7-13.2-32-29.7-32zM664 508H360c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h304c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z\" />\n</svg>";
init();
//# sourceMappingURL=index.js.map