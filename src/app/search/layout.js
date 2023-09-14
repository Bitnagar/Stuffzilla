"use client";
import Sidebar from "@/components/Sidebar";
import store from "@/store/store";
import { Provider } from "react-redux";

export default function SearchLayout({ children }) {
  return (
    <Provider store={store}>
      <section className="flex flex-row">
        <aside className="flex flex-col items-start">
          <Sidebar />
        </aside>
        {children}
      </section>
    </Provider>
  );
}
