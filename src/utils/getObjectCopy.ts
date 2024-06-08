const getObjectCopy = <T>(obj: object | undefined): T => {
  return JSON.parse(JSON.stringify(obj));
};

export default getObjectCopy;
