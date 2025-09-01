"use client";
import Badge from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EventType } from "@/domains/Events";
import { formatDateEvent } from "@/lib/format";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2, SquareChartGantt } from "lucide-react";

export const columnsEventListAdmin: ColumnDef<EventType>[] = [
  {
    accessorKey: "title",
    header: "Event Title",
  },
  {
    accessorKey: "date_event",
    header: "Date",
    cell: ({ row }) => <p>{formatDateEvent(row.original.date_event)}</p>,
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div>
        <Badge variant={row.original.status}>{row.original.status}</Badge>
      </div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button
          size="icon"
          variant="outline"
          className="cursor-poiner h-8 w-8 cursor-pointer border-blue-500 bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
          onClick={() => console.log("Edit event:", row.original.id)}
        >
          <Edit2 className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="h-8 w-8 cursor-pointer border-emerald-500 bg-emerald-500 text-white hover:bg-emerald-600 hover:text-white"
          onClick={() => console.log("View event:", row.original.id)}
        >
          <SquareChartGantt className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];
