import { useContext } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { UIContext } from "../../contexts/UIContext";
import { useMediaMatch } from "../../hooks/useMediaMatch";
import { FooterMobile } from "../../ui/components/Footer/Mobile/FooterMobile";
import { NavBarMobile } from "../../ui/components/NavBar/Mobile/NavBarMobile";
import { Sidebar } from "../../ui/components/Sidebar/Sidebar";
import { FormEditUser } from "../components/Forms/FormEditUser";

export const EditUserPage = () => {
  const { matchMediaQuery } = useMediaMatch(1024);
  const { user } = useContext(AuthContext);
  const { setPreviewSrc } = useContext(UIContext);
  const navigate = useNavigate();

  return (
    <>
      {!matchMediaQuery && (
        <NavBarMobile
          classNameHeader={
            "flex flex-row items-center justify-start h-14 w-screen shadow-md mb-2"
          }
          classNameNav={
            "flex flex-row items-center justify-start h-full w-full p-2"
          }
        >
          <BsArrowLeft
            color="black"
            size={25}
            onClick={() => {
              navigate(`/${user.username}`);
              setPreviewSrc("");
            }}
          ></BsArrowLeft>
          <h2 className="ml-5 font-medium text-lg">Editar perfil</h2>
          <AiOutlineCheck
            size={25}
            color="blue"
            className="absolute right-2 cursor-pointer"
          ></AiOutlineCheck>
        </NavBarMobile>
      )}

      {matchMediaQuery && <Sidebar></Sidebar>}

      <FormEditUser></FormEditUser>

      {!matchMediaQuery && <FooterMobile></FooterMobile>}
    </>
  );
};
