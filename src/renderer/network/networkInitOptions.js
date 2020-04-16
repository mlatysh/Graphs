import {COLORS} from "./consts/colors";

export const OPTIONS = {
    autoResize: true,
    clickToUse: false,
    interaction: {
        hoverConnectedEdges: false,
        selectConnectedEdges: false,
        hover: true,
        multiselect: true,
        keyboard: {
            enabled: false
        }
    },
    manipulation: {
        enabled: false
    },
    edges: {
        arrows: 'to',
        color: {
            inherit: false,
            color: COLORS.BLUE.border,
            hover: COLORS.BLUE.hover.border,
            highlight: COLORS.BLUE.highlight.border
        }
    },
    nodes: {
        color: {
            background: COLORS.BLUE.background,
            border: COLORS.BLUE.border,
            hover: COLORS.BLUE.hover,
            highlight: COLORS.BLUE.highlight
        }
    },
    physics: {
        enabled: true,
        barnesHut: {
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
