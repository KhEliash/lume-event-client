  import Footer from "@/components/shared/footer";
  import Navbar from "@/components/shared/navbar_temp";
const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="min-h-lvh container mx-auto">{children}</div>
      <Footer />
    </div>
  );
};

export default CommonLayout;
