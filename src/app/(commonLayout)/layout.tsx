import Footer from "@/components/shared/footer";
import NavBar from "@/components/shared/NavBar";
  
const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      <div className="min-h-lvh container mx-auto">{children}</div>
      <Footer />
    </>
  );
};

export default CommonLayout;
