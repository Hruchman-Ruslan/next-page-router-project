import { createContext, useState } from "react";

import { Notification } from "@/types/notification";

interface NotificationContextProps {
  notification: Notification | null;
  showNotification: (notification: Notification) => void;
  hideNotification: () => void;
}

const NotificationContext = createContext<NotificationContextProps>({
  notification: null, // {title, message, status}
  showNotification: function (notificationData) {},
  hideNotification: function () {},
});

interface NotificationContextProviderProps {
  children: React.ReactNode;
}

export function NotificationContextProvider({
  children,
}: NotificationContextProviderProps) {
  const [activeNotification, setActiveNotification] =
    useState<Notification | null>(null);

  function showNotificationHandler(notificationData: Notification) {
    setActiveNotification(notificationData);
  }

  function hideNotificationHandler() {
    setActiveNotification(null);
  }

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
