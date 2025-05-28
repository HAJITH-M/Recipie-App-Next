import Navbar from "@/components/Navbar";

export default function DashboardLayout({
    children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return <>
    <div className="bg-amber-50 dark:bg-black min-h-screen">
        <div className="p-0 md:p-4 lg:pt-4 ">
        <div className="max-w-7xl mx-auto fixed top-0 md:top-2 left-0 right-0 z-50 bg-white ">
            <Navbar/>
        </div>
        </div>

<div className="md:pt-14 pt-20 pb-8  md:px-8 lg:px-12">
{children}

</div>
        </div>

   </>;
  }