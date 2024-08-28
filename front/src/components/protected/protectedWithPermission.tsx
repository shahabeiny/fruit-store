import { FunctionComponent, ComponentType } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/hooks/useReduxhook";
import { selectCurrentUser } from "@/redux/store/auth/authSlice";
import checkPermission from "@/utils/checkPermission";



const protectedWithPermission =
  (permission: string) =>
  (WrappedComponent: React.ComponentType<any>) => {
    const WrappedWithPermission: React.FC<any> = (props) => {
      const router = useRouter();
      const user = useAppSelector(selectCurrentUser);

      let check = checkPermission(permission, user?.role);

      if (!check) {
        router.push("/panel");
        return null;
      }

      return <WrappedComponent {...props} />;
    };

    WrappedWithPermission.displayName = `WithPermission(${getDisplayName(
      WrappedComponent
    )})`;

    return WrappedWithPermission;
  };

function getDisplayName(WrappedComponent: React.ComponentType<any>) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export default protectedWithPermission;