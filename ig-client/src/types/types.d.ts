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
