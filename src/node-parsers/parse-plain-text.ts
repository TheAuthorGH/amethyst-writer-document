// TODO: Use aliases
import { DocumentNode } from '../document';

export function parseNodesFromPlainText(source: string): DocumentNode[] {
  // TODO: Could this be done with a single, beautiful regex?
  return source.split(/[\n]/g).filter(Boolean).flatMap((content) => {
    if (content.startsWith('!!')) {
      return {
        type: 'comment',
        text: content.trim().substring(2)
      };
    }

    if (content.startsWith('##')) {
      return {
        type: 'title-2',
        text: content.trim().substring(2)
      };
    }

    if (content.startsWith('#')) {
      return {
        type: 'title-1',
        text: content.trim().substring(1)
      };
    }

    const textParts = content.trim().split(/(?=[_])|(?<=[_])/g).filter(Boolean);

    // TODO: I hate myself for writing it like this. Need to get rid of imperative p.
    const textNodes = [];
    let inEmphasis = false;

    for (const textPart of textParts) {
      if (textPart === '_') {
        inEmphasis = !inEmphasis;
        continue;
      } else if (inEmphasis) {
        textNodes.push({
          type: 'text-emphasis',
          text: textPart
        });
        continue;
      }

      textNodes.push({
        type: 'text',
        text: textPart
      });
    }

    return [
      {
        type: 'paragraph-start',
      },
      ...textNodes,
      {
        type: 'paragraph-end',
      }
    ];
  });
}
