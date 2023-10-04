import Sidebar from "@/components/sidebar/Sidebar";

export default function SearchLayout({ children }) {
  return (
    <section className="flex flex-row">
      <aside className="flex flex-col min-w-max p-5">
        <Sidebar />
      </aside>
      {children}
    </section>
  );
}
