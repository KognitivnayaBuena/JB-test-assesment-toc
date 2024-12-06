import React, { useState } from "react";

import AccordionItem from "./AccordionItem";
import { TOCData } from "../types";

const Accordion: React.FC<{ data: TOCData }> = ({ data }) => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const { entities, topLevelIds } = data;


  // TODO: memoisation + is there some optimisation on it?
  const toggleOpen = (id: string) => {
    setOpenItems((prev) => {
      const newOpenItems = { ...prev };
      const page = data.entities.pages[id];
      const parentId = page.parentId;

      // TODO: Is keep closing siiblings or leave them open? 
      // Object.keys(prev).forEach((key) => {
      //   const siblingPage = data.entities.pages[key];
      //   if (siblingPage.parentId === parentId) {
      //     newOpenItems[key] = false;
      //   }
      // });


      newOpenItems[id] = !prev[id];
      return newOpenItems;
    });
  };
 
  return (
    <div>
      {topLevelIds.map((id) => {
        const page = entities?.pages[id];
        return (
          <AccordionItem
            key={page.id}
            page={page}
            data={data}
            toggleOpen={toggleOpen}
            openItems={openItems}
          />
        );
      })}
    </div>
  );
};

export default Accordion;