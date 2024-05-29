export type Option = {
  key: string;
  name: string;
};

export const findByKey = (key: string, list: Option[]) => list.find((item) => item.key === key);

export const findByName = (name: string, list: Option[]) => list.find((item) => item.name === name);
