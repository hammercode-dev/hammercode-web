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
      className="md:text-normal flex items-center justify-center gap-2 bg-slate-950 px-4 py-2 text-center text-sm text-white"
    >
      <h2>{messageEl}</h2>
      <button onClick={() => setHidden(true)} className="rounded-full bg-slate-500 p-1">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </button>
    </div>
  );
}

export default Announcement;
