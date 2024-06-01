import { useMediaQuery } from "react-responsive";

export const IsMobileScreen = () => {
  return useMediaQuery({ query: "(max-width: 767px)" });
};
