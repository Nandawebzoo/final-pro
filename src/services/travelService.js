import axios from "axios";

const uploadImage = async (image, token) => {
  const formData = new FormData();
  formData.append("image", image);
  const response = await axios.post(
    `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        apiKey: import.meta.env.VITE_API_KEY,
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.url;
};

const updateCategory = async (category, token) => {
  await axios.post(
    `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-category/${category.id}`,
    {
      name: category.name,
      imageUrl: category.imageUrl,
    },
    {
      headers: {
        apiKey: import.meta.env.VITE_API_KEY,
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const addCategory = async (category, token) => {
  await axios.post(
    `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-category`,
    {
      name: category.name,
      imageUrl: category.imageUrl,
    },
    {
      headers: {
        apiKey: import.meta.env.VITE_API_KEY,
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const travelService = {
  uploadImage,
  updateCategory,
  addCategory,
};
