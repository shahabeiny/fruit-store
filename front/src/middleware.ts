import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PermissionModel } from "./models/RoleModel";

export default function myMiddleware(request: NextRequest) {
  const userPerm = request.cookies.get("userPermission")?.value;

  if (request.nextUrl.pathname.startsWith("/panel")) {
    if (!userPerm) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    } else if (userPerm) {
      let convertPerm: PermissionModel[] = [];
      convertPerm = userPerm && JSON.parse(userPerm || "");
      if (
        request.nextUrl.pathname === "/panel/products" ||
        request.nextUrl.pathname === "/panel/categories"
      ) {
        if (!checkPerm("SHOW_PRODUCTS", convertPerm))
          return NextResponse.redirect(new URL("/panel", request.url));
      } else if (request.nextUrl.pathname === "/panel/orders") {
        if (!checkPerm("SHOW_ORDERS", convertPerm))
          return NextResponse.redirect(new URL("/panel", request.url));
      } else if (request.nextUrl.pathname === "/panel/roles") {
        if (!checkPerm("SHOW_ROLES", convertPerm))
          return NextResponse.redirect(new URL("/panel", request.url));
      } else if (request.nextUrl.pathname === "/panel/users") {
        if (!checkPerm("SHOW_USERS", convertPerm))
          return NextResponse.redirect(new URL("/panel", request.url));
      }
    }
  }

  if (request.nextUrl.pathname === "/cart") {
    if (!userPerm)
      return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (
    request.nextUrl.pathname === "/auth/login" ||
    request.nextUrl.pathname === "/auth/register"
  ) {
    if (userPerm) return NextResponse.redirect(new URL("/panel", request.url));
  }
  return NextResponse.next();
}

const checkPerm = (
  permission: string,
  permissions: PermissionModel[] | null
) => {
  if (permissions && permissions.length > 0) {
    return permissions?.some((per) => per.nameEng === permission);
  }
  return false;
};
