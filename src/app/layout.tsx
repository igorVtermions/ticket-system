import "./globals.css";
import  Header  from "@/components/Header/index";
import  Footer  from "@/components/Footer/index";

export const metadata = {
  title: "Sistema de Tickets",
  description: "Gerencie seus tickets",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 p-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
