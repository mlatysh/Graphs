'use strict';

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
        key: 'addInteractionEventListeners',
        value: function addInteractionEventListeners() {
            var _this = this;

            this.parent.network.on('doubleClick', function (params) {
                console.log('dbl');
                var e = params.event.srcEvent;
                _this.parent.network.releaseNode();
                if (params.nodes.length === 0 && params.edges.length === 0) {
                    _this.parent.eventInitializer.initAddNode(params.pointer.canvas.x, params.pointer.canvas.y, false);
                } else if (params.nodes.length !== 0) {
                    _this.parent.eventInitializer.initEditNode(params.nodes[0]);
                }
            });

            this.parent.network.on('oncontext', function (params) {
                _this.parent.eventInitializer.initDeletion(_this.parent.network.getSelection());
            });

            this.parent.network.on('click', function (params) {
                var prompt = require('electron-prompt');
                _this.parent.network.releaseNode();
                var e = params.event.srcEvent;
                if (e.shiftKey) _this.parent.eventInitializer.initAddNode(params.pointer.canvas.x, params.pointer.canvas.y, true);
                // prompt({
                //     title: 'Choose color',
                //     label: 'Color:',
                //     value: 'red',
                //     inputAttrs: {
                //         type: 'text',
                //         required: true
                //     },
                //     type: 'input'
                // })
                //     .then((r) => {
                //         if (r === null) {
                //             console.log('user cancelled');
                //         } else {
                //             console.log(params, r)
                //             // this.onNodeColorChange(params.)
                //         }
                //     })
                //     .catch(console.error);
            });
        }
    }]);

    return InteractionEventListener;
}();