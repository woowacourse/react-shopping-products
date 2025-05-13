import { PropsWithChildren } from "react";

export const AppLayout = ({children}: PropsWithChildren) => {
  return (
    <div className="h-dvh max-w-[400px] flex flex-col items-center justify-center p-4 mx-auto w-full border-x-[1px] border-gray-300">
      {children}
    </div>
  )
}
