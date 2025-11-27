"use client";
import Badge from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDateEvent } from "@/lib/format";
import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { useDialog } from "@/contexts/dialogContext";
import { EventDetailModal } from "./EventDetailModal";
import { UserEventResponse } from "../types/userEvent";

export const columnsUserEventList: ColumnDef<UserEventResponse>[] = [
  {
    accessorKey: "order_no",
    header: "Order No",
  },
  {
    accessorKey: "event_detail.title",
    header: "Event Title",
    cell: ({ row }) => <p>{row.original.event_detail.title}</p>,
  },
  {
    accessorKey: "event_detail.date",
    header: "Event Date",
    cell: ({ row }) => <p>{row.original.event_detail.date ? formatDateEvent(row.original.event_detail.date) : "-"}</p>,
  },
  {
    accessorKey: "event_detail.type",
    header: "Type",
    cell: ({ row }) => <p className="capitalize">{row.original.event_detail.type}</p>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const variant =
        status === "SUCCESS" ? "open" : status === "PENDING" ? "soon" : status === "EXPIRED" ? "closed" : "closed";
      return (
        <div>
          <Badge variant={variant}>{status}</Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ViewEventButton event={row.original} />,
  },
];

function ViewEventButton({ event }: { event: UserEventResponse }) {
  const { openDialog } = useDialog();

  const handleViewDetails = () => {
    openDialog({
      title: "Event Details",
      content: <EventDetailModal event={event} />,
      size: "xl",
      className: "h-[80%]",
    });
  };

  return (
    <div className="flex gap-2">
      <Button size="icon" variant="outline" className="h-8 w-8 cursor-pointer" onClick={handleViewDetails}>
        <Eye className="h-4 w-4" />
      </Button>
    </div>
  );
}
