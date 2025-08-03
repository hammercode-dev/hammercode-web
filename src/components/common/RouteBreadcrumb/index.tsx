"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/Breadcrumb";

const generateBreadcrumbItems = (pathname: string) => {
  const paths = pathname.split("/");
  const items = [];

  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];
    if (path === "" || path === "en" || path === "admin") continue;

    const href = `/${paths.slice(0, i + 1).join("/")}`;
    const label = path.charAt(0).toUpperCase() + path.slice(1);

    items.push(
      <BreadcrumbItem key={href}>
        <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
      </BreadcrumbItem>
    );

    if (i < paths.length - 2) {
      items.push(<BreadcrumbSeparator key={`${href}-separator`} />);
    }
  }

  return items;
};

const RouteBreadcrumb = () => {
  const pathname = usePathname();

  return (
    <Breadcrumb>
      <BreadcrumbList>{generateBreadcrumbItems(pathname)}</BreadcrumbList>
    </Breadcrumb>
  );
};

export default RouteBreadcrumb;
