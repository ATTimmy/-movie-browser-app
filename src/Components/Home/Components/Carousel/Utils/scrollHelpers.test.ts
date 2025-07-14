import { describe, it, expect, vi } from 'vitest';
import { getNextIndex, scrollToIndex, handleScroll } from './scrollHelpers';

describe('getNextIndex', () => {
  it('returns next index when scrolling right', () => {
    expect(getNextIndex('right', 0, 5)).toBe(1);
    expect(getNextIndex('right', 4, 5)).toBe(0);
  });

  it('returns next index when scrolling left', () => {
    expect(getNextIndex('left', 0, 5)).toBe(4);
    expect(getNextIndex('left', 2, 5)).toBe(1);
  });
});

describe('scrollToIndex', () => {
  it('scrolls to the correct child offset and updates active index', () => {
    const mockSetActiveIndex = vi.fn();
    const mockChild = { offsetLeft: 100 };
    const mockScrollTo = vi.fn();
    const mockContainer = {
      children: [mockChild],
      scrollTo: mockScrollTo,
    } as unknown as HTMLDivElement;

    scrollToIndex(mockContainer, 0, mockSetActiveIndex);

    expect(mockScrollTo).toHaveBeenCalledWith({ left: 100, behavior: 'smooth' });
    expect(mockSetActiveIndex).toHaveBeenCalledWith(0);
  });

  it('does nothing if container is null', () => {
    const mockSetActiveIndex = vi.fn();
    scrollToIndex(null, 0, mockSetActiveIndex);
    expect(mockSetActiveIndex).not.toHaveBeenCalled();
  });
});

describe('handleScroll', () => {
  it('calculates next index and scrolls correctly', () => {
    const mockSetActiveIndex = vi.fn();
    const mockScrollTo = vi.fn();
    const mockChild = { offsetLeft: 300 };
    const mockContainer = {
      children: [mockChild, mockChild, mockChild],
      scrollTo: mockScrollTo,
    } as unknown as HTMLDivElement;

    handleScroll('right', mockContainer, 0, 3, mockSetActiveIndex);

    expect(mockScrollTo).toHaveBeenCalledWith({ left: 300, behavior: 'smooth' });
    expect(mockSetActiveIndex).toHaveBeenCalledWith(1);
  });
});
