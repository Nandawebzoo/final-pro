import React, { useEffect, useState, useContext } from "react";
import { Table, Button } from "react-bootstrap";
import { travelService } from "../services/travelService";
import { SessionContext } from "../App";
import EditUserModal from "../components/EditUserModal";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const session = useContext(SessionContext);

  useEffect(() => {
    if (session) {
      fetchUsers(session.token);
    }
  }, [session]);

  const edit = (user) => {
    setEditUser(user);
    setShowModal(true);
  };

  const fetchUsers = async (token) => {
    const users = await travelService.getUsers(token);
    console.log(users);
    setUsers(users);
  };

  const add = () => {
    setShowAddUserModal(true);
  };

  const onHideUser = (user) => {
    if (user) {
      const index = users.findIndex((x) => x.id === user.id);

      const newUsers = [...users];
      newUsers[index] = user;

      setUsers(newUsers);
    }

    setShowModal(false);
  };
  return (
    <>
      <div className="add-user-btn">
        <Button onClick={() => add(true)}>Add User</Button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th className="hide-sx">Image</th>
            <th className="hide-sx">Email</th>
            <th className="hide-sx">Phone Number</th>
            <th className="hide-sx">Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users?.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td className="hide-sx">
                <img
                  src={item.profilePictureUrl}
                  className="img-admin"
                  style={{ width: "120px", height: "80px" }}
                />
              </td>
              <td className="hide-sx">{item.email}</td>
              <td className="hide-sx">{item.phoneNumber}</td>
              <td className="hide-sx">{item.role}</td>
              <td className="user-edit-btn">
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <Button variant="warning" onClick={() => edit(item)}>
                    Edit Role
                  </Button>
                  <Button variant="danger" onClick={() => setDeleteUser(item)}>
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <EditUserModal
        show={showModal}
        onHide={(user) => onHideUser(user)}
        user={editUser}
      />
    </>
  );
}

export default AdminUsers;
