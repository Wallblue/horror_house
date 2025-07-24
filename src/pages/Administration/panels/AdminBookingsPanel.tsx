import { useEffect, useState } from "react";
import { useErrorHandler } from "../../../hooks/useErrorHandler";
import { Booking, PaginatedResponse } from "../../../mocks/types";
import { API_DOMAIN } from "../../../const";
import AdminPanel from "../AdminPanel";
import LoadingSpinner from "../../../components/LoadingSpinner";
import AdminTablePanel from "../AdminTablePanel";

export default function AdminBookingsPanel() {
  const {executeWithErrorHandling} = useErrorHandler();
  const [bookings, setBookings] = useState<PaginatedResponse<Booking>>();

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
              <AdminTablePanel
                tableHeaders={["ID", "Session", "Client", "Participants", "Créée le", "Statut", "Actions"]}
                data={bookings}
                updateData={fetchBookings}
                hiddenProps={["slotId"]}
                readonlyTable
              />
            )}
    </AdminPanel>
  );
}