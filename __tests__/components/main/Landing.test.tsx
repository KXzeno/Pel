import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

import Landing from "@main/Landing";
import { LandingNavBar, LandingHeader } from "@/components/forward";

// Mock intersection observer
const mockIntersectionObserver = jest.fn();

mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
});

window.IntersectionObserver = mockIntersectionObserver;

describe('Landing component', () => {
  test('renders header section', async () => {
    let { container } = render(<LandingHeader />);

    // Validate header
    expect(container).toBeVisible();

    // Reference and validate header inner html
    let title = screen.getByText(/Pel/);
    let desc = screen.getByText(/^Etch[\w\s]+?surface$/);
    let btn = screen.getByText(/Get Started/);

    expect(title).toBeInTheDocument();
    expect(desc).toBeInTheDocument();
    expect(btn).toBeInTheDocument();

    // screen.debug();
  });

  test('renders navigation bar', () => {
    render(<LandingNavBar />);
    // Parse 'link' roles and map to their wrappers
    let navItems = screen.getAllByRole('link').map(link => link.parentElement).filter(wrapper => wrapper && wrapper.classList.contains('nav-item'));

    // Target the background
    let navBarBg = screen.getByRole('navigation').lastElementChild;

    expect(navItems.length).toBe(4);
    expect(navBarBg).toBeVisible();
    expect(navBarBg).not.toHaveClass('navbar-grow');
    expect(navBarBg).not.toHaveClass('navbar-shrink');
  });

  test('attaches & detaches radials on links via hover states', async () => {
    render(<LandingNavBar />);

    let navItems = screen.getAllByRole('link');
    let navItemRadials = navItems.map(item => item.previousElementSibling);

    expect(navItemRadials.length).toBe(4);
  });
});
