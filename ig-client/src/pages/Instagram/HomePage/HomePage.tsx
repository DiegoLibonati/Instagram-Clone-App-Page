import { useContext, useMemo } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { BsSuitHeart, BsFillSuitHeartFill } from "react-icons/bs";
import { MdOutlineAddBox } from "react-icons/md";
import { Link } from "react-router-dom";
import { instagramApiEditNotifications } from "../../../api/Notifications/instagramApiEditNotifications";
import { InstagramBlack } from "../../../assets/Global/images";
import { CommentsMobile } from "../../../components/Comments/Mobile/CommentsMobile";
import { Feed } from "../../../components/Feed/Feed";
import { FooterMobile } from "../../../components/Footer/Mobile/FooterMobile";
import { ModalPublication } from "../../../components/Modal/ModalPublication/ModalPublication";
import { NavBarMobile } from "../../../components/NavBar/Mobile/NavBarMobile";
import { Notifications } from "../../../components/Notifications/Mobile/Notifications";
import { Sidebar } from "../../../components/Sidebar/Sidebar";
import { Suggetions } from "../../../components/Suggestions/Suggetions";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { NotificationsContext } from "../../../contexts/Notifications/NotificationsContext";
import { UIContext } from "../../../contexts/Ui/UIContext";
import { areThereNotifications } from "../../../helpers/areThereNotifications";
import { useMediaMatch } from "../../../hooks/useMediaMatch";
import { Notification } from "../../../types/types";

export const HomePage = (): JSX.Element => {
  const { matchMediaQuery } = useMediaMatch(1024);
  const uiContextStore = useContext(UIContext);
  const notificationsContextStore = useContext(NotificationsContext);
  const authContextstore = useContext(AuthContext);

  const areThereNotificationsMemo = useMemo(
    () => areThereNotifications(authContextstore?.user?.notifications!),
    [authContextstore?.user?.notifications]
  );

  const handleOpenNotifications = async (): Promise<void> => {
    notificationsContextStore?.setOpenNotifications(true);
    const request = await instagramApiEditNotifications();

    const notifications: Notification[] = request.notifications;

    authContextstore?.onLogin({ ...authContextstore?.user, notifications });
  };

  return (
    <>
      <NavBarMobile
        classNameHeader={"lg:hidden fixed bg-white w-screen top-0 z-[9999999]"}
        classNameNav={
          "flex items-center justify-between flex-row w-full p-2 h-14"
        }
      >
        <Link to="/">
          <img
            src={InstagramBlack}
            alt="instagram"
            className="w-28 h-auto object-cover"
          ></img>
        </Link>

        <div className="flex items-center justify-between flex-row">
          <MdOutlineAddBox
            color="black"
            size={25}
            className="mx-2"
            onClick={() => uiContextStore?.setModalOpen("newpublication")}
          ></MdOutlineAddBox>
          {!areThereNotificationsMemo.length && (
            <BsSuitHeart
              color="black"
              size={25}
              className="mx-2"
              onClick={handleOpenNotifications}
            ></BsSuitHeart>
          )}

          {areThereNotificationsMemo.length > 0 && (
            <BsFillSuitHeartFill
              color="red"
              size={25}
              className="mx-2 animate-pulse"
              onClick={() =>
                notificationsContextStore?.setOpenNotifications(true)
              }
            ></BsFillSuitHeartFill>
          )}

          <AiOutlineMessage
            color="black"
            size={25}
            className="mx-2"
          ></AiOutlineMessage>
        </div>
      </NavBarMobile>
      {matchMediaQuery && <Sidebar></Sidebar>}

      <main className="mt-14 mb-14 bg-white flex items-center justify-start flex-col w-screen h-auto mx-2 lg:min-h-screen lg:m-0 lg:pt-8 lg:flex-row lg:w-[80%] lg:absolute lg:right-0 lg:justify-center lg:items-start">
        <Feed></Feed>

        {matchMediaQuery && <Suggetions></Suggetions>}
      </main>
      {!matchMediaQuery && <Notifications></Notifications>}
      {!matchMediaQuery && <CommentsMobile></CommentsMobile>}
      {matchMediaQuery &&
        uiContextStore?.modal.isOpen &&
        uiContextStore?.modal.type === "publication" && (
          <ModalPublication></ModalPublication>
        )}

      <FooterMobile></FooterMobile>
    </>
  );
};
