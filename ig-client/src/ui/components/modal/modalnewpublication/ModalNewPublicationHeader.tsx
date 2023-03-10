import { AiOutlineClose } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import { UIContext } from "../../../../contexts/UIContext";
import { useMediaMatch } from "../../../../hooks/useMediaMatch";
import { useContext } from "react";
import { PublicationContext } from "../../../../contexts/PublicationContext";
import { AuthContext } from "../../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const ModalNewPublicationHeader = () => {
  const { matchMediaQuery } = useMediaMatch(1024);
  const { setModalClose, setAlertOpen } = useContext(UIContext);
  const { user, onLogin } = useContext(AuthContext);
  const { handleNewPublication } = useContext(PublicationContext);
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between p-2 h-14 flex-row w-full shadow-md">
      {!matchMediaQuery && (
        <AiOutlineClose
          size={20}
          className="cursor-pointer"
          onClick={setModalClose}
        ></AiOutlineClose>
      )}
      <h2 className={`font-medium text-md ${matchMediaQuery && "pl-3"}`}>
        Nueva publicación
      </h2>
      <BsArrowRight
        size={20}
        className="text-blue-500 cursor-pointer"
        onClick={async () => {
          const request = await handleNewPublication(user.username);

          setModalClose();
          onLogin(request.payload);
          setAlertOpen(
            "success",
            "¡Bien, todo esta ok!",
            request.message,
            "bg-green-600"
          );
          navigate(`/${user.username}`);
        }}
      ></BsArrowRight>
    </div>
  );
};
