import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
// import userEvent from '@testing-library/user-event';

// import Landing from "@main/Landing";
import { LandingNavBar, LandingHeader } from "@/components/forward";
import CircularQueue from "@utils/CircularQueue";
import CQDispatcher from "@utils/CQDispatcher";

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

describe('Utilities for landing component', () => {
  test('construct a valid circular queue', () => {
    // Construct a circular queue of numbers
    const circularNumberQueue = new CircularQueue<number>(0);

    // Orderly enqueue from 1-9
    while (circularNumberQueue.size() !== 10) {
      circularNumberQueue.enqueue(circularNumberQueue.size());
    }

    // Reference the first node
    const leader = circularNumberQueue.first();

    // Validate number items relative to index
    let traverser: ReturnType<CircularQueue<number>['first']> | null = leader;
    for (let i = 0; i < circularNumberQueue.size() + 1; i++) {
      // Index and node data are conveniently the same; test values
      if (i === circularNumberQueue.size()) {
        // The for-loop iteration count is +1 to test circular behavior
        expect(traverser!.item).toBe(leader.item);
        continue;
      } 
      expect(traverser!.item).toBe(i);

      // Reference the traverser to the next node
      traverser = traverser!.next();
    }

    // Likewise, test if the dequeue functions correctly
    const capacity = circularNumberQueue.size();
    for (let i = capacity; i >= 0; i--) {
      if (i === 0) {
        /**
         * @see {@link https://jestjs.io/docs/expect#tothrowerror}
         *
         * Uncaught exceptions must be wrapped in a function to be testable
         */
        expect(() => circularNumberQueue.dequeue()).toThrow('No items to dequeue.');
        break;
      }
      const { item } = circularNumberQueue.dequeue();
      expect(item).toBe(capacity - i);
    }
  });

  test('construct a valid cq-dispatcher', () => {
    // Initialize promises to pass as args in dispatcher queue
    const p1 = new Promise<string>((r,) => { r('1'); });
    const p2 = new Promise<string>((r,) => { r('2'); });
    const p3 = new Promise<string>((r,) => { r('3'); });
    const p4 = new Promise<string>((r,) => { r('4'); });

    // Instantiate a dispatcher queue with the 3 promise args
    const d1 = new CQDispatcher(p1, p2, p3)

    // Create  object for queue collection conformity
    const d1c = {
      leader: p1,
      inactive: [p2, p3, p4],
    };

    // Append to active dispatcher
    d1.append(p4);

    // Validate queue collection
    expect(d1.capacity()).toBe(4);
    expect(d1.items()).not.toBeNull();
    expect(d1.items()).toMatchObject(d1c);

    // Clear the queue and reset active collection
    d1.clear();
    expect(d1.items()).toMatchObject({ leader: null, inactive: null });
    expect(d1.capacity()).toBe(0);

    // Instantiate a dispatcher queue with no args
    const d2 = new CQDispatcher();

    // Validate nullish collection
    const { leader, inactive } = d2.items();

    expect(leader).toBeNull();
    expect(inactive).toBeNull();
    expect(d2.capacity()).toBe(0)

    // Append to inactive dispatcher
    d2.append(p1);

    /**
     * @privateRemarks
     *
     * Confused; there is no referential or value equality for 
     * promise (leader), it just needs to be a promise.
     */
    expect (d2.items()).toMatchObject({ leader: p1, inactive: null });
    expect (d2.capacity() === 1);
  });
});
