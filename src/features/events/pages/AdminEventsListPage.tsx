"use client";

import TableData from "@/components/common/TableData";
import { Button } from "@/components/ui/Button";
import { useRouter } from "@/lib/navigation";
import { Plus } from "lucide-react";
import { useEventsAdmin } from "../hooks/useEvent";
import { useQueryParams } from "@/hooks";
import Loader from "@/components/common/Loader";
import { columnsEventListAdmin } from "../components/ColumnsEventListAdmin";

const AdminEventsListPage = () => {
  const router = useRouter();
  const { getNumberParam, getParam } = useQueryParams();
  const itemsPerPage = getNumberParam("limit", 5);
  const currentPage = getNumberParam("page", 1);
  const searchQuery = getParam("search", "");

  const { data: eventsResponse, isLoading } = useEventsAdmin(currentPage, itemsPerPage, searchQuery);
  const totalPages = eventsResponse?.pagination?.total_pages || 1;

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
          columns={columnsEventListAdmin}
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
