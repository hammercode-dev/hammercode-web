"use client";

import TableData from "@/components/common/TableData";
import { Button } from "@/components/ui/Button";
import { useRouter } from "@/lib/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  status: string;
}

const AdminEventsListPage = () => {
  const router = useRouter();
  const events: Event[] = [
    {
      id: 1,
      title: "React Workshop",
      date: "2024-08-20",
      location: "Jakarta",
      status: "Active",
    },
    {
      id: 2,
      title: "JavaScript Training",
      date: "2024-08-25",
      location: "Bandung",
      status: "Draft",
    },
    {
      id: 3,
      title: "Vue.js Training",
      date: "2024-09-01",
      location: "Surabaya",
      status: "Active",
    },
    {
      id: 4,
      title: "Node.js Advanced",
      date: "2024-09-10",
      location: "Jakarta",
      status: "Draft",
    },
    {
      id: 5,
      title: "React Native Workshop",
      date: "2024-09-15",
      location: "Bandung",
      status: "Active",
    },
    {
      id: 6,
      title: "TypeScript Fundamentals",
      date: "2024-09-20",
      location: "Malang",
      status: "Draft",
    },
    {
      id: 7,
      title: "GraphQL Training",
      date: "2024-09-25",
      location: "Jakarta",
      status: "Active",
    },
    {
      id: 8,
      title: "Docker & Kubernetes",
      date: "2024-10-01",
      location: "Surabaya",
      status: "Draft",
    },
  ];

  const columns: ColumnDef<Event>[] = [
    {
      accessorKey: "title",
      header: "Event Title",
    },
    {
      accessorKey: "date",
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

      <TableData
        data={events}
        columns={columns}
        searchable
        searchPlaceholder="Search events..."
        rightAction={createEventButton}
      />
    </section>
  );
};

export default AdminEventsListPage;
