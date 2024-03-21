export function getUniqId(items: any[]) {
  if (!items.length) return 0;
  let max = items.reduce((acc, curr) => (acc.id > curr.id ? acc : curr));
  const maxId = max.id + 1;
  return maxId;
}
