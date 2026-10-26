import Navbar from "@/components/Navbar";

export default function Publiclayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
