import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import EditModal from "../components/EditModal";
import AddCategoryModal from "../components/AddCategoryModal";
import DeleteCategoryModal from "../components/DeleteCategoryModal";
import { travelService } from "../services/travelService";

function AdminCategories() {
  const [categories, setCategories] = useState([]); // There is useState to store categories array
  const [showModal, setShowModal] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState(null);

  useEffect(() => {
    // Use useEffect to get data from the API
    fetchCategories();
  }, []);

  const edit = (category) => {
    setEditCategory(category);
    setShowModal(true);
  };

  const fetchCategories = async () => {
    const categories = await travelService.getCategories();

    setCategories(categories); // set the data and store it in the state
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
      <div className="add-category-btn">
        <Button onClick={() => add(true)}>Add Category</Button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Image</th>
            <th style={{ gap: "1rem" }}>Actions</th>
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
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <Button variant="warning" onClick={() => edit(item)}>
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => setDeleteCategory(item)}
                  >
                    Delete
                  </Button>
                </div>
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
            fetchCategories(); // update the list
          }
          setShowAddCategoryModal(false);
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
          }

          setDeleteCategory(null);
        }}
        category={deleteCategory}
      />
    </>
  );
}
export default AdminCategories;
