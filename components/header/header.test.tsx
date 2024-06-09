import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './header';

describe('Header Component', () => {
  it('renders the navigation links', () => {
    render(<Header />);
    const homeLink = screen.getByText(/Home/i);
    const statLink = screen.getByText(/Statistics/i);
    const aboutLink = screen.getByText(/About/i);

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
    expect(statLink).toHaveAttribute('href', '/statistics');
    expect(aboutLink).toHaveAttribute('href', '/about');
  });
});