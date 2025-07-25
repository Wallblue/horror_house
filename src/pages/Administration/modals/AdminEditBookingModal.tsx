import { useEffect, useState } from "react";
import { useErrorHandler } from "../../../hooks/useErrorHandler";
import { Booking, BookingPatch } from "../../../mocks/types";
import { API_DOMAIN } from "../../../const";
import AdminModal from "./AdminModal";
import { TextField } from "@mui/material";

interface AdminBookingModalProps{
  isOpened: boolean;
  setIsOpened: (item: boolean) => void;
  editedBooking: Booking | null;
  setEditedBooking: (booking: Booking | null) => void;
  onEdit?: (booking: Booking) => void;
  onDelete?: () => void;
}

export default function AdminEditBookingModal({isOpened, setIsOpened, editedBooking, setEditedBooking, onDelete = ()=>{}, onEdit = ()=>{}} : AdminBookingModalProps) {
  const {executeWithErrorHandling} = useErrorHandler();
  const [editFormData, setEditFormData] = useState<BookingPatch>({});

  const deleteBooking = async () => {
    if (!editedBooking || !window.confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) return;

    executeWithErrorHandling(
      async () => {
        const res = await fetch(API_DOMAIN + "/bookings/" + editedBooking.id, {method: "DELETE"});
        if (!res.ok)
          throw new Error(`Erreur ${res.status}: ${res.statusText}`);
      },
      () => {
        onDelete();
        setEditedBooking(null);
        setIsOpened(false);
      },
    );
  };

  const editBooking = async () => {
    if (!editFormData || !editedBooking) return;

    executeWithErrorHandling(
      async () => {
        const res = await fetch(API_DOMAIN + "/bookings/" + editedBooking.id, {
          method: "PATCH",
          body: JSON.stringify(editFormData),
        });
        if (!res.ok) {
          throw new Error(`Erreur ${res.status}: ${res.statusText}`);
        }
        return await res.json() as Booking;
      },
      (booking) => {
        setEditedBooking(booking);
        onEdit(booking);
        setIsOpened(false);
      },
    );
  };

  useEffect(() => {
    setEditFormData(editedBooking ?? {});
  }, [editedBooking]);

  return editedBooking && (
    <AdminModal
      title={"Modification de la réservation ID " + editedBooking.id}
      isOpened={isOpened}
      setIsOpened={setIsOpened}
      item={editedBooking}
      handleDelete={deleteBooking}
      handleEdit={editBooking}
    >
      <TextField
        margin="normal"
        fullWidth
        label="Email du client"
        value={editFormData.customerEmail ?? ""}
        onChange={(e) =>
          setEditFormData({ ...editFormData, customerEmail: e.target.value })
        }
      />
    </AdminModal>
  );
}