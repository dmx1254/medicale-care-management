// import "@/app/globals.css";
// import { Metadata, Viewport } from "next";

import { cn } from "@/lib/utils";
import TeamSwitcher from "@/components/dash-comp/team-switcher";
import { MainNav } from "@/components/dash-comp/main-nav";
import { Search } from "@/components/dash-comp/search";
import { UserNav } from "@/components/dash-comp/user-nav";
import { CalendarDateRangePicker } from "@/components/dash-comp/date-range-picker";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/dash-comp/Sidebar";
// import { Toaster as DefaultToaster } from "@/components/ui/toaster";
// import { Toaster as NewYorkSonner } from "@/components/ui/sonner";
// import { Toaster as NewYorkToaster } from "@/components/ui/toaster";

// export const metadata: Metadata = {
//   title: {
//     default: siteConfig.name,
//     template: `%s - ${siteConfig.name}`,
//   },
//   metadataBase: new URL(siteConfig.url),
//   description: siteConfig.description,
//   keywords: [
//     "Next.js",
//     "React",
//     "Tailwind CSS",
//     "Server Components",
//     "Radix UI",
//   ],
//   authors: [
//     {
//       name: "mamadou SY",
//       url: "https://github.com/dmx1254",
//     },
//   ],
//   creator: "shadcn",
//   openGraph: {
//     type: "website",
//     locale: "fr_FR",
//     url: siteConfig.url,
//     title: siteConfig.name,
//     description: siteConfig.description,
//     siteName: siteConfig.name,
//     images: [
//       {
//         url: siteConfig.ogImage,
//         width: 1200,
//         height: 630,
//         alt: siteConfig.name,
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: siteConfig.name,
//     description: siteConfig.description,
//     images: [siteConfig.ogImage],
//     creator: "mamadou SY",
//   },
//   icons: {
//     icon: "/favicon.ico",
//     shortcut: "/favicon-16x16.png",
//     apple: "/apple-touch-icon.png",
//   },
//   manifest: `${siteConfig.url}/site.webmanifest`,
// }

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className={cn("min-h-screen flex bg-dark-300 font-sans antialiased")}>
      <Sidebar />
      <div className="flex flex-col flex-1">
        <div className="flex-1 space-y-4 p-8 pt-6 sticky top-0 left-0 right-0 z-50">
          <div className="">
            <div className="flex h-16 items-center">
              {/* <TeamSwitcher /> */}
              {/* <MainNav className="mx-2" /> */}
              <div className="ml-auto flex items-center space-x-4">
                <Search />
                <UserNav />
              </div>
            </div>
          </div>
          {/* <div className="flex items-end justify-end space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-end space-x-2">
            <CalendarDateRangePicker />
            <Button className="bg-green-600 text-green-500">Download</Button>
          </div>
        </div> */}
        </div>
        <div className="relative flex min-h-screen flex-col">{children}</div>
      </div>
    </div>
  );
}
