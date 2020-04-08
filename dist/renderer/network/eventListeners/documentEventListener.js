'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DocumentEventListener = exports.DocumentEventListener = function () {
    function DocumentEventListener(parent) {
        _classCallCheck(this, DocumentEventListener);

        this.parent = parent;
        this.addEventListeners();
    }

    _createClass(DocumentEventListener, [{
        key: 'addEventListeners',
        value: function addEventListeners() {
            var _this = this;

            document.addEventListener('keydown', function (params) {
                if (params.key === 'Shift' && !params.metaKey) {
                    _this.parent.network.addEdgeMode();
                }
            });

            document.addEventListener('keyup', function (params) {
                if (params.key === 'Shift' && !params.metaKey) {
                    _this.parent.network.disableEditMode();
                }
            });

            document.addEventListener('keydown', function (params) {
                if (params.key === 'Backspace' && !params.metaKey) {
                    _this.parent.eventInitializer.initDeletion(_this.parent.network.getSelection());
                }
            });

            document.addEventListener('keydown', function (params) {
                if (params.code === 'KeyT' && !params.metaKey) {
                    var selected = _this.parent.network.getSelectedEdges();
                    if (selected.length) {
                        selected.forEach(function (edge) {
                            var to = _this.parent.network.body.edges[edge].options.arrows.to;
                            to.enabled = !to.enabled;
                        });
                    }
                    _this.parent.network.redraw();
                }
            });

            document.addEventListener('keydown', function (params) {
                if (params.code === 'KeyS' && !params.metaKey) {
                    var selected = _this.parent.network.getSelectedEdges();
                    if (selected.length) {
                        selected.forEach(function (edge) {
                            var fullEdge = _this.parent.network.body.data.edges.get(edge);
                            _this.parent.network.body.data.edges.update({
                                id: edge,
                                from: fullEdge.to,
                                to: fullEdge.from
                            });
                        });
                    }
                    _this.parent.network.redraw();
                }
            });

            // document.addEventListener('keydown', params => {
            //     if (params.code === 'KeyC' && !params.metaKey)
            //         })
        }
    }]);

    return DocumentEventListener;
}();