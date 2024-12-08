import React from "react";

import { Page, TOCData } from "../types";
import { useFocusContext } from "../../context/FocusContext";

import styles from "./AccordionItem.module.css";
interface AccordionItemProps {
  page: Page;
  data: TOCData;
  toggleOpen: (id: string) => void;
  openItems: Record<string, boolean>;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ page, data, openItems, toggleOpen }) => {
  const { focusedElement } = useFocusContext();
  const isOpen = openItems[page.id] || false;
  const isFocused = focusedElement === page.id;

  const nestedPages = page && page.pages?.map((id) => data?.entities.pages[id]);
  const anchors = page && page.anchors?.map((id) => data?.entities.anchors[id]);

  return (
    <div>
      <li
        className={`${styles.itemWrapper} ${page?.level > 1 ? styles.nestedItemWraper : ""} ${isFocused ? styles.nestedItemFocused : ""} ${isOpen && page?.level === 0 ? styles.isOpenItemWrapper : ""}`}
        onClick={() => toggleOpen(page.id)}
      >
        <p
          className={`${nestedPages?.length > 0 && styles.itemText} ${isOpen && styles.isOpenAccordion}`}
          style={{
            paddingLeft: `${page.level * 16}px`,
            "--left": `${page.level * 16 - 12}px` 
          }}
        >
          {page.title}
        </p>
      </li>
      {isOpen && (
        <div className={`${styles.nestedPages}`}>
          {nestedPages?.map((nestedPage) => (
            <AccordionItem
              key={nestedPage.id}
              page={nestedPage}
              data={data}
              openItems={openItems}
              toggleOpen={toggleOpen}
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