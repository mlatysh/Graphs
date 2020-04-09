export class EdgeCreator {
    static getSerializedEdge(edgeObject) {
        return {
            type: 'edge',
            id: edgeObject.id,
            from: edgeObject.from.id,
            to: edgeObject.to.id,
            oriented: !!edgeObject.options.arrows.to.enabled,
            color: edgeObject.options.color.color
        }
    }

    static getReadyForUseEdge(serializedEdge) {
        const arrows = serializedEdge.oriented ? {
            to:{enabled: true, type: 'arrow'}
        } : {
            to:{enabled: false}
        }
        return {
            id: serializedEdge.id,
            from: serializedEdge.from,
            to: serializedEdge.to,
            arrows,
            color: serializedEdge.color
        }
    }
}
