import { Sora } from "next/font/google";
import Link from "next/link";
const sora = Sora({ subsets: ["latin"] });

// Note: Hanya u/ scaffold
// Silakan di bongkar implementasinya

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body className={`${sora.className}`}>
        <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", columnGap: "2rem" }}>
          <div style={{ width: 200 }} className="fixed top-0 bottom-0 left-0 z-10 bg-black text-white">
            <h1 className="mt-6 px-4 font-bold">HMCWeb Admin</h1>

            <ul className="mt-8 px-4">
              <li>
                <Link href="/admin/events">Events</Link>
              </li>
            </ul>
          </div>

          <div style={{ gridColumnStart: 2 }}>
            {/* Content */}
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
