export const DIALOG_OPTIONS = {
    COLOR_SELECTION: {
        title: 'Choose color',
        label: 'Color: ',
        selectOptions: {
            yellow: 'yellow',
            blue: 'blue',
            green: 'green',
            orange: 'orange',
            red: 'red'
        },
        alwaysOnTop: true,
        type: 'select'
    },
    NODE_SHAPE_SELECTION: {
        title: 'Choose node\'s shape',
        label: 'Shape: ',
        selectOptions: {
            ellipse: 'ellipse',
            circle: 'circle',
            database: 'database',
            box: 'box',
            triangle: 'triangle',
            text: 'text',
            hexagon: 'hexagon',
            dot: 'dot',
            diamond: 'diamond'
        },
        alwaysOnTop: true,
        type: 'select'
    },
    RENAMING_NODE: {
        title: 'Enter node\'s new value',
        label: 'Value: ',
        alwaysOnTop: true,
        type: 'input'
    },
    RENAMING_EDGE: {
        title: 'Enter edge\'s new value',
        label: 'Value: ',
        alwaysOnTop: true,
        type: 'input'
    }
}
