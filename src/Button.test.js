// Button.test.js
import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Button from './Button';
import axios from 'axios';

jest.mock('axios');

test('shows list of 2 posts when API succeeds', async () => {
  axios.get.mockResolvedValueOnce({
    data: [
      {
        userId: 1,
        id: 1,
        title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        body: 'quia et suscipit...'
      },
      {
        userId: 1,
        id: 2,
        title: 'qui est esse',
        body: 'est rerum tempore vitae...'
      }
    ]
  });

  render(<Button label="Click me" />);
  fireEvent.click(screen.getByText('Click me'));

  // ✅ wait for the list items to appear
  await waitFor(() => {
    const listElement = screen.getByTestId('data');
    // eslint-disable-next-line testing-library/no-node-access
    expect(listElement.children.length).toBe(2);
    // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
    expect(listElement).toHaveTextContent(
      'sunt aut facere repellat provident occaecati excepturi optio reprehenderit'
    );
    // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
    expect(listElement).toHaveTextContent('qui est esse');
  });
});
