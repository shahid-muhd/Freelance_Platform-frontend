import { Notification, Project, WorkProfile } from "@/utils/types/types";
import { create } from "zustand";

interface NotificationStore {
  notificationSheetState: boolean;
  notifications: Notification[];
  addNotifications: (notifications: Notification[]) => void;
  removeNotifications: (profileId: string) => void;
  toggleNotificationSheet: (isOpen: boolean) => void;
  //   updateWorkProfiles: (updatedProfile: WorkProfile) => void;
}

const useNotificationStore = create<NotificationStore>((set) => ({
  notificationSheetState: false,
  notifications: [],
  addNotifications: (newNotifications) => {
    set(() => ({
      notifications: [...newNotifications],
    }));
  },
  removeNotifications: (notificationId) =>
    set((state) => ({
      notifications: state.notifications.filter(
        (notification) => notification.id !== notificationId
      ),
    })),
  toggleNotificationSheet: (isOpen) =>
    set(() => ({
      notificationSheetState: isOpen,
    })),
  //   updateWorkProfiles: (updatedProfile) =>
  //     set((state) => ({
  //       notifications: state.notifications.map((profile) =>
  //         profile.id === updatedProfile.id ? updatedProfile : profile
  //       ),
  //     })),
}));

export default useNotificationStore;
