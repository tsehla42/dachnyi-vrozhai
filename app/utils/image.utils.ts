export const getCategoryImageSrc = (
  sectionName: string,
  categoryName: string,
): string => `/images/${sectionName}/${categoryName}/${categoryName}.jpg`;

export const getArticleImageSrc = (
  sectionName: string,
  categoryName: string,
  articleName: string,
): string => `/images/${sectionName}/${categoryName}/${articleName}.jpg`;

export const getImageSrc = (item: {
  sectionName: string;
  categoryName: string;
  articleName?: string;
}): string =>
  item.articleName
    ? getArticleImageSrc(item.sectionName, item.categoryName, item.articleName)
    : getCategoryImageSrc(item.sectionName, item.categoryName);
