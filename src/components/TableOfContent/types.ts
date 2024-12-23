export interface Anchor {
  id: string;
  title: string;
  url: string;
  anchor: string;
  level: number;
}

export interface Page {
  id: string;
  title: string;
  url: string;
  level: number;
  parentId: string | null;
  pages: string[];
  anchors: string[];
}

export interface TOCEntity {
  id: string;
  title: string;
  level: number;
  pages?: string[];
}

export interface TOCData {
  entities: {
    pages: Record<string, TOCEntity>;
  };
  topLevelIds: string[];
}