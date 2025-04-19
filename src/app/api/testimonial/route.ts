import { testimonialData } from "@/features/home/constants";

export async function GET() {
  try {
    const data = testimonialData;

    return new Response(
      JSON.stringify({
        message: "Success get data testimonial",
        data,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching testimonials:", error);

    return new Response(
      JSON.stringify({
        message: "Failed to get testimonial data",
        error: (error as Error).message,
      }),
      { status: 500 }
    );
  }
}
