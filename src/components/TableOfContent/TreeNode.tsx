import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { TOCNode } from './utils';
import { useFocusContext } from '../../context/FocusContext';

import styles from './TreeNode.module.css';

const TreeNode: React.FC<{ node: TOCNode }> = ({ node }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const { focusedElementPath, setFocusedElementPath } = useFocusContext();
  const isFocused = focusedElementPath === node.path;
  const isNodeInsideOfFocusedList = focusedElementPath
    ?.split('/')
    .includes(node.path.split('/').at(-1));

  if (node.title.includes('Run/debug configuration')) {
    console.log("node title - ", node.title, ": ", node.id);
    console.log("focusedElementPath: ", focusedElementPath);
  }

  const toggleNode = () => {
    setIsExpanded((prev) => !prev);
    setFocusedElementPath(node.path);
  };

  return (
    <li className={`
      ${styles.node}
      ${isNodeInsideOfFocusedList && styles.nodeLabelExpanded}
      ${isNodeInsideOfFocusedList && node.level >= 1 && styles.deepNodeLabel}
    `}>
      <div
        className={`
          ${styles.nodeLabel}
          ${isFocused && styles.nodeLabelFocused}
        `}
        onClick={toggleNode}
      >
        <p
          className={`
            ${node.children.length > 0 && styles.nodeLabelText}
            ${isExpanded && styles.isExpanded}
          `}
          style={{
            paddingLeft: `${node.level * 16}px`,
            "--left": `${node.level * 16 - 12}px` 
          }}
        >
          {node.title}
        </p>
      </div>
      {isExpanded && node.children.length > 0 && (
        <motion.ul
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className={styles.children}
        >
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} />
          ))}
        </motion.ul>
      )}
    </li>
  );
};

export default TreeNode;