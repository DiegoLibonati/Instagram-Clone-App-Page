import {
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineShopping,
} from "react-icons/ai";
import { RxVideo } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { UserImage } from "../../UserImage/UserImage";

export const FooterMobile = (): JSX.Element => {
  const navigate = useNavigate();
  const authContextStore = useContext(AuthContext);
  return (
    <footer className="lg:hidden flex items-center justify-between fixed bg-white w-screen bottom-0 p-2 h-14">
      <AiOutlineHome
        color="black"
        size={25}
        onClick={() => navigate("/")}
      ></AiOutlineHome>
      <AiOutlineSearch
        color="black"
        size={25}
        onClick={() => navigate("/search-page")}
      ></AiOutlineSearch>
      <RxVideo color="black" size={25}></RxVideo>
      <AiOutlineShopping color="black" size={25}></AiOutlineShopping>
      <Link to={`/${authContextStore?.user.username}`}>
        <UserImage
          className="w-6 h-6 object-cover rounded-full"
          avatar={authContextStore?.user.avatar!}
          name={authContextStore?.user.name!}
        ></UserImage>
      </Link>
    </footer>
  );
};
