export const getBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      resolve(reader.result as string);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      reject(new Error('No file provided'));
    }
  });
};
