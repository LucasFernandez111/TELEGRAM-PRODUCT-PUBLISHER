interface Price {
  price: string;
  code: string;
  url: string; // Nueva propiedad
}

interface Yupoo {
  titleCode: string;
  href: string;
}

interface ImagePath {
  url: string;
  images: string;
}

interface Combined {
  price: string;
  code: string;
  href: string;
  images: string;
  url: string; // Nueva propiedad
}

export const combineData = (
  prices: Price[],
  yupoo: Yupoo[],
  imagesPath: ImagePath[]
): Combined[] => {
  return prices
    .map((price) => {
      const yupooEntry = yupoo.find((y) => y.titleCode === price.code);
      const imagePathEntry = yupooEntry
        ? imagesPath.find((img) => img.url === yupooEntry.href)
        : null;

      if (
        price.price &&
        price.code &&
        price.url && // Verifica la nueva propiedad
        yupooEntry &&
        yupooEntry.href &&
        imagePathEntry &&
        imagePathEntry.images
      ) {
        return {
          price: price.price,
          code: price.code,
          href: yupooEntry.href,
          images: imagePathEntry.images,
          url: price.url, // Añade la nueva propiedad
        };
      } else {
        return null;
      }
    })
    .filter((item): item is Combined => item !== null);
};
