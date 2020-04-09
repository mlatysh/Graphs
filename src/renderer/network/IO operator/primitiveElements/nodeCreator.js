export class NodeCreator {
    static getSerializedNode(nodeObject) {
        return {
            type: 'node',
            id: nodeObject.id,
            label: nodeObject.options.label,
            color: {
                background: nodeObject.options.color.background,
                border: nodeObject.options.color.border
            }
        }
    }

    static getReadyForUseNode(serializedNode) {
        return {
            id: serializedNode.id,
            label: serializedNode.label,
            color: {
                background: serializedNode.color.background,
                border: serializedNode.color.border
            }
        }
    }
}
