import { FC } from "react";
import { TestimonialType } from "../types";
import Image from "next/image";

import { DialogContent } from "@/components/ui/Dialog";
import Link from "next/link";

const DetailTestimoni: FC<{ data: TestimonialType }> = ({ data }) => {
  return (
    <DialogContent>
      <div className="flex flex-col items-start gap-2 md:flex-row md:items-center">
        <Image
          src={data.avatar_url}
          alt={data.name}
          width={512}
          height={512}
          className="h-16 w-16 rounded-full border-2 object-cover lg:h-14 lg:w-14"
        />
        <div className="flex flex-col gap-1">
          <h3>{data.name}</h3>
          <div className="text-xs text-slate-400 sm:text-sm dark:text-slate-400">
            {data.role} at{" "}
            <Link href={data.company_url} target="_blank" className="font-medium">
              {data.company_name}
            </Link>
          </div>
        </div>
      </div>
      <p className="text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6 dark:text-slate-400">{`"${data.quote}"`}</p>
    </DialogContent>
  );
};
export default DetailTestimoni;
