import { instagramApiGetUnFollow } from "../api/Follow/instagramApiGetUnFollow";
import { ForeignUser, User } from "../types/types";

export const handleUnFollow = async (
  setAlertOpen: (
    type: string,
    title: string,
    message: string,
    color: string
  ) => void,
  user: User,
  onLogin: (payload: User) => void,
  userForeignProfile: ForeignUser,
  setUserForeignProfile: (payload: ForeignUser["followers"]) => void,
  idAuthorNotification?: string
) => {
  const request = await instagramApiGetUnFollow(
    idAuthorNotification || userForeignProfile.id
  );

  if (request.hasOwnProperty("response")) {
    return setAlertOpen(
      "error",
      "¡Oh, algo salio mal!",
      request.response.data.message,
      "bg-red-600"
    );
  }

  const following = request.payload;
  const followers = request.payloadForeignUser;
  onLogin({ ...user, ...following });
  setUserForeignProfile({ ...userForeignProfile, ...followers });
};
