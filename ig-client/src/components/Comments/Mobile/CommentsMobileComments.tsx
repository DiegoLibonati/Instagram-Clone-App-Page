import { CommentsMobileComment } from "./CommentsMobileComment";
import { useContext } from "react";
import { PublicationContext } from "../../../contexts/Publications/PublicationContext";
import { Comment } from "../../../types/types";

export const CommentsMobileComments = (): JSX.Element => {
  const publicationContextStore = useContext(PublicationContext);

  return (
    <ul className="flex items-center justify-start flex-col w-full min-h-[calc(h-screen - h-14)] mb-24">
      {publicationContextStore?.activePublication?.comments?.map((comment: Comment) => {
        return (
          <CommentsMobileComment
            key={comment._id}
            comment={comment}
          ></CommentsMobileComment>
        );
      })}
    </ul>
  );
};
