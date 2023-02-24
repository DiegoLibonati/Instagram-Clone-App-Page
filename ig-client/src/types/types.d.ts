export type Publication = {
  id?: string;
  imgLink: string;
  countLikes: number;
  countComments: number;
};

export type Histories = { className?: string; profileHistories: boolean };

export type MAlert = {
  isOpen: boolean;
  type: string;
  title: string;
  message: string;
  color: string;
};

export type Modal = {
  isOpen: boolean;
  type: string;
};

export type User = {
  status?: string;
  id: string;
  email: string;
  name: string;
  username: string;
  publications: Publication[];
  followers: User[];
  following: User[];
};

export type MConfig = {
  isOpen: boolean;
};
