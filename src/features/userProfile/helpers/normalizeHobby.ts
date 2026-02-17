import { CategoriesWithHobbies, Hobby } from "../model/types";

const normalizeHobbies = (hobbies: Hobby[]): CategoriesWithHobbies[] => {
  const map: Record<string, Hobby[]> = {};
  const normalizedHobbies: CategoriesWithHobbies[] = [];

  if (hobbies.length === 0) {
    return [];
  }

  hobbies.forEach((item) => {
    if (map[item.category]) {
      map[item.category].push(item);
    } else {
      map[item.category] = [item];
    }
  });

  for (const key in map) {
    normalizedHobbies.push({
      category: key,
      interests: map[key],
    });
  }

  return normalizedHobbies;
};

export default normalizeHobbies;
