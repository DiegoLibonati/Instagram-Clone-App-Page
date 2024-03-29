import React from "react";
import { Link } from "react-router-dom";
import { GooglePlay, Microsoft, screen1 } from "../../../assets/Auth/images";
import { AuthLayoutProps } from "../../../types/types";

export const AuthLayout = ({
  children,
  text,
  textLink,
}: AuthLayoutProps): JSX.Element => {
  return (
    <main className="flex items-center justify-center flex-row w-full p-3 sm:bg-white">
      <section className="hidden lg:block">
        <article className="bg-mobile relative bg-contain bg-no-repeat bg-center h-custom-800 w-custom-30">
          <img
            src={screen1}
            alt="screenshot instagram"
            className="absolute max-w-custom-30 right-16 top-28"
          ></img>
        </article>
      </section>

      <section
        className="flex items-center justify-start flex-col
  p-3 sm:max-w-sm"
      >
        <article className="flex items-center justify-center flex-col p-3 w-full sm:bg-white sm:shadow-md sm:p-10 sm:border sm:border-gray-300">
          <div className="inline-block bg-logos bg-cover bg-no-repeat bg-instagramLogoBlack w-44 h-14"></div>
          {children}
        </article>
        <article className="flex items-center justify-center flex-col my-2 w-full py-2 sm:bg-white sm:shadow-md sm:border sm:border-gray-300 sm:h-20">
          <p className="text-md">
            {text}{" "}
            <Link
              to={textLink === "Registrate" ? "/auth/register" : "/auth/login"}
              className="text-indigo-600"
            >
              {textLink}
            </Link>
          </p>
        </article>
        <article className="flex items-center justify-center flex-col my-2">
          <p className="text-md">Descarga la app.</p>
          <div className="flex items-center justify-between w-full flex-row">
            <a href="/" className="h-16">
              <img
                className="w-48 h-full object-contain p-2"
                src={GooglePlay}
                alt="Google Play"
              ></img>
            </a>
            <a href="/" className="h-16">
              <img
                className="w-48 h-full object-contain p-2"
                src={Microsoft}
                alt="Microsoft"
              ></img>
            </a>
          </div>
        </article>
      </section>
    </main>
  );
};
