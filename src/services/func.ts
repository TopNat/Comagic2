
export function getUniqId(items: any[]) {
  let max = items.reduce((acc, curr) => (acc.id > curr.id ? acc : curr));
  const maxId = max.id + 1;
  return maxId;
}
