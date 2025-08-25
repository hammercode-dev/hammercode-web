import { LoaderIcon } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex h-[45vh] items-center justify-center">
      <LoaderIcon className="size-12 animate-spin" />
    </div>
  );
};
export default Loader;
