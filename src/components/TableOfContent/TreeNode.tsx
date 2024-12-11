import React, { useState } from 'react';
import { motion, AnimatePresence } from "motion/react";
import classNames from 'classnames';

import { useActiveItemContext } from "./ActiveItemContext";
import { TOCNode } from "./index";

import styles from './TreeNode.module.css';

export const TreeNode: React.FC<{ node: TOCNode }> = ({ node }) => {
  const { activePath, setActivePath } = useActiveItemContext();
  const isActive = activePath === node.path;
  const isInActivePath = activePath
    ?.split('/')
    .includes(node.path.split('/').at(-1) ?? '');
  const [isExpanded, setIsExpanded] = useState(isInActivePath);

  const toggleNode = () => {
    setIsExpanded((prev) => {
      if (prev && !isActive) return prev;
      return !prev; 
    });
    setActivePath(node.path);
  };

  const nodeLabelStyle = {
    paddingLeft: `${node.level * 16}px`,
    "--left": `${node.level * 16 - 12}px`,
  } as React.CSSProperties;

  return (
    <li
      className={classNames(
        styles.node,
        {
          [styles.nodeLabelExpanded]: isInActivePath && node.children.length > 0,
          [styles.deepNodeLabel]: isInActivePath && node.level >= 1,
        }
      )}
      data-testid={`nodeLi-${node.id}`}
    >
      <a
        className={classNames(
          styles.nodeLabel,
          { [styles.nodeLabelFocused]: isActive }
        )}
        data-testid={`nodeLabel-${node.id}`}
        onClick={toggleNode}
        href={node.href}
      >
        <p
          className={classNames(
            { [styles.nodeLabelText]: node.children.length > 0 },
            { [styles.isExpanded]: isExpanded }
          )}
          style={nodeLabelStyle}
        >
          {node.title}
        </p>
      </a>
      <AnimatePresence>
        {isExpanded && node.children.length > 0 && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            key={`nodeList-${node.id}`}
            className={styles.children}
          >
            {node.children.map((child) => (
              <TreeNode key={child.id} node={child} />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
};
