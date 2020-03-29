export class EdgeCreator {
    static getSerializedEdge(edgeObject) {
        return {
            type: 'edge',
            id: edgeObject.id,
            from: edgeObject.from.id,
            to: edgeObject.to.id
        }
    }

    static getReadyForUseEdge(serializedEdge) {
        return {
            id: serializedEdge.id,
            from: serializedEdge.from,
            to: serializedEdge.to
        }
    }
}
