import MyEventPage from "@/features/user/my-events";

interface MyEventsPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
  }>;
}

export default async function MyEventsPage({ searchParams }: MyEventsPageProps) {
  const { page, limit } = await searchParams;

  return <MyEventPage page={Number(page)} perPage={Number(limit)} />;
}
