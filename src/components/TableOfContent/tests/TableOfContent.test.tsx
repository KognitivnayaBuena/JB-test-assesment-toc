import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import TableOfContent from '../index';
import { FocusProvider } from '../../../context/FocusContext';

import mockData from './mockData';

function renderTableOfContent(): void {
  render(
    <FocusProvider>
      <TableOfContent data={mockData} />
    </FocusProvider>
  );
};

test('renders TableOfContent with nodes', () => {
  renderTableOfContent();

  expect(screen.getByText('Node 1')).toBeInTheDocument();
  expect(screen.queryByText('Child Node 3.3.1')).not.toBeInTheDocument();
});

test('TableOfContent have correct tree structure rendered', () => {
  renderTableOfContent();

  const node = screen.getByText('Node 3');
  expect(screen.queryByText('Child Node 3.3')).not.toBeInTheDocument();

  fireEvent.click(node);
  expect(screen.getByText('Child Node 3.3')).toBeInTheDocument();

  const nodeChild = screen.getByText('Child Node 3.3');
  expect(screen.queryByText('Child Node 3.3.1')).not.toBeInTheDocument();

  fireEvent.click(nodeChild);
  expect(screen.queryByText('Child Node 3.3.1')).toBeInTheDocument();

  const childNodeChild = screen.getByText('Child Node 3.3.3');
  expect(screen.queryByText('Child Node 3.3.3.1')).not.toBeInTheDocument();

  fireEvent.click(childNodeChild);
  expect(screen.queryByText('Child Node 3.3.3.1')).toBeInTheDocument();
});

test('toggles node expansion on click', () => {
  renderTableOfContent();

  const node = screen.getByText('Node 1');
  expect(screen.queryByText('Child Node 1.1')).not.toBeInTheDocument();

  // open
  fireEvent.click(node);
  expect(screen.getByText('Child Node 1.1')).toBeInTheDocument();

  // close
  fireEvent.click(node);
  expect(screen.queryByText('Child Node 1.1')).not.toBeInTheDocument();
});

test('node get/lose focus state by click', () => {
  renderTableOfContent();

  const node = screen.getByText('Node 1');
  expect(screen.queryByText('Child Node 1.1')).not.toBeInTheDocument();

  fireEvent.click(node);
  waitFor(() => {
    expect(node).toHaveClass('nodeLabelFocused');
  });

  const nodeChild = screen.getByText('Child Node 1.1');
  waitFor(() => {
    expect(node).not.toHaveClass('nodeLabelFocused');
    expect(nodeChild).toHaveClass('nodeLabelFocused');
  });
});

test('check node get focus back first and only after refocusing closing', () => {
  renderTableOfContent();

  const node = screen.getByText('Node 1');
  expect(screen.queryByText('Child Node 1.1')).not.toBeInTheDocument();

  fireEvent.click(node);
  const nodeChild = screen.getByText('Child Node 1.1');
  fireEvent.click(nodeChild);

  // get focus first
  fireEvent.click(node);
  waitFor(() => {
    expect(node).toHaveClass('nodeLabelFocused');
  });
  expect(screen.queryByText('Child Node 1.1')).toBeInTheDocument();

  // closing
  fireEvent.click(node);
  expect(screen.queryByText('Child Node 1.1')).not.toBeInTheDocument();
});

test('is node in level 0 highligted after focus', () => {
  renderTableOfContent();

  const node = screen.getByText('Node 1');
  fireEvent.click(node);

  const expandedNode = node.closest('li');
  expect(expandedNode).toHaveClass('nodeLabelExpanded');
});

test('is by switching node focus in level 0, highligted only last focused node', () => {
  renderTableOfContent();

  const node1 = screen.getByText('Node 1');
  fireEvent.click(node1);

  const expandedNode1 = node1.closest('li');
  expect(expandedNode1).toHaveClass('nodeLabelExpanded');

  const node2 = screen.getByText('Node 2');
  fireEvent.click(node1);

  const expandedNode2 = node2.closest('li');
  waitFor(() => {
    expect(expandedNode1).not.toHaveClass('nodeLabelExpanded');
    expect(expandedNode2).toHaveClass('nodeLabelExpanded');
  });
});

test('is node in level 1 highligted with other css class after focus', () => {
  renderTableOfContent();

  const node = screen.getByText('Node 3');
  fireEvent.click(node);

  const nodeChild = screen.getByText('Child Node 3.1');
  fireEvent.click(nodeChild);


  const expandedNode = node.closest('li');
  waitFor(() => {
    expect(expandedNode).toHaveClass('deepNodeLabel');
  });
});

test('is by switching node focus in level 1, highligted only last focused node', () => {
  renderTableOfContent();

  const node2 = screen.getByText('Node 2');
  fireEvent.click(node2);
  const childNode21 = screen.getByText('Child Node 2.1');
  const childNode22 = screen.getByText('Child Node 2.2');

  fireEvent.click(childNode21);
  const expandedNode21 = childNode21.closest('li');
  waitFor(() => {
    expect(expandedNode21).toHaveClass('deepNodeLabel');
  });

  fireEvent.click(childNode22);
  const expandedNode22 = childNode22.closest('li');
  waitFor(() => {
    expect(expandedNode21).not.toHaveClass('deepNodeLabel');
    expect(expandedNode22).toHaveClass('deepNodeLabel');
  });
});
