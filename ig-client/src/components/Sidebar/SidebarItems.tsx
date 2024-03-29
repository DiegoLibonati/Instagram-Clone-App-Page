import { AiOutlineHome, AiOutlineMessage } from "react-icons/ai";
import { BsSearch, BsSuitHeart, BsFillSuitHeartFill } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineExplore } from "react-icons/md";
import { RxVideo } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { SidebarItem } from "./SidebarItem";
import { useContext, useMemo } from "react";
import { UIContext } from "../../contexts/Ui/UIContext";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { SearchContext } from "../../contexts/Search/SearchContext";
import { NotificationsContext } from "../../contexts/Notifications/NotificationsContext";
import { areThereNotifications } from "../../helpers/areThereNotifications";
import { instagramApiEditNotifications } from "../../api/Notifications/instagramApiEditNotifications";
import { UserImage } from "../UserImage/UserImage";

export const SidebarItems = (): JSX.Element => {
  const navigate = useNavigate();
  const uiContextStore = useContext(UIContext);
  const authContextStore = useContext(AuthContext);
  const searchContextStore = useContext(SearchContext);
  const notificationsContextStore = useContext(NotificationsContext);

  const areThereNotificationsMemo = useMemo(
    () => areThereNotifications(authContextStore?.user.notifications!),
    [authContextStore?.user.notifications]
  );

  const handleOpenNotifications = async (): Promise<void> => {
    notificationsContextStore?.setOpenNotifications(true);
    const request = await instagramApiEditNotifications();

    const notifications = request.notifications;

    authContextStore?.onLogin({ ...authContextStore?.user, notifications });
  };

  return (
    <ul className="flex flex-col items-start justify-center w-full h-auto pl-4">
      <SidebarItem text="Inicio" onClick={() => navigate("/")}>
        <AiOutlineHome size={25} color="black"></AiOutlineHome>
      </SidebarItem>
      <SidebarItem
        text="Buscar"
        onClick={() => searchContextStore?.setActiveSearch(true)}
      >
        <BsSearch size={25} color="black"></BsSearch>
      </SidebarItem>
      <SidebarItem text="Explorar" onClick={() => navigate("/explore")}>
        <MdOutlineExplore size={25} color="black"></MdOutlineExplore>
      </SidebarItem>
      <SidebarItem text="Reels">
        <RxVideo size={25} color="black"></RxVideo>
      </SidebarItem>
      <SidebarItem text="Mensajes">
        <AiOutlineMessage size={25} color="black"></AiOutlineMessage>
      </SidebarItem>
      <SidebarItem text="Notificaciones" onClick={handleOpenNotifications}>
        {!areThereNotificationsMemo.length && (
          <BsSuitHeart size={25} color="black"></BsSuitHeart>
        )}
        {areThereNotificationsMemo.length > 0 && (
          <>
            <BsFillSuitHeartFill
              size={25}
              color="red"
              className="animate-pulse"
            ></BsFillSuitHeartFill>
            <h2 className="absolute right-4 text-sm font-semibold animate-pulse">
              {areThereNotificationsMemo.length}
            </h2>
          </>
        )}
      </SidebarItem>
      <SidebarItem
        text="Crear"
        onClick={() => uiContextStore?.setModalOpen("newpublication")}
      >
        <MdOutlineAddBox size={25} color="black"></MdOutlineAddBox>
      </SidebarItem>
      <SidebarItem
        text="Perfil"
        onClick={() => navigate(`/${authContextStore?.user.username}`)}
      >
        <UserImage
          className="w-6 h-6 object-cover rounded-full"
          avatar={authContextStore?.user.avatar!}
          name={authContextStore?.user.name!}
        ></UserImage>
      </SidebarItem>
    </ul>
  );
};
