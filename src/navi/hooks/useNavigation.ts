import { redirect, useParams, usePathname, useRouter } from "next/navigation";

export const useNavigation = () => {
  const { push, back, refresh } = useRouter() || {};
  const pathname = usePathname();
  const params = useParams();

  return { redirect, push, pathname, params, back, refresh };
};
