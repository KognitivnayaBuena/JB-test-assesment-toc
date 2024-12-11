import { TOCData, TOCEntity } from "./types";

export interface Page {
  id: string;
  title: string;
  url: string;
  level: number;
  parentId: string | null;
  pages: string[];
  anchors: string[];
}

export interface TOCNode extends Omit<TOCEntity, 'pages'> {
  children: TOCNode[];
  path: string;
  tabIndex: number;
}

export const mapDataToTree = (data: TOCData): TOCNode[] => {
  const { entities, topLevelIds } = data;

  const buildTree = (id: string, parentPath: string = ""): TOCNode => {
    const entity = entities.pages[id];
    const currentPath = `${parentPath}/${id}`;

    const children = (entity.pages || []).map((childId: string) =>
      buildTree(childId, currentPath)
    );

    return {
      ...entity,
      path: currentPath,
      children,
    };
  };

  return topLevelIds.map((topLevelId) => buildTree(topLevelId));
};
