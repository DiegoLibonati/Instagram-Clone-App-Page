import { AuthLayout } from "../layout/AuthLayout";

export const RegisterPage = () => {
  return (
    <>
      <AuthLayout text="¿Tienes una cuenta?" textLink="Inicia sesion">
        <form className="flex items-center justify-center flex-col w-full h-full my-2">
          <p className="text-lg font-semibold text-gray-500 text-center">
            Registrate para ver fotos y videos de tus amigos.
          </p>
          <button className="my-2 w-full bg-blue-500 text-center rounded-md text-white font-medium tracking-wide py-1">
            Iniciar sesion con Facebook
          </button>
          <hr className="w-full h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
          <input
            className="w-full p-2 text-sm text-black border-gray-300 border my-2 outline-none"
            placeholder="Numero de celular o correo electronico"
          ></input>
          <input
            className="w-full p-2 text-sm text-black border-gray-300 border my-2 outline-none"
            placeholder="Nombre completo"
          ></input>
          <input
            className="w-full p-2 text-sm text-black border-gray-300 border my-2 outline-none"
            placeholder="Nombre de usuario"
          ></input>
          <input
            className="w-full p-2 text-sm text-black border-gray-300 border my-2 outline-none"
            placeholder="Contraseña"
          ></input>
          <p className="text-center text-gray-500 my-2 text-sm">
            Es posible que las personas que usan nuestro servicio hayan subido
            tu información de contacto a Instagram.{" "}
            <a href="/" className="text-indigo-600">
              Más información
            </a>
          </p>
          <p className="text-center text-gray-500 my-2 text-sm">
            Al registrarte, aceptas nuestras{" "}
            <a href="/" className="text-indigo-600">
              Condiciones
            </a>
            , la{" "}
            <a href="/" className="text-indigo-600">
              Política de privacidad
            </a>{" "}
            y{" "}
            <a href="/" className="text-indigo-600">
              la Política de cookies
            </a>
            .
          </p>
          <button className="my-2 w-full bg-blue-500 text-center rounded-md text-white font-medium tracking-wide py-1">
            Registrarte
          </button>
        </form>
      </AuthLayout>
    </>
  );
};
