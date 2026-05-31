type ImageExt = 'jpg' | 'png';

export const getCategoryImageSrc = (
  sectionName: string,
  categoryName: string,
  ext: ImageExt = 'jpg',
): string => `/images/${sectionName}/${categoryName}/${categoryName}.${ext}`;

export const getArticleImageSrc = (
  sectionName: string,
  categoryName: string,
  articleName: string,
  ext: ImageExt = 'jpg',
): string => `/images/${sectionName}/${categoryName}/${articleName}.${ext}`;

export const getImageSrc = (
  item: {
    sectionName: string;
    categoryName: string;
    articleName?: string;
  },
  ext: ImageExt = 'jpg',
): string =>
  item.articleName
    ? getArticleImageSrc(item.sectionName, item.categoryName, item.articleName, ext)
    : getCategoryImageSrc(item.sectionName, item.categoryName, ext);

export const getSectionImageSrc = (
  sectionName: string,
  ext: ImageExt = 'jpg',
): string => `/images/${sectionName}/${sectionName}.${ext}`;
