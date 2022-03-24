export interface Document {
    uuid: string;
    title: string;
    nodes: DocumentNode[];
    sections: DocumentSection[];
}
export interface DocumentNode {
    type: string;
    text?: string;
    sectionUuid?: string;
}
export interface DocumentSection {
    uuid: string;
    title: string;
    order: number;
}
export declare function createDocument(): Document;
export declare function createSection(title: string): DocumentSection;
export declare function getOrderedSections(sections: DocumentSection[]): DocumentSection[];
export declare function getDocumentWordCount(document: Document): number;
export declare function getDocumentNodeTypeCount(document: Document, nodeType: string): number;
