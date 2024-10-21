import { CalendarRange, Clock, MapPin } from "lucide-react";
import { EventInfoType, TechEvent } from "./types";

export const eventsData: TechEvent[] = [
  {
    id: 1,
    title: "Advanced Frontend Workshop",
    description: "A deep dive into modern frontend development techniques and best practices.",
    author: "user_001",
    image_event: "/assets/images/events/pdd2024.webp",
    date_event: "2024-09-15",
    created_at: "2024-08-20T10:00:00Z",
    updated_at: "2024-08-20T10:00:00Z",
    type_event: "Workshop",
    location: "Online",
    duration: "3 hours",
    capacity: 50,
    tags: ["frontend", "workshop", "development"],
    registration_link: "https://example.com/register/frontend-workshop",
    speakers: ["John Doe", "Jane Smith"],
    status: "closed",
  },
  {
    id: 2,
    title: "Next.js TechTalk",
    description: "Explore the latest features of Next.js 14 and how it revolutionizes web development.",
    author: "user_002",
    image_event: "/assets/images/events/pdd2024.webp",
    date_event: "2024-09-20",
    created_at: "2024-08-20T11:00:00Z",
    updated_at: "2024-08-20T11:00:00Z",
    type_event: "TechTalk",
    location: "San Francisco, CA",
    duration: "2 hours",
    capacity: 100,
    tags: ["Next.js", "TechTalk", "web development"],
    registration_link: "https://example.com/register/nextjs-techtalk",
    speakers: ["Alice Johnson", "Bob Brown"],
    status: "soon",
  },
  {
    id: 3,
    title: "React Native Workshop",
    description: "Learn to build cross-platform mobile apps with React Native.",
    author: "user_003",
    image_event: "/assets/images/events/pdd2024.webp",
    date_event: "2024-09-25",
    created_at: "2024-08-20T12:00:00Z",
    updated_at: "2024-08-20T12:00:00Z",
    type_event: "Workshop",
    location: "Online",
    duration: "4 hours",
    capacity: 30,
    tags: ["React Native", "mobile", "development"],
    registration_link: "https://example.com/register/react-native-workshop",
    speakers: ["Chris Evans", "David Lee"],
    status: "open",
  },
  {
    id: 4,
    title: "AI in Software Engineering TechTalk",
    description: "Discover how AI is transforming software engineering processes and tools.",
    author: "user_004",
    image_event: "/assets/images/events/pdd2024.webp",
    date_event: "2024-09-30",
    created_at: "2024-08-20T13:00:00Z",
    updated_at: "2024-08-20T13:00:00Z",
    type_event: "TechTalk",
    location: "New York, NY",
    duration: "1.5 hours",
    capacity: 150,
    tags: ["AI", "software engineering", "TechTalk"],
    registration_link: "https://example.com/register/ai-software-engineering",
    speakers: ["Emily Clarke", "Frank Martin"],
    status: "open",
  },
  {
    id: 5,
    title: "Backend Development Workshop",
    description: "Master the fundamentals of backend development using Node.js and Express.",
    author: "user_005",
    image_event: "/assets/images/events/pdd2024.webp",
    date_event: "2024-10-05",
    created_at: "2024-08-20T14:00:00Z",
    updated_at: "2024-08-20T14:00:00Z",
    type_event: "Workshop",
    location: "Online",
    duration: "5 hours",
    capacity: 40,
    tags: ["backend", "Node.js", "Express", "development"],
    registration_link: "https://example.com/register/backend-workshop",
    speakers: ["George Wilson", "Hannah Moore"],
    status: "soon",
  },
  {
    id: 6,
    title: "UI/UX Design TechTalk",
    description: "Insights into the latest trends and tools in UI/UX design for web and mobile.",
    author: "user_006",
    image_event: "/assets/images/events/pdd2024.webp",
    date_event: "2024-10-10",
    created_at: "2024-08-20T15:00:00Z",
    updated_at: "2024-08-20T15:00:00Z",
    type_event: "TechTalk",
    location: "Los Angeles, CA",
    duration: "2.5 hours",
    capacity: 80,
    tags: ["UI/UX", "design", "TechTalk"],
    registration_link: "https://example.com/register/uiux-techtalk",
    speakers: ["Ivy Taylor", "Jack White"],
    status: "soon",
  },
];

export const eventsInfo: EventInfoType[] = [
  {
    id: 1,
    icon: <CalendarRange className="size-3.5" />,
  },
  {
    id: 2,
    icon: <Clock className="size-3.5" />,
  },
  {
    id: 3,
    icon: <MapPin className="size-3.5" />,
  },
];
