import { AiOutlineClose } from "react-icons/ai";
import { UIContext } from "../../../../contexts/UIContext";
import { useMediaMatch } from "../../../../hooks/useMediaMatch";
import { useContext } from "react";
import { ModalNewPublicationHeader } from "./ModalNewPublicationHeader";
import { ModalNewPublicationUpload } from "./ModalNewPublicationUpload";

export const ModalNewPublication = () => {
  const { matchMediaQuery } = useMediaMatch(1024);
  const { previewSrc, setModalClose } = useContext(UIContext);

  return (
    <div
      className={`flex items-center justify-center absolute w-screen h-screen z-[99999999] ${
        matchMediaQuery && "bg-black bg-opacity-50 "
      }`}
    >
      {matchMediaQuery && (
        <AiOutlineClose
          size={25}
          className="cursor-pointer absolute top-2 right-2"
          onClick={setModalClose}
        ></AiOutlineClose>
      )}
      <div
        className={`flex items-start  flex-col bg-white ${
          matchMediaQuery ? "w-[800px] h-[70%] rounded-md" : "w-full h-full"
        }`}
      >
        <ModalNewPublicationHeader></ModalNewPublicationHeader>

        {previewSrc ? (
          <div
            className={`flex w-full h-full items-start justify-center ${
              matchMediaQuery ? "flex-row" : "flex-col"
            }`}
          >
            <img
              src={previewSrc}
              alt={previewSrc}
              className={`h-full object-contain bg-[#1A1A1A] ${
                matchMediaQuery ? "w-4/6" : "w-full"
              }`}
            ></img>

            <form
              className={`flex flex-col h-full p-2 ${
                matchMediaQuery ? "w-2/6" : "w-full"
              }`}
            >
              <div className="flex items-center justify-between w-8 h-auto">
                <img
                  src="https://cdn.domestika.org/c_fill,dpr_1.0,f_auto,h_1200,pg_1,t_base_params,w_1200/v1589759117/project-covers/000/721/921/721921-original.png?1589759117"
                  alt="perfil"
                  className="rounded-full mr-2"
                ></img>
                <h3 className="text-black">die_libonati</h3>
              </div>

              <textarea
                className="outline-none w-full resize-none mt-4 shadow-sm"
                rows={5}
                placeholder="Escribe una descripcion..."
              ></textarea>
            </form>
          </div>
        ) : (
          <ModalNewPublicationUpload></ModalNewPublicationUpload>
        )}
      </div>
    </div>
  );
};
