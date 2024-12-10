import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import { FocusProvider } from '../context/FocusContext';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve([{ id: 1, title: 'Sample TOC Item', children: [] }]),
  } as Response)
);

beforeEach(() => {
  (fetch as jest.Mock).mockClear();
});

describe('App Component', () => {
  test('renders the placeholder initially', () => {
    render(
      <FocusProvider>
        <App />
      </FocusProvider>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('fetches and displays TOC data', async () => {
    render(
      <FocusProvider>
        <App />
      </FocusProvider>
    );

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    expect(screen.getByText(/sample toc item/i)).toBeInTheDocument();
  });

  test('renders the content area', () => {
    render(<App />);
    expect(screen.getByText(/content area/i)).toBeInTheDocument();
  });
});