export class EdgeCreator {
    static getSerializedEdge(edgeObject) {
        return {
            type: 'edge',
            id: edgeObject.id,
            from: edgeObject.from.id,
            to: edgeObject.to.id,
            oriented: !!edgeObject.options.arrows.to.enabled,
            color: edgeObject.options.color.color,
            label: edgeObject.options.label ? edgeObject.options.label : null
        }
    }

    static getReadyForUseEdge(serializedEdge) {
        const arrows = serializedEdge.oriented ? {
            to: {enabled: true, type: 'arrow'}
        } : {
            to: {enabled: false}
        }
        const label = serializedEdge.label ? serializedEdge.label : undefined
        return {
            id: serializedEdge.id,
            from: serializedEdge.from,
            to: serializedEdge.to,
            arrows,
            label,
            color: serializedEdge.color
        }
    }
}
