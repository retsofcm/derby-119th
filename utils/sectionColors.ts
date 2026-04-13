export const getSectionColor = (pathname: string) => {
  if (pathname.includes('/squirrels')) return '#e22e12';
  if (pathname.includes('/beavers')) return '#006ddf';
  if (pathname.includes('/cubs')) return '#23a950';
  if (pathname.includes('/scouts')) return '#004851';
  return '#20115C'; // Group Purple default
};
