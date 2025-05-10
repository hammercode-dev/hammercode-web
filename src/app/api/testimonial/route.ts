import { testimonialData } from "@/features/home/constants";

export async function GET() {
  try {
    const data = testimonialData;

    return Response.json({ data }, { status: 200 });
  } catch (error) {
    return Response.json(
      {
        message: "Failed to get testimonial data",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
