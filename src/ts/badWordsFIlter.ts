import Filter from 'bad-words';

const filter = new Filter();

export const isContentClean = (content: any) => {
  return !filter.isProfane(content);
};
