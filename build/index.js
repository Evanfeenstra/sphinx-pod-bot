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
var initted = false;
/*
// SPHINX_TOKEN contains id,secret,and url
// message.channel.send sends to the url the data
*/

function init() {
  if (initted) return;
  initted = true;
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