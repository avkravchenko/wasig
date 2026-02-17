export interface Hobby {
  id: number;
  name: string;
  category: string;
  isCustom: boolean;
}

export interface CustomHobby {
  id: string;
  name: string;
}

export interface CategoriesWithHobbies {
  category: string;
  interests: Hobby[];
}
