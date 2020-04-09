export const OPTIONS = {
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
        arrows: 'to'
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
