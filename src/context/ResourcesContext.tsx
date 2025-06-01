import {
  createContext,
  ReactNode,
  useState,
  useCallback,
  useContext,
} from "react";

type ResourceState<T> = {
  data: T | null;
  isLoading: boolean;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
};

type Resources = {
  [key: string]: ResourceState<any>;
};

type ResourcesContextType = {
  resources: Resources;
  updateResource: <T>(
    key: string,
    updater: (prevState: ResourceState<T>) => ResourceState<T>
  ) => void;
  resetResource: (key: string) => void;
};

const getInitialState = <T,>(): ResourceState<T> => ({
  data: null,
  isLoading: false,
  isFetching: false,
  isSuccess: false,
  isError: false,
});

export const ResourcesContext = createContext<ResourcesContextType | undefined>(
  undefined
);

export const ResourcesProvider = ({ children }: { children: ReactNode }) => {
  const [resources, setResources] = useState<Resources>({});

  const updateResource = useCallback(
    <T,>(
      key: string,
      updater: (prevState: ResourceState<T>) => ResourceState<T>
    ) => {
      setResources((prevResources) => {
        const prevState = prevResources[key] ?? getInitialState<T>();
        return {
          ...prevResources,
          [key]: updater(prevState),
        };
      });
    },
    []
  );

  const resetResource = useCallback((key: string) => {
    setResources((prevResources) => ({
      ...prevResources,
      [key]: getInitialState(),
    }));
  }, []);

  return (
    <ResourcesContext.Provider
      value={{ resources, updateResource, resetResource }}
    >
      {children}
    </ResourcesContext.Provider>
  );
};

export const useResourcesContext = () => {
  const context = useContext(ResourcesContext);
  if (!context) {
    throw new Error(
      "useResourcesContext는 ResourcesProvider 안에서 사용해야 합니다."
    );
  }
  return context;
};
