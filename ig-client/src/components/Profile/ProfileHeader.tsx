import { Histories } from "../Histories/Histories";
import { ProfileHeaderActions } from "./ProfileHeaderActions";
import { ProfileHeaderDescription } from "./ProfileHeaderDescription";
import { ProfileHeaderDescriptionDesktop } from "./Desktop/ProfileHeaderDescriptionDesktop";
import { ProfileHeaderNumbers } from "./ProfileHeaderNumbers";
import { useMediaMatch } from "../../hooks/useMediaMatch";

export const ProfileHeader = (): JSX.Element => {
  const { matchMediaQuery } = useMediaMatch(1024);

  return (
    <section className="flex items-center justify-center flex-col w-full h-auto p-2">
      {!matchMediaQuery && <ProfileHeaderNumbers></ProfileHeaderNumbers>}

      {!matchMediaQuery && (
        <ProfileHeaderDescription></ProfileHeaderDescription>
      )}

      {!matchMediaQuery && <ProfileHeaderActions></ProfileHeaderActions>}

      {matchMediaQuery && (
        <ProfileHeaderDescriptionDesktop></ProfileHeaderDescriptionDesktop>
      )}

      <Histories
        className="mt-2 2xl:mb-5 2xl:mt-10 2xl:w-[75%]"
        profileHistories={true}
      ></Histories>
    </section>
  );
};
