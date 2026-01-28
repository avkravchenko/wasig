export interface Town {
  id: number;
  name: string;
  region: string;
}

export interface Hobby {
  id: number;
  name: string;
  category: string;
  isCustom: boolean;
}


export interface CategoriesWithHobbies {
  category: string;
  interests: Hobby[];
}
