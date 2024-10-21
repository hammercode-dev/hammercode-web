import { Fragment } from "react";
import { useTranslations } from "next-intl";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/Breadcrumb";
import { LINKS } from "@/components/common/Navbar/constant";

const EventBreadcrumbs = () => {
  const t = useTranslations("Layout");
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {LINKS.map(({ href, id }, index) => (
          <Fragment key={id}>
            <BreadcrumbItem>
              <BreadcrumbLink href={`${href}`}>{t(`breadcrumb.link-${id}`)}</BreadcrumbLink>
            </BreadcrumbItem>
            {index < LINKS.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default EventBreadcrumbs;
