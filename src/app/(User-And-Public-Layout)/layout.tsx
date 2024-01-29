import Footer from "@/ClientFiles/Components/Shared/Footer/Footer";
import Navbar from "@/ClientFiles/Components/Shared/Navbar/Navbar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
