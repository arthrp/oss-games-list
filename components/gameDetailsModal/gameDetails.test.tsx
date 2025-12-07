import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GameDetailsModal from './gameDetailsModal';

describe('GameDetailsModal', () => {
  const onClose = jest.fn();
  const title = 'Game Title';
  const homepage = 'https://example.com';
  const children = <div>Game details content</div>;

  test('renders correctly when open', () => {
    render(
      <GameDetailsModal isOpen={true} onClose={onClose} title={title} homepage={homepage}>
        {children}
      </GameDetailsModal>
    );

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText('Game details content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  test('does not render when closed', () => {
    render(
      <GameDetailsModal isOpen={false} onClose={onClose} title={title} homepage={homepage}>
        {children}
      </GameDetailsModal>
    );

    expect(screen.queryByText(title)).not.toBeInTheDocument();
    expect(screen.queryByText('Game details content')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
  });

  test('calls onClose when the close button is clicked', () => {
    render(
      <GameDetailsModal isOpen={true} onClose={onClose} title={title} homepage={homepage}>
        {children}
      </GameDetailsModal>
    );

    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});