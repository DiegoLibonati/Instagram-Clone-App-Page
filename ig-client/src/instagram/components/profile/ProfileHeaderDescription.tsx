import { useProfileUser } from "../../hooks/useProfileUser";

export const ProfileHeaderDescription = () => {
  const { user } = useProfileUser();

  return (
    <article className="flex items-start justify-start flex-col w-full h-auto mt-2">
      <h2 className="text-sm font-bold md:text-lg">{user.name}</h2>
      <p className="text-sm md:text-lg">
        Lorem ipsum dolor, sit amet<br></br>
        recusandae laboriosam excepturi est ducimus
        <br></br>
        temporibus quas obcaecati laudantium?<br></br>
        temporibus qua<br></br>
        temporibus quas obcaecati
      </p>
    </article>
  );
};
