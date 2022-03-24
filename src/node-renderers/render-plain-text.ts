// TODO: Why can't we properly use aliases here without breaking other packages?
import { DocumentNode } from '../document';

const nodeTextGenerators: Record<string, (node: DocumentNode) => string> = {
  'title-1': (node) => `\n#${node.text}\n\n`,
  'title-2': (node) => `\n##${node.text}\n\n`,
  'paragraph-end': () => '\n\n',
  'text': (node) => node.text || '',
  'text-emphasis': (node) => `_${node.text}_`,

  'comment': (node) => `\n!!${node.text}\n\n`
};

export function renderNodesToPlainText(nodes: DocumentNode[]): string {
  return nodes.reduce((text, node) => {
    // TODO: What to do if generator is not found?
    const generate = nodeTextGenerators[node.type] || (() => '');

    return text + generate(node);
  }, '');
}
