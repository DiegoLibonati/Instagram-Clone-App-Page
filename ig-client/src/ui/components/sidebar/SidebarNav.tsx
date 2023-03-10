import { SidebarHeader } from "./SidebarHeader";
import { GiHamburgerMenu } from "react-icons/gi";
import { SidebarItem } from "./SidebarItem";
import { useContext } from "react";
import { UIContext } from "../../../contexts/UIContext";
import { SidebarItems } from "./SidebarItems";
import { SearchContext } from "../../../contexts/SearchContext";
import { SidebarSearch } from "./SidebarSearch/SidebarSearch";
import { SidebarNotifications } from "./SidebarNotifications/SidebarNotifications";
import { NotificationsContext } from "../../../contexts/NotificationsContext";

export const SidebarNav = () => {
  const { menuConfig, setMenuConfigOpen, setMenuConfigClose } =
    useContext(UIContext);

  const { activeSearch } = useContext(SearchContext);
  const { openNotifications } = useContext(NotificationsContext);

  const handleMore = () => {
    if (!menuConfig.isOpen) return setMenuConfigOpen();

    return setMenuConfigClose();
  };

  return (
    <nav className="flex items-start justify-start h-screen w-full flex-col relative">
      {!activeSearch && !openNotifications && (
        <>
          <SidebarHeader></SidebarHeader>
          <SidebarItems></SidebarItems>
          <div className="flex flex-row w-full h-auto items-center justify-start absolute bottom-6 pl-4">
            <SidebarItem onClick={handleMore} text="Mas">
              <GiHamburgerMenu size={25} color="black"></GiHamburgerMenu>
            </SidebarItem>
          </div>
        </>
      )}

      {activeSearch && <SidebarSearch></SidebarSearch>}
      {openNotifications && <SidebarNotifications></SidebarNotifications>}
    </nav>
  );
};
