import { useEffect, useContext } from "react";

import { instagramApiGetUser } from "../../../api/instagramApiGetUser";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { UIContext } from "../../../contexts/UIContext";
import { MenuConfigMobile } from "../../../ui/components/MenuConfig/Mobile/MenuConfigMobile";
import { useMediaMatch } from "../../../hooks/useMediaMatch";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileActions } from "./ProfileActions";
import { ProfileImages } from "./ProfileImages";
import { ProfileContext } from "../../../contexts/ProfileContext";

export const Profile = () => {
  const { id: urlUsername } = useParams();
  const { user } = useContext(AuthContext);
  const { setAlertOpen } = useContext(UIContext);
  const { setUserProfile } = useContext(ProfileContext);
  const { matchMediaQuery } = useMediaMatch(1024);
  const navigate = useNavigate();

  const getProfileUser = async () => {
    const request = await instagramApiGetUser(urlUsername!);

    if (request.hasOwnProperty("response")) {
      setAlertOpen(
        "error",
        "¡Oh, algo salio mal!",
        request.response.data.message,
        "bg-red-600"
      );
      return navigate("/not-found");
    }

    const userData = request.payload;

    setUserProfile(userData);
  };

  useEffect(() => {
    getProfileUser();
  }, [urlUsername]);

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
