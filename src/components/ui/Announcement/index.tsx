import { X } from "lucide-react";
import { useState } from "react";

export interface AnnouncementProps {
  message: string;
  url?: string;
}

function Announcement({ message, url }: AnnouncementProps) {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;
  const messageEl = url ? (
    <a href={url} target="_blank">
      {message}
    </a>
  ) : (
    message
  );
  return (
    <div
      role="alert"
      className="bg-slate-950 flex justify-center items-center gap-2 text-white text-center px-4 py-2 text-sm md:text-normal"
    >
      {messageEl}
      <button onClick={() => setHidden(true)} className="bg-slate-500 rounded-full p-1  ">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </button>
    </div>
  );
}

export default Announcement;
