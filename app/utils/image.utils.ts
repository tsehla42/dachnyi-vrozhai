import fs from 'fs';
import path from 'path';

const getAllImagesInDirectory = (directoryPath: string, images: string[] = []) => {
  const files = fs.readdirSync(directoryPath);

  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);
    const fileStats = fs.statSync(filePath);

    if (fileStats.isDirectory()) {
      // If it's a directory, recursively call the function
      getAllImagesInDirectory(filePath, images);
    } else {
      // If it's a file, check if it's an image file
      if (isImageFile(filePath)) {
        images.push(file);
      }
    }
  });

  return images;
};

const isImageFile = (filePath: string) => {
  const imageExtensions = ['.jpg', '.jpeg', '.png'];
  const extname = path.extname(filePath).toLowerCase();
  return imageExtensions.includes(extname);
};

export const getAllImagesOnServer = (directoryPath = 'public/images') => {
  return getAllImagesInDirectory(directoryPath);
};

export const getImageSrcForCategory = (categoryNameUkr: string, isCategory: boolean, images: string[]) => {
  const pictureName = categoryNameUkr.toLowerCase().split(' ').join('-');
  const pictureNameWithExtension = `${pictureName}.jpg`;
  const doesImageExist = images.includes(pictureNameWithExtension);
  const { pictureSrc, fallbackPictureSrc } = createPictureSrc(pictureNameWithExtension, isCategory);

  return doesImageExist ? pictureSrc : fallbackPictureSrc;
};

const createPictureSrc = (pictureNameWithExtension: string, isCategory: boolean) => {
  const basePath = '/images';
  const pathPrefix = isCategory ? 'categories' : 'articles/preview';
  const fallbackPictureSrc = '/images/fallback/fallback-200x200.jpg';
  const pictureSrc = `${basePath}/${pathPrefix}/${pictureNameWithExtension}`;

  return { pictureSrc, fallbackPictureSrc };
};
