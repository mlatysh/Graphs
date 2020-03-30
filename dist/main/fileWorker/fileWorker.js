'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FileWorker = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FileWorker = exports.FileWorker = function () {
    function FileWorker() {
        _classCallCheck(this, FileWorker);
    }

    _createClass(FileWorker, null, [{
        key: 'saveJsonToFile',
        value: function saveJsonToFile(jsonObj, filePath) {
            fs.writeFileSync(filePath, JSON.stringify(jsonObj), 'utf-8');
        }
    }, {
        key: 'getJsonFromFile',
        value: function getJsonFromFile(filePath) {
            return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        }
    }]);

    return FileWorker;
}();