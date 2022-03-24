// TODO: Why can't we properly use aliases here without breaking other packages?
import { DocumentNode } from '../document';

const nodeHtmlGenerators: Record<string, (node: DocumentNode) => string> = {
  'title-1': (node) => `<h1>${node.text}</h1>`,
  'title-2': (node) => `<h2>${node.text}</h2>`,
  'paragraph-start': () => '<p>',
  'paragraph-end': () => '</p>',
  'text': (node) => node.text || '',
  'text-emphasis': (node) => `<em>${node.text}</em>`,

  'comment': (node) => `<details><summary>Comment</summary> ${node.text}</details>`
};

export function renderNodeHtml(node: DocumentNode): string {
  // TODO: What to do in case of missing generator?
  const generator = nodeHtmlGenerators[node.type] || (() => '');

  return generator(node);
}

// TODO: This should support customizeable "render engines" to be user-configurable.
export function renderNodesToHtml(nodes: DocumentNode[]): string {
  return nodes
    .reduce((result, node) => result + renderNodeHtml(node), '');
}
