import Navbar from "@/components/Navbar";

export default function DashboardLayout({
    children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return <>
    <div className="">
        <div className="p-0 md:p-4 lg:pt-4 ">
        <div className="max-w-8xl mx-auto ">
        <Navbar/>
        </div>
        </div>
        {children}

        </div>

   </>;
  }