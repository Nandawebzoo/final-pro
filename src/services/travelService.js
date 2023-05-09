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
    category,
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
    category,
    {
      headers: {
        apiKey: import.meta.env.VITE_API_KEY,
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const deleteCategory = async (categoryId, token) => {
  await axios.delete(
    `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-category/${categoryId}`,
    {
      headers: {
        apiKey: import.meta.env.VITE_API_KEY,
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const getCategories = async () => {
  const response = await axios.get(
    `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories`,
    {
      headers: {
        apiKey: import.meta.env.VITE_API_KEY,
      },
    }
  );

  return response.data.data;
};

const getActivities = async () => {
  const response = await axios.get(
    `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities`,
    {
      headers: {
        apiKey: import.meta.env.VITE_API_KEY,
      },
    }
  );

  return response.data.data;
};

const createActivity = async (activity, token) => {
  await axios.post(
    `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-activity`,
    activity,
    {
      headers: {
        apiKey: import.meta.env.VITE_API_KEY,
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const updateActivity = async (activity, token) => {
  await axios.post(
    `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-activity/${activity.id}`,
    activity,
    {
      headers: {
        apiKey: import.meta.env.VITE_API_KEY,
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const deleteActivity = async (activityId, token) => {
  await axios.delete(
    `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-activity/${activityId}`,
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
  deleteCategory,
  getCategories,
  getActivities,
  createActivity,
  updateActivity,
  deleteActivity,
};
