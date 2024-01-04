export const createDataURL = (file: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function () {
      const dataURL = reader.result as string;
      resolve(dataURL);
    };

    reader.onerror = function () {
      reject(new Error("Error on load"));
    };

    reader.readAsDataURL(file);
  });
};
