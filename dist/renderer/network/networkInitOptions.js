'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OPTIONS = undefined;

var _colors = require('./consts/colors');

var OPTIONS = exports.OPTIONS = {
    autoResize: true,
    clickToUse: false,
    interaction: {
        hoverConnectedEdges: false,
        selectConnectedEdges: false,
        hover: true,
        multiselect: true,
        keyboard: {
            enabled: true
        }
    },
    manipulation: {
        enabled: false
    },
    edges: {
        arrows: 'to',
        color: {
            inherit: false,
            color: _colors.COLORS.BLUE.border,
            hover: _colors.COLORS.BLUE.hover.border,
            highlight: _colors.COLORS.BLUE.highlight.border
        }
    },
    nodes: {
        color: {
            background: _colors.COLORS.BLUE.background,
            border: _colors.COLORS.BLUE.border,
            hover: _colors.COLORS.BLUE.hover,
            highlight: _colors.COLORS.BLUE.highlight
        }
    },
    physics: {
        enabled: true,
        barnesHut: {
            theta: 0.5,
            gravitationalConstant: -1000,
            centralGravity: 0,
            springLength: 200,
            springConstant: 0.01,
            damping: 0.9,
            avoidOverlap: 1
        },
        maxVelocity: 0.5,
        minVelocity: 0.1,
        solver: 'barnesHut',
        timestep: 8,
        adaptiveTimestep: true
    }
};