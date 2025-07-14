import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useRef, useState } from 'react';
import { useClickOutside } from './useClickOutside';

function ClickOutsideTest({ onOutsideClick }: { onOutsideClick: () => void }) {
  const [isOpen, setIsOpen] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(
    ref,
    () => {
      onOutsideClick();
      setIsOpen(false);
    },
    isOpen
  );

  return (
    <div>
      <div data-testid="outside">Outside</div>
      {isOpen && (
        <div data-testid="popover" ref={ref}>
          Popover Content
        </div>
      )}
    </div>
  );
}

describe('useClickOutside', () => {
  it('calls handler when clicking outside', () => {
    const handler = vi.fn();
    const { getByTestId, queryByTestId } = render(<ClickOutsideTest onOutsideClick={handler} />);

    expect(getByTestId('popover')).toBeInTheDocument();

    fireEvent.mouseDown(getByTestId('outside'));

    expect(handler).toHaveBeenCalledOnce();

    expect(queryByTestId('popover')).not.toBeInTheDocument();
  });

  it('does not call handler when clicking inside', () => {
    const handler = vi.fn();
    const { getByTestId } = render(<ClickOutsideTest onOutsideClick={handler} />);

    fireEvent.mouseDown(getByTestId('popover'));

    expect(handler).not.toHaveBeenCalled();
  });
});
