import { Header } from "./Header";
import { Sidebar } from "./sidebar";

const Master = ({ children }) => {
  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col h-screen min-w-0 bg-slate-50">
        <Header />

        <main className="flex-1 overflow-y-auto">
          <div className="p-8 mx-auto w-full space-y-8">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Master;
