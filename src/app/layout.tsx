import "./globals.css";
import { CartProvider } from "@/context/CartContext";

export const metadata = {
  title: "RevoShop",
  description: "Demo e-commerce app for RevoU Milestone 3",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
<body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
