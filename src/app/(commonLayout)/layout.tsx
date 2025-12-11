import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/Navbar";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="min-h-lvh container mx-auto">{children}</div>
      <Footer />
    </>
  );
};

export default CommonLayout;
