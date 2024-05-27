import { v2 as cloudinary } from 'cloudinary';
import httpError from './httpError.js';

interface Resource {
  url: string;
}

const getImagesFromFolder = async (folderName: string): Promise<string[]> => {
  try {
    const { resources } = await cloudinary.api.resources({
      type: 'upload',
      prefix: folderName,
      max_results: 15,
      context: true,
    });
    const imageUrls = resources.map((resource: Resource) => resource.url);
    return imageUrls;
  } catch (error) {
    throw httpError(404);
  }
};

export { getImagesFromFolder };
