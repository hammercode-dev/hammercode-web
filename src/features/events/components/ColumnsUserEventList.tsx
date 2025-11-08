"use client";
import Badge from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { UserEventType } from "@/domains/Events";
import { formatDateEvent } from "@/lib/format";
import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { Link } from "@/lib/navigation";

export const columnsUserEventList: ColumnDef<UserEventType>[] = [
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
    accessorKey: "event_detail.date_event",
    header: "Event Date",
    cell: ({ row }) => <p>{row.original.event_detail.date ? formatDateEvent(row.original.event_detail.date) : "-"}</p>,
  },
  {
    accessorKey: "event_detail.type",
    header: "Type",
    cell: ({ row }) => <p className="capitalize">{row.original.event_detail.type}</p>,
  },
  {
    accessorKey: "payment_date",
    header: "Payment Date",
    cell: ({ row }) => <p>{row.original.payment_date ? formatDateEvent(row.original.payment_date) : "-"}</p>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const variant = status === "SUCCESS" ? "open" : status === "PENDING" ? "soon" : "closed";
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
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button
          size="icon"
          variant="outline"
          className="h-8 w-8 cursor-pointer border-blue-500 bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
          asChild
        >
          <Link href={`/events/${row.original.event_id}`}>
            <Eye className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    ),
  },
];
