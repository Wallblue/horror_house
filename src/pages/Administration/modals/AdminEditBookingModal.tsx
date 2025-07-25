import { useEffect, useState } from "react";
import { useErrorHandler } from "../../../hooks/useErrorHandler";
import { Booking, BookingPatch, Room } from "../../../mocks/types";
import { API_DOMAIN, BOOKING_STATUS } from "../../../const";
import AdminModal from "./AdminModal";
import { TextField } from "@mui/material";
import SelectInput from "../../../components/SelectInput";

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
  const [sessions, setSessions] = useState<Room[]>([]);

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

  const fetchSessions = async () => {
    executeWithErrorHandling(
      async () => {
        const res = await fetch(API_DOMAIN + `/rooms?limit=100`);
        if (!res.ok) {
          throw new Error(`Erreur ${res.status}: ${res.statusText}`);
        }
        const roomsData: Room[] = (await res.json()).data;
        return roomsData;
      },
      (sessionsData) => {
        setSessions(sessionsData);
      }
    );
  };

  useEffect(() => {
    fetchSessions();
  }, [])

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
      <SelectInput
        label="Session"
        value={editedBooking.roomId}
        onChange={e => setEditedBooking({
          ...editedBooking,
          roomId: e.target.value,
        })}
        selectOptions={sessions.map(s => s.name)}
        optionValues={sessions.map(s => s.id)}
      />
      <TextField
        margin="normal"
        fullWidth
        label="Email du client"
        value={editFormData.customerEmail ?? ""}
        onChange={(e) =>
          setEditFormData({ ...editFormData, customerEmail: e.target.value })
        }
      />
      <SelectInput
        label="Statut"
        value={editedBooking.status}
        onChange={e => setEditedBooking({
          ...editedBooking,
          status: e.target.value,
        })}
        selectOptions={Object.values(BOOKING_STATUS)}
        optionValues={Object.keys(BOOKING_STATUS)}
      />
    </AdminModal>
  );
}