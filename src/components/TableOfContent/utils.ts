import { TOCData } from "./types";
import { TOCNode } from "./index";

export const mapDataToTree = (data: TOCData): TOCNode[] => {
  const { entities, topLevelIds } = data;

  const buildTree = (id: string, parentPath: string = ""): TOCNode => {
    const entity = entities.pages[id];
    const currentPath = `${parentPath}/${id}`;

    const children = (entity.pages || []).map((childId: string) =>
      buildTree(childId, currentPath)
    );

    return {
      id: entity.id,
      title: entity.title,
      level: entity.level,
      path: currentPath,
      href: "javascript:void(0)", // will be real url in the production application
      children,
    };
  };

  return topLevelIds.map((topLevelId) => buildTree(topLevelId));
};
