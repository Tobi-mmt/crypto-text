import { NextRouter } from "next/router";
import { base64ToString } from "../lib/crypto";

export const getKeyFromRouter = (
  router: Pick<NextRouter, "asPath">
): string => {
  const routerPath = router.asPath.split("#");
  if (routerPath.length < 1 || !routerPath[1]) {
    return "";
  }
  return base64ToString(routerPath[1]);
};
