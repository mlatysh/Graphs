"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InteractionEventListener = exports.InteractionEventListener = function () {
    function InteractionEventListener(parent) {
        _classCallCheck(this, InteractionEventListener);

        this.parent = parent;
        this.addInteractionEventListeners();
    }

    _createClass(InteractionEventListener, [{
        key: "addInteractionEventListeners",
        value: function addInteractionEventListeners() {

            // this.parent.network.on('click', params => {
            //     const prompt = require('electron-prompt')
            //     const e = params.event.srcEvent;
            //     if (e.shiftKey)
            //         this.parent.eventInitializer.initAddNode(params.pointer.canvas.x, params.pointer.canvas.y, true)
            // })
        }
    }]);

    return InteractionEventListener;
}();