import { Publication as PublicationType } from "../../types/types";
import { getFormatDate } from "../../helpers/getFormatDate";
import { PublicationActions } from "./PublicationActions";
import { PublicationForm } from "./PublicationForm";
import { PublicationHeader } from "./PublicationHeader";
import { PublicationInformation } from "./PublicationInformation";
import { useMemo } from "react";

export const Publication = ({
  publication,
  context,
}: {
  publication: PublicationType;
  context?: string;
}): JSX.Element => {
  const {
    imgLink,
    description,
    likes,
    comments,
    date,
    username,
    avatar,
    name,
  } = publication;

  const memoDate = useMemo(() => getFormatDate(date), [date]);

  return (
    <article className="flex items-start justify-center flex-col w-full h-auto mb-5 border-b-[1px] border-black border-opacity-25">
      <PublicationHeader
        avatar={avatar}
        name={name}
        username={username}
      ></PublicationHeader>
      <img
        src={imgLink}
        alt={description}
        className="w-full h-[400px] object-cover"
      ></img>
      <PublicationActions
        publication={publication}
        context={context}
      ></PublicationActions>
      <PublicationInformation
        likes={likes}
        username={username}
        description={description}
        comments={comments}
        publication={publication}
      ></PublicationInformation>
      <PublicationForm></PublicationForm>
      <h5 className="text-gray-500 text-sm w-100 p-2 my-[2px]">{memoDate}</h5>
    </article>
  );
};
