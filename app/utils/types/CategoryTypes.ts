type CategoryNameUkr = string;

type Articles = string[];

export type CategoryTemplate = [CategoryNameUkr, Articles?];

export type CategoryTemplateCollection = CategoryTemplate[];

export interface Article {
  categoryName: string;
  sectionName: string;
  label: string;
  to: string;
  articleName: string;
}

export interface Category {
  categoryName: string;
  sectionName: string;
  label: string;
  to: string;
  articles: Article[];
}
