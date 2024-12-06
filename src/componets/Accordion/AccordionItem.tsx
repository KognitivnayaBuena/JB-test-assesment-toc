import React, { useState, useCallback } from "react";
import { Page, TOCData } from "../types";
interface AccordionItemProps {
  page: Page;
  data: TOCData;
  toggleOpen: (id: string) => void;
  openItems: Record<string, boolean>;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ page, data, toggleOpen, openItems }) => {
  const isOpen = openItems[page.id] || false;
  const nestedPages = page && page.pages?.map((id) => data?.entities.pages[id]);
  const anchors = page && page.anchors?.map((id) => data?.entities.anchors[id]);

  return (
    <div style={{ marginLeft: `${page.level * 16}px` }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {nestedPages?.length > 0 && (
          <button onClick={() => toggleOpen(page.id)} style={{ marginRight: "8px" }}>
            {isOpen ? "-" : "+"}
          </button>
        )}
        <a href={page.url}>{page.title}</a>
      </div>
      {isOpen && (
        <div>
          {nestedPages?.map((nestedPage) => (
            <AccordionItem
              key={nestedPage.id}
              page={nestedPage}
              data={data}
              toggleOpen={toggleOpen}
              openItems={openItems}
            />
          ))}
          {anchors?.map((anchor) => (
            <div key={anchor.id} style={{ marginLeft: `${anchor.level * 16}px` }}>
              <a href={`${anchor.url}${anchor.anchor}`}>{anchor.title}</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccordionItem;