"use client";

import TableData from "@/components/common/TableData";
import { Button } from "@/components/ui/Button";
import { useRouter } from "@/lib/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useEventsAdmin } from "../hooks/useEvent";
import { EventType } from "@/domains/Events";
import { useQueryParams } from "@/hooks";
import Loader from "@/components/common/Loader";

const AdminEventsListPage = () => {
  const router = useRouter();
  const { getNumberParam, getParam } = useQueryParams();
  const itemsPerPage = getNumberParam("limit", 5);
  const currentPage = getNumberParam("page", 1);
  const searchQuery = getParam("search", "");

  const { data: eventsResponse, isLoading } = useEventsAdmin(currentPage, itemsPerPage, searchQuery);
  console.log(eventsResponse);
  const totalPages = eventsResponse?.pagination?.total_pages || 1;

  const columns: ColumnDef<EventType>[] = [
    {
      accessorKey: "title",
      header: "Event Title",
    },
    {
      accessorKey: "date_event",
      header: "Date",
    },
    {
      accessorKey: "location",
      header: "Location",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => console.log("Edit event:", row.original.id)}>
            Edit
          </Button>
          <Button size="sm" variant="outline" onClick={() => console.log("View event:", row.original.id)}>
            View
          </Button>
        </div>
      ),
    },
  ];

  const createEventButton = (
    <Button
      className="bg-hmc-base-blue hover:bg-hmc-base-blue/90 cursor-pointer"
      onClick={() => router.push("/admin/events/create")}
    >
      <Plus className="mr-2 h-4 w-4" />
      Create Event
    </Button>
  );

  return (
    <section>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Events Management</h1>
        <p className="text-muted-foreground">Manage your events and workshops</p>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <TableData
          data={eventsResponse?.data || []}
          columns={columns}
          searchable
          searchPlaceholder="Search events"
          rightAction={createEventButton}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )}
    </section>
  );
};

export default AdminEventsListPage;
