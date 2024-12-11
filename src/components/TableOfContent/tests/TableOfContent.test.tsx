import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi, Mock } from 'vitest';

import TableOfContent from '../';
import { FocusProvider } from '../../../context/FocusContext';
import useFetch from '../../../hooks/useFetch';
import mockData from './mockData';

vi.mock('../../../hooks/useFetch');

function renderTableOfContent(): void {
  render(
    <FocusProvider>
      <TableOfContent />
    </FocusProvider>
  );
};


describe('TableOfContent Component', () => {
  it('renders loading state correctly', () => {
    (useFetch as Mock).mockReturnValue([null, true, null]);

    render(
      <FocusProvider>
        <TableOfContent />
      </FocusProvider>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    (useFetch as Mock).mockReturnValue([null, false, { message: 'Failed to fetch' }]);

    render(
      <FocusProvider>
        <TableOfContent />
      </FocusProvider>
    );

    expect(screen.getByTestId('error-message')).toBeInTheDocument();
  });


  it('renders TableOfContent with nodes', () => {
    (useFetch as Mock).mockReturnValue([mockData, false, null]);
    renderTableOfContent();

    expect(screen.getByTestId('nodeLabel-1')).toBeInTheDocument();
    expect(screen.queryByTestId('nodeLabel-3.3.1')).toBeNull();
  });

  it('TableOfContent have correct tree structure rendered', () => {
    (useFetch as Mock).mockReturnValue([mockData, false, null]);
    renderTableOfContent();

    const node = screen.getByTestId('nodeLabel-3');
    expect(screen.queryByTestId('nodeLabel-3.3')).toBeNull();

    fireEvent.click(node);
    expect(screen.getByTestId('nodeLabel-3.3')).toBeInTheDocument();

    const nodeChild = screen.getByTestId('nodeLabel-3.3');
    expect(screen.queryByTestId('nodeLabel-3.3.1')).toBeNull();

    fireEvent.click(nodeChild);
    expect(screen.getByTestId('nodeLabel-3.3.1')).toBeInTheDocument();

    const childNodeChild = screen.getByTestId('nodeLabel-3.3.3');
    expect(screen.queryByTestId('nodeLabel-3.3.3.1')).toBeNull();

    fireEvent.click(childNodeChild);
    expect(screen.getByTestId('nodeLabel-3.3.3.1')).toBeInTheDocument();
  });

  it('toggles node expansion on click', () => {
    (useFetch as Mock).mockReturnValue([mockData, false, null]);
    renderTableOfContent();

    const node = screen.getByTestId('nodeLabel-1');
    expect(screen.queryByTestId('nodeLabel-1.1')).toBeNull();

    // open
    fireEvent.click(node);
    expect(screen.getByTestId('nodeLabel-1.1')).toBeInTheDocument();

    // close
    fireEvent.click(node);
    waitFor(() => {
      expect(screen.queryByTestId('nodeLabel-1.1')).toBeNull();
    });
  });

  it('node get/lose focus state by click', async () => {
    (useFetch as Mock).mockReturnValue([mockData, false, null]);
    renderTableOfContent();

    const node = screen.getByTestId('nodeLabel-1');
    expect(screen.queryByTestId('nodeLabel-1.1')).toBeNull();

    fireEvent.click(node);
    await waitFor(() => {
      expect(node.className).toMatch(/nodeLabelFocused/);
    });

    const nodeChild = screen.getByTestId('nodeLabel-1.1');
    await waitFor(() => {
      expect(node.className).toMatch(/nodeLabelFocused/);
      expect(nodeChild.className).not.toMatch(/nodeLabelFocused/);
    });
  });

  it('check node get focus back first and only after refocusing closing', async () => {
    (useFetch as Mock).mockReturnValue([mockData, false, null]);
    renderTableOfContent();

    const node = screen.getByTestId('nodeLabel-1');
    expect(screen.queryByTestId('nodeLabel-1.1')).toBeNull();

    fireEvent.click(node);
    const nodeChild = screen.getByTestId('nodeLabel-1.1');
    fireEvent.click(nodeChild);

    // get focus first
    fireEvent.click(node);
    await waitFor(() => {
      expect(node.className).toMatch(/nodeLabelFocused/);
    });
    expect(screen.queryByTestId('nodeLabel-1.1')).toBeInTheDocument();

    // closing
    fireEvent.click(node);
    waitFor(() => {
      expect(screen.queryByTestId('nodeLabel-1.1')).toBeNull();
    });
  });

  it('is node in level 0 highligted after focus', async () => {
    (useFetch as Mock).mockReturnValue([mockData, false, null]);
    renderTableOfContent();

    const node = screen.getByTestId('nodeLabel-1');
    fireEvent.click(node);

    const expandedNode = screen.getByTestId('nodeLi-1');
 
    await waitFor(() => {
      expect(expandedNode.className).toMatch(/nodeLabelExpanded/);
    });
  });

  it('is by switching node focus in level 0, highligted only last focused node', async () => {
    (useFetch as Mock).mockReturnValue([mockData, false, null]);
    renderTableOfContent();

    const node1 = screen.getByTestId('nodeLabel-1');
    fireEvent.click(node1);

    const expandedNode1 = screen.getByTestId('nodeLi-1');
    await waitFor(() => {
      expect(expandedNode1.className).toMatch(/nodeLabelExpanded/);
    });

    const node2 = screen.getByTestId('nodeLabel-2');
    fireEvent.click(node2);

    const expandedNode2 = screen.getByTestId('nodeLi-2');
    await waitFor(() => {
      expect(expandedNode1.className).not.toMatch(/nodeLabelExpanded/);
      expect(expandedNode2.className).toMatch(/nodeLabelExpanded/);
    });
  });

  it('is node in level 1 highligted with other css class after focus', async () => {
    (useFetch as Mock).mockReturnValue([mockData, false, null]);
    renderTableOfContent();

    const node = screen.getByTestId('nodeLabel-3');
    fireEvent.click(node);

    const nodeChild = screen.getByTestId('nodeLabel-3.1');
    fireEvent.click(nodeChild);


    const expandedNode = screen.getByTestId('nodeLi-3');
    await waitFor(() => {
      expect(expandedNode.className).not.toMatch(/deepNodeLabel/);
    });
  });

  it('is by switching node focus in level 1, highligted only last focused node', () => {
    (useFetch as Mock).mockReturnValue([mockData, false, null]);
    renderTableOfContent();

    const node2 = screen.getByTestId('nodeLabel-2');
    fireEvent.click(node2);

    const childNode21 = screen.getByTestId('nodeLabel-2.1');
    const childNode22 = screen.getByTestId('nodeLabel-2.2');

    fireEvent.click(childNode21);
    const expandedNode21 = screen.getByTestId('nodeLi-2.1');
    waitFor(() => {
      expect(expandedNode21).toHaveClass('deepNodeLabel');
    });

    fireEvent.click(childNode22);
    const expandedNode22 = screen.getByTestId('nodeLi-2.2');
    waitFor(() => {
      expect(expandedNode21).not.toHaveClass('deepNodeLabel');
      expect(expandedNode22).toHaveClass('deepNodeLabel');
    });
  });

});