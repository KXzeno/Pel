import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

import Landing from "@main/Landing";

describe('Landing component', () => {
  test('renders header section', async () => {
    let { container } = render(<Landing />);

    expect(container).toBeInTheDocument();

    let title = screen.getByText(/Pel/);
    let desc = screen.getByText(/^Etch[\w\s]+?surface$/);
    let btn = screen.getByText(/Get Started/);

    expect(title).toBeInTheDocument();
    expect(desc).toBeInTheDocument();
    expect(btn).toBeInTheDocument();

    // screen.debug();
  });
});
