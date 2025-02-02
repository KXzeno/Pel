import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

import Page from "../app/page";

describe('Landing page component', () => {
  test('renders Home', async () => {
    render(<Page />);

    // screen.debug();

    let testElem = screen.getByRole('group');
    let icons = testElem.querySelectorAll('svg');

    expect(icons.length).toBe(6);
  })
});
