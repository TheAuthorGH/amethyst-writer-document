"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderNodesToPlainText = void 0;
const nodeTextGenerators = {
    'title-1': (node) => `\n#${node.text}\n\n`,
    'title-2': (node) => `\n##${node.text}\n\n`,
    'paragraph-end': () => '\n\n',
    'text': (node) => node.text || '',
    'text-emphasis': (node) => `_${node.text}_`,
    'comment': (node) => `\n!!${node.text}\n\n`
};
function renderNodesToPlainText(nodes) {
    return nodes.reduce((text, node) => {
        // TODO: What to do if generator is not found?
        const generate = nodeTextGenerators[node.type] || (() => '');
        return text + generate(node);
    }, '');
}
exports.renderNodesToPlainText = renderNodesToPlainText;
