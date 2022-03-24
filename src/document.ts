import { v4 as uuidv4 } from 'uuid';

export interface Document {
  uuid: string;
  title: string;
  nodes: DocumentNode[];
  sections: DocumentSection[];
}

export interface DocumentNode {
  // TODO: Use an enum here
  type: string;
  text?: string;
  // TODO: Any way to make this non-optional?
  sectionUuid?: string;
}

export interface DocumentSection {
  uuid: string;
  title: string;
  order: number;
}

export function createDocument(): Document {
  return {
    uuid: uuidv4(),
    title: 'New document',
    nodes: [],
    sections: [
      createSection('Chapter 1')
    ]
  };
}

export function createSection(title: string): DocumentSection {
  return {
    uuid: uuidv4(),
    title,
    order: 0
  };
}

export function getOrderedSections(sections: DocumentSection[]): DocumentSection[] {
  return [ ...sections ].sort((a, b) => a.order - b.order);
}

// TODO: Implementation does not take edge cases into account, simplify, and move it to its own module.
export function getDocumentWordCount(document: Document): number {
  return document.nodes
    .filter((node) => node.text)
    .reduce((count, node) => count + node.text!.split(' ').filter(Boolean).length, 0);
}

export function getDocumentNodeTypeCount(document: Document, nodeType: string): number {
  return document.nodes
    .filter((node) => node.type === nodeType)
    .length;
}
