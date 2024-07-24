// store/notificationStore.ts
import { create } from "zustand";
import { AppointmentResponse } from "@/types";

// Interface pour le store
interface NotificationState {
  appointmentsNotifs: AppointmentResponse[];
  totalNotif: number;
  addNotification: (notification: AppointmentResponse) => void;
}

// Créez le store Zustand
const useNotificationStore = create<NotificationState>((set) => ({
  appointmentsNotifs: [],
  totalNotif: 0,
  addNotification: (notification: AppointmentResponse) =>
    set((state) => {
      const newNotifications = [...state.appointmentsNotifs, notification];
      // Exécuter la notification sonore
      return {
        appointmentsNotifs: newNotifications,
        totalNotif: newNotifications.length,
      };
    }),
}));

export default useNotificationStore;
