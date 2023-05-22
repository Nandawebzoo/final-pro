import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import EditPromoModal from "../components/EditPromoModal";
import AddPromoModal from "../components/AddPromoModal";
import DeletePromoModal from "../components/DeletePromoModal";
import { travelService } from "../services/travelService";

function AdminPromos() {
  const [promos, setPromos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editPromo, setEditPromo] = useState(null);
  const [showAddPromoModal, setShowAddPromoModal] = useState(false);
  const [deletePromo, setDeletePromo] = useState(null);

  useEffect(() => {
    fetchPromos();
  }, []);

  const edit = (promo) => {
    setEditPromo(promo);
    setShowModal(true);
  };

  const fetchPromos = async () => {
    const promos = await travelService.getPromos();

    setPromos(promos);
  };

  const add = () => {
    setShowAddPromoModal(true);
  };

  const onHidePromo = (promo) => {
    if (promo) {
      const index = promos.findIndex((x) => x.id === promo.id);

      const newPromos = [...promos];
      newPromos[index] = promo;

      setPromos(newPromos);
    }

    setShowModal(false);
  };

  return (
    <>
      <div className="add-promo-btn">
        <Button onClick={() => add(true)}>Add Promo</Button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th className="hide-sx">Image</th>
            <th className="hide-sx">Description</th>
            <th className="hide-sx">Promo Code</th>
            <th className="hide-sx">Discount Price</th>
            <th className="hide-sx">Minimun Claim Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {promos?.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td className="hide-sx">
                <img
                  src={item.imageUrl}
                  className="img-admin"
                  style={{ width: "120px", height: "80px" }}
                />
              </td>
              <td className="hide-sx">{item.description}</td>
              <td className="hide-sx">{item.promo_code}</td>
              <td className="hide-sx">{item.promo_discount_price}</td>
              <td className="hide-sx">{item.minimum_claim_price}</td>
              <td className="promo-edit-btn">
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <Button variant="warning" onClick={() => edit(item)}>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => setDeletePromo(item)}>
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <EditPromoModal
        show={showModal}
        onHide={(promo) => onHidePromo(promo)}
        promo={editPromo}
      />
      <AddPromoModal
        show={showAddPromoModal}
        onHide={(success) => {
          if (success === true) {
            fetchPromos(); // update the list
          }
          setShowAddPromoModal(false);
        }}
      />
      <DeletePromoModal
        show={deletePromo !== null}
        onHide={(promoId) => {
          if (promoId) {
            const newPromos = promos.filter((promo) => promo.id !== promoId);
            setPromos(newPromos);
          }

          setDeletePromo(null);
        }}
        promo={deletePromo}
      />
    </>
  );
}

export default AdminPromos;
