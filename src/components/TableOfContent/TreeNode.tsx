import React, { useState } from 'react';
import { motion, AnimatePresence } from "motion/react";
import classNames from 'classnames';

import { TOCNode } from './utils';
import { useFocusContext } from '../../context/FocusContext';

import styles from './TreeNode.module.css';

const TreeNode: React.FC<{ node: TOCNode }> = ({ node }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const { focusedElementPath, setFocusedElementPath } = useFocusContext();
  const isFocused = focusedElementPath === node.path;
  const isNodeInsideOfFocusedList = focusedElementPath
    ?.split('/')
    .includes(node.path.split('/').at(-1) ?? '');

  const toggleNode = () => {
    setIsExpanded((prev) => {
      if (prev && !isFocused) return prev;
      return !prev; 
    });
    setFocusedElementPath(node.path);
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
          [styles.nodeLabelExpanded]: isNodeInsideOfFocusedList,
          [styles.deepNodeLabel]: isNodeInsideOfFocusedList && node.level >= 1,
        }
      )}
      data-testid={`nodeLi-${node.id}`}
    >
      <div
        className={classNames(
          styles.nodeLabel,
          { [styles.nodeLabelFocused]: isFocused }
        )}
        data-testid={`nodeLabel-${node.id}`}
        tabIndex={node.tabIndex}
        onClick={toggleNode}
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
      </div>
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

export default TreeNode;