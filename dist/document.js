"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDocumentNodeTypeCount = exports.getDocumentWordCount = exports.getOrderedSections = exports.createSection = exports.createDocument = void 0;
const uuid_1 = require("uuid");
function createDocument() {
    return {
        uuid: (0, uuid_1.v4)(),
        title: 'New document',
        nodes: [],
        sections: [
            createSection('Chapter 1')
        ]
    };
}
exports.createDocument = createDocument;
function createSection(title) {
    return {
        uuid: (0, uuid_1.v4)(),
        title,
        order: 0
    };
}
exports.createSection = createSection;
function getOrderedSections(sections) {
    return [...sections].sort((a, b) => a.order - b.order);
}
exports.getOrderedSections = getOrderedSections;
// TODO: Implementation does not take edge cases into account, simplify, and move it to its own module.
function getDocumentWordCount(document) {
    return document.nodes
        .filter((node) => node.text)
        .reduce((count, node) => count + node.text.split(' ').filter(Boolean).length, 0);
}
exports.getDocumentWordCount = getDocumentWordCount;
function getDocumentNodeTypeCount(document, nodeType) {
    return document.nodes
        .filter((node) => node.type === nodeType)
        .length;
}
exports.getDocumentNodeTypeCount = getDocumentNodeTypeCount;
