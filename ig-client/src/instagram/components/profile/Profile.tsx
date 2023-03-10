import { useEffect, useContext, useCallback } from "react";
import { instagramApiGetUser } from "../../../api/instagramApiGetUser";
import { useNavigate, useParams } from "react-router-dom";
import { UIContext } from "../../../contexts/UIContext";
import { MenuConfigMobile } from "../../../ui/components/MenuConfig/Mobile/MenuConfigMobile";
import { useMediaMatch } from "../../../hooks/useMediaMatch";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileActions } from "./ProfileActions";
import { ProfileImages } from "./ProfileImages";
import { ProfileContext } from "../../../contexts/ProfileContext";
import { useProfileUser } from "../../hooks/useProfileUser";
import { instagramApiSetRecentUserSearch } from "../../../api/instagramApiSetRecentUserSearch";
import { AuthContext } from "../../../contexts/AuthContext";

export const Profile = () => {
  const { id: urlUsername } = useParams();
  const { setAlertOpen } = useContext(UIContext);
  const { setUserForeignProfile } = useContext(ProfileContext);
  const { onLogin } = useContext(AuthContext);
  const { isMainUser } = useProfileUser();
  const { matchMediaQuery } = useMediaMatch(1024);
  const navigate = useNavigate();

  const getProfileUser = useCallback(async () => {
    const foreignRequest = await instagramApiGetUser(urlUsername!);
    const authRequest = await instagramApiSetRecentUserSearch(urlUsername!);
    if (foreignRequest.hasOwnProperty("response")) {
      setAlertOpen(
        "error",
        "¡Oh, algo salio mal!",
        foreignRequest.response.data.message,
        "bg-red-600"
      );
      return navigate("/not-found");
    }

    const foreignUserData = foreignRequest.payload;
    const authUserData = authRequest.payload;

    setUserForeignProfile(foreignUserData);
    onLogin(authUserData);
  }, [navigate, setAlertOpen, setUserForeignProfile, urlUsername]);

  useEffect(() => {
    if (!isMainUser) {
      getProfileUser();
    }
  }, [urlUsername, getProfileUser, isMainUser]);

  return (
    <>
      {!matchMediaQuery && <MenuConfigMobile></MenuConfigMobile>}

      <main className="flex items-start justify-start flex-col w-full h-full pt-14 lg:w-[80%] lg:absolute lg:right-0 lg:px-20 2xl:px-40 lg:pt-5 lg:items-center">
        <ProfileHeader></ProfileHeader>
        <ProfileActions></ProfileActions>
        <ProfileImages></ProfileImages>
      </main>
    </>
  );
};
