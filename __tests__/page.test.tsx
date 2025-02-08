import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

import Page from "../app/page";

// import 'getUserData' from ...;

// jest.mock(getUserData);

describe('Landing page component', () => {
  beforeEach(() => {
    // IntersectionObserver isn't available in test environment
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  test('renders Home', async () => {
    let { container } = render(<Page />);

    expect(container).toBeInTheDocument();

    // screen.debug();

    /**
     * @remarks
     * Old tests, may be of use in future
     let testElem = screen.getByRole('group');
     let icons = testElem.querySelectorAll('svg');

     expect(icons).toHaveLength(6);
     */
  })
});

describe.skip('Profile Data Fetcher', () => {
  test('fetches profile data from database', async () => {
    let userData = {};

    const promise = Promise.resolve({ data: { userData } });

    //@ts-expect-error
    getProfileData.mockImplementationOnce(promise);

    //@ts-expect-error
    render(<SomeComponent/>);

    await userEvent.click(screen.getByRole('button'));

    //@ts-expect-error
    waitFor(() => promise);

    expect(screen.getAllByRole('...')).toHaveLength(0);
  });

  test('fetches profile data from database then fail', async () => {
    //@ts-expect-error
    getProfileData.mockImplementationOnce(() => {
      Promise.reject(new Error());
    });

    //@ts-expect-error
    render(<SomeComponent/>)

    await userEvent.click(screen.getByRole('button'));

    //@ts-expect-error
    let msg = await screen.findByTest(/Something went wrong/);

    //@ts-expect-error
    expect(message).toBeInTheDocument();
  });
});

