"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderNodesToHtml = exports.renderNodeHtml = void 0;
const nodeHtmlGenerators = {
    'title-1': (node) => `<h1>${node.text}</h1>`,
    'title-2': (node) => `<h2>${node.text}</h2>`,
    'paragraph-start': () => '<p>',
    'paragraph-end': () => '</p>',
    'text': (node) => node.text || '',
    'text-emphasis': (node) => `<em>${node.text}</em>`,
    'comment': (node) => `<details><summary>Comment</summary> ${node.text}</details>`
};
function renderNodeHtml(node) {
    // TODO: What to do in case of missing generator?
    const generator = nodeHtmlGenerators[node.type] || (() => '');
    return generator(node);
}
exports.renderNodeHtml = renderNodeHtml;
// TODO: This should support customizeable "render engines" to be user-configurable.
function renderNodesToHtml(nodes) {
    return nodes
        .reduce((result, node) => result + renderNodeHtml(node), '');
}
exports.renderNodesToHtml = renderNodesToHtml;
