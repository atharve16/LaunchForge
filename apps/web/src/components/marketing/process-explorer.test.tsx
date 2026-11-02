import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProcessExplorer } from './process-explorer';

describe('ProcessExplorer', () => {
  it('changes the visible stage with an accessible tab control', () => {
    render(<ProcessExplorer />);
    fireEvent.click(screen.getByRole('tab', { name: /Launch/ }));
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Deploy, verify, document');
  });
});
