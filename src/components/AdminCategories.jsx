import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import EditModal from "../components/EditModal";
import AddCategoryModal from "../components/AddCategoryModal";
import DeleteCategoryModal from "../components/DeleteCategoryModal";

function AdminCategories() {
  const [categories, setCategories] = useState([]); // There is useState to store categories array
  const [showModal, setShowModal] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState(null);

  useEffect(() => {
    // Use useEffect to get data from the API
    const fetchCategories = async () => {
      const response = await axios.get(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories`,
        {
          headers: {
            apiKey: import.meta.env.VITE_API_KEY,
          },
        }
      );

      setCategories(response.data.data); // set the data and store it in the state
    };

    fetchCategories(); // Execute or run the function
  }, []);

  const edit = (category) => {
    setEditCategory(category);
    setShowModal(true);
  };

  const add = () => {
    setShowAddCategoryModal(true);
  };

  const onHideCategory = (category) => {
    if (category) {
      // update it on the categories array
      const index = categories.findIndex((x) => x.id === category.id);

      const newCategories = [...categories];
      newCategories[index] = category;

      setCategories(newCategories);
    }

    setShowModal(false);
  };

  return (
    <>
      <h3>Categories</h3>
      <div className="add-category-btn">
        <Button onClick={() => add(true)}>Add Category</Button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>
                <img src={item.imageUrl} style={{ width: 100 }} />
              </td>
              <td>
                <Button variant="warning" onClick={() => edit(item)}>
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => setDeleteCategory(item)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <EditModal
        show={showModal}
        onHide={(category) => onHideCategory(category)}
        category={editCategory}
      />
      <AddCategoryModal
        show={showAddCategoryModal}
        onHide={(success) => {
          if (success === true) {
            window.location.reload();
          } else {
            setShowAddCategoryModal(false);
          }
        }}
      />
      <DeleteCategoryModal
        show={deleteCategory !== null}
        onHide={(categoryId) => {
          if (categoryId) {
            // Remove from category list
            const newCategories = categories.filter(
              (category) => category.id !== categoryId
            );
            setCategories(newCategories);
          } else {
            setDeleteCategory(null);
          }
        }}
        category={deleteCategory}
      />
    </>
  );
}
export default AdminCategories;
