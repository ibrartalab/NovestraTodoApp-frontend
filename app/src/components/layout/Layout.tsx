import React, { useContext } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ThemeContext } from "../../context/ThemeContext";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { theme, text } = useContext(ThemeContext);
  return (
    <div className={`layout w-full h-screen ${theme} ${text}`}>
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center">
        {children}
      </main>
      <Footer />
    </div>
  );
};
