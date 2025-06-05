import {
  createContext,
  ReactNode,
  useState,
  useCallback,
  useContext,
} from "react";

type ResourceState = {
  data: unknown;
  isLoading: boolean;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
};

type Resources = {
  [key: string]: ResourceState;
};

type ResourcesContextType = {
  resources: Resources;
  getInitialState: () => ResourceState;
  updateResource: (key: string, resource: ResourceState) => void;
};

const getInitialState = (): ResourceState => ({
  data: [],
  isLoading: false,
  isFetching: false,
  isSuccess: false,
  isError: false,
});

const ResourcesContext = createContext<ResourcesContextType | undefined>(
  undefined
);

export const ResourcesProvider = ({ children }: { children: ReactNode }) => {
  const [resources, setResources] = useState<Resources>({});

  const updateResource = useCallback((key: string, resource: ResourceState) => {
    setResources((prevResources) => ({
      ...prevResources,
      [key]: resource,
    }));
  }, []);

  return (
    <ResourcesContext.Provider
      value={{ resources, getInitialState, updateResource }}
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
