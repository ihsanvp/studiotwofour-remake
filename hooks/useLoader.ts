import { LoaderContext } from "components/Loader/Loader";
import { useContext } from "react";

export default function useLoader(): boolean {
  return useContext(LoaderContext);
}
