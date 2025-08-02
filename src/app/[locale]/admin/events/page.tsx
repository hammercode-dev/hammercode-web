import Link from "next/link";

const EventListPage = () => {
  return (
    <div>
      <h1>Event List</h1>

      <ul>
        <li>
          Event 123 <Link href="/admin/events/123/edit">Edit</Link>
        </li>
        <li>
          Event 456 <Link href="/admin/events/456/edit">Edit</Link>
        </li>
      </ul>
    </div>
  );
};

export default EventListPage;
