import { MyEventPage } from "@/features/events";

interface MyEventsPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
  }>;
}

export default async function MyEventsPage({ searchParams }: MyEventsPageProps) {
  const { page, limit } = await searchParams;

  return <MyEventPage page={Number(page) || 1} perPage={Number(limit) || 10} />;
}
