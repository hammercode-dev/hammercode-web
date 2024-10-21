import { FC } from "react";
import { TestimonialType } from "../types";
import Image from "next/image";

import { DialogContent } from "@/components/ui/Dialog";

const DetailTestimoni: FC<{ data: TestimonialType }> = ({ data }) => {
  return (
    <DialogContent>
      <div className="flex md:flex-row flex-col md:items-center items-start gap-2">
        <Image
          src={data.avatar_url}
          alt={data.name}
          width={512}
          height={512}
          className="lg:w-14 w-16 lg:h-14 h-16 object-cover border-2 rounded-full"
        />
        <div className="flex flex-col gap-1">
          <h3>{data.name}</h3>
          <p className="sm:text-sm text-xs text-slate-400 dark:text-slate-400">{data.role}</p>
        </div>
      </div>
      <p className="sm:text-sm text-xs text-slate-500 dark:text-slate-400 sm:leading-6 leading-5">{`"${data.quote}"`}</p>
    </DialogContent>
  );
};
export default DetailTestimoni;
