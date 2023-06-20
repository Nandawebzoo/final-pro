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

const updateRole = async (role, token) => {
  await axios.post(
    `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-user-role/${role.id}`,
    role,
    {
      headers: {
        apiKey: import.meta.env.VITE_API_KEY,
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const updatePromo = async (promo, token) => {
  await axios.post(
    `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-promo/${promo.id}`,
    promo,
    {
      headers: {
        apiKey: import.meta.env.VITE_API_KEY,
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const getPromos = async () => {
  const response = await axios.get(
    `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos`,
    {
      headers: {
        apiKey: import.meta.env.VITE_API_KEY,
      },
    }
  );

  return response.data.data;
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

const addPromo = async (promo, token) => {
  await axios.post(
    `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-promo`,
    promo,
    {
      headers: {
        apiKey: import.meta.env.VITE_API_KEY,
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const deletePromo = async (token) => {
  await axios.delete(
    `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-promo/${promoId}`,
    {
      headers: {
        apiKey: import.meta.env.VITE_API_KEY,
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const getUsers = async (token) => {
  const response = await axios.get(
    `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-user`,
    {
      headers: {
        apiKey: import.meta.env.VITE_API_KEY,
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.data;
};

export const travelService = {
  uploadImage,
  addCategory,
  createActivity,
  addPromo,
  getCategories,
  getActivities,
  getPromos,
  updateCategory,
  updateActivity,
  updatePromo,
  deleteCategory,
  deleteActivity,
  deletePromo,
  getUsers,
  updateRole,
};
