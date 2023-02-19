import { createContext, useEffect, useState } from "react";

interface UIContextProps {
  children: React.ReactNode;
}

export const UIContext = createContext<null | any>(null);

export const UIProvider: React.FunctionComponent<UIContextProps> = ({
  children,
}) => {
  const [modal, setModal] = useState({
    isOpen: false,
    type: "",
  });

  const setModalClose = (): void => {
    setModal({ ...modal, isOpen: false, type: "" });
  };

  const setModalOpen = (type: string): void => {
    return setModal({
      ...modal,
      isOpen: true,
      type: type,
    });
  };

  // UseEffects

  useEffect(() => {
    if (modal.isOpen) document.body.style.overflowY = "hidden";
    else document.body.style.overflowY = "auto";
  }, [modal]);

  return (
    <UIContext.Provider value={{ modal, setModalClose, setModalOpen }}>
      {children}
    </UIContext.Provider>
  );
};