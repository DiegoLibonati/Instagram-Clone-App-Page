import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../contexts/Auth/AuthContext";
import { ProfileContext } from "../contexts/Profile/ProfileContext";

export const useProfileUser = () => {
  const { id: urlUsername } = useParams();
  const { user } = useContext(AuthContext);

  const { userForeignProfile } = useContext(ProfileContext);

  if (!urlUsername || urlUsername === undefined) return { user };

  if (urlUsername === user.username) return { user, isMainUser: true };

  return {
    user: userForeignProfile,
    isMainUser: false,
  };
};