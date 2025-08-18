import { UserEventPage } from "@/features/events/pages";

interface MyEventsPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
  }>;
}

export default async function MyEventsPage({ searchParams }: MyEventsPageProps) {
  const { page, limit } = await searchParams;

  return <UserEventPage page={Number(page) || 1} perPage={Number(limit) || 5} />;
}
