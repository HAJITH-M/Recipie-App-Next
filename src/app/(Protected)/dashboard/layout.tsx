import Navbar from "@/components/Navbar";

export default function DashboardLayout({
    children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return <>
    <div className="">
        <div className="p-4 lg:pt-4 ">
        <div className="max-w-7xl mx-auto ">
        <Navbar/>
        </div>
        </div>
        {children}

        </div>

   </>;
  }