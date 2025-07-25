import { useEffect, useState } from "react";
import { useErrorHandler } from "../../../hooks/useErrorHandler";
import { Booking, PaginatedResponse } from "../../../mocks/types";
import { API_DOMAIN } from "../../../const";
import AdminPanel from "../AdminPanel";
import LoadingSpinner from "../../../components/LoadingSpinner";
import AdminTablePanel from "../AdminTablePanel";
import AdminEditBookingModal from "../modals/AdminEditBookingModal";

export default function AdminBookingsPanel() {
  const {executeWithErrorHandling} = useErrorHandler();

  const [bookings, setBookings] = useState<PaginatedResponse<Booking>>();
  const [isOpenedModal, setIsOpenedModal] = useState<boolean>(false);
  const [editedBooking, setEditedBooking] = useState<Booking | null>(null);

  const fetchBookings = async (page: number = 0, limit: number = 10) => {
    executeWithErrorHandling(
      async () => {
        const res = await fetch(API_DOMAIN + `/bookings?page=${page}&limit=${limit}`);
        if (!res.ok) {
          throw new Error(`Erreur ${res.status}: ${res.statusText}`);
        }
        const bookingsData: PaginatedResponse<Booking> = await res.json();
        return bookingsData;
      },
      bookingsData => {
        setBookings(bookingsData);
      }
    );
  };

  const deleteBooking = async (booking: Booking) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) return;

    executeWithErrorHandling(
      async () => {
        const res = await fetch(API_DOMAIN + "/bookings/" + booking.id, {method: "DELETE"});
        if (!res.ok) {
          throw new Error(`Erreur ${res.status}: ${res.statusText}`);
        }
      },
      () => {
        if (bookings === undefined) return;
        const newBookings = {...bookings}
        newBookings.data = bookings.data.filter(b => b.id !== booking.id);
        setBookings(newBookings);
      }
    );
  };

  const openModal = (booking: Booking) => {
    setEditedBooking(booking);
    setIsOpenedModal(true);
  }
  
  const onDeleteModal = () => {
    if (bookings === undefined || editedBooking === null) return;
    const newBookings = {...bookings}
    newBookings.data = bookings.data.filter(booking => booking.id !== editedBooking.id);
    setBookings(newBookings);
  }

  const onEditModal = (booking: Booking) => {
    if (bookings === undefined) return;
    const newBookings = bookings.data.map(b => {
      return booking.id === b.id ? booking : b;
    });
    setBookings({...bookings, data: newBookings})
  }

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <AdminPanel title="Réservations">
      {bookings === undefined ? (
              <LoadingSpinner
                message="Chargement des utilisateurs..."
                size="large"
              />
            ) : (
              <>
                <AdminTablePanel
                  tableHeaders={["ID", "Session", "Client", "Participants", "Créée le", "Statut", "Actions"]}
                  data={bookings}
                  updateData={fetchBookings}
                  hiddenProps={["slotId"]}
                  handleAction={openModal}
                  handleDelete={deleteBooking}
                />
                <AdminEditBookingModal
                  isOpened={isOpenedModal}
                  setIsOpened={setIsOpenedModal}
                  editedBooking={editedBooking}
                  setEditedBooking={setEditedBooking}
                  onDelete={onDeleteModal}
                  onEdit={onEditModal}
                />
              </>
            )}
    </AdminPanel>
  );
}