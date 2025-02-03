import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

import Page from "../app/page";

// import 'getUserData' from ...;

// jest.mock(getUserData);

describe('Landing page component', () => {
  test('renders Home', async () => {
    render(<Page />);

    // screen.debug();

    let testElem = screen.getByRole('group');
    let icons = testElem.querySelectorAll('svg');

    expect(icons).toHaveLength(6);
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

