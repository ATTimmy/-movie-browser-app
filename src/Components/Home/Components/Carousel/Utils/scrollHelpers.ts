export const scrollToIndex = (
  container: HTMLDivElement | null,
  index: number,
  setActiveIndex: (i: number) => void
) => {
  if (!container) return;

  const card = container.children[index] as HTMLElement;
  if (card) {
    container.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
    setActiveIndex(index);
  }
};

export const getNextIndex = (direction: 'left' | 'right', activeIndex: number, total: number) => {
  return direction === 'left' ? (activeIndex - 1 + total) % total : (activeIndex + 1) % total;
};

export const handleScroll = (
  direction: 'left' | 'right',
  container: HTMLDivElement | null,
  activeIndex: number,
  total: number,
  setActiveIndex: (index: number) => void
) => {
  const nextIndex = getNextIndex(direction, activeIndex, total);
  scrollToIndex(container, nextIndex, setActiveIndex);
};
