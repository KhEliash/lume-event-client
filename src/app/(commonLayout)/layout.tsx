import NavBar from "@/components/shared/NavBar";
import Footer from "@/components/shared/footer";
  
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
