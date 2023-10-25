import Sidebar from "@/components/layout/sidebar/Sidebar";

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-row">
      <aside className="flex flex-col min-w-max p-5">
        <Sidebar />
      </aside>
      {children}
    </section>
  );
}
