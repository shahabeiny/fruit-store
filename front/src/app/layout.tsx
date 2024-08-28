import "./globals.css";
import 'swiper/swiper-bundle.css';
import 'react-toastify/dist/ReactToastify.css';
import {
  Dana,
  DanaDemiBold,
  DanaMedium,
  MorabbaBold,
  MorabbaLight,
  MorabbaMedium,
} from "@/components/modules/Font/font";
import ThemeProviders from "../providers/themeProviders";
import ReduxProvider from "../providers/storeProviders";
import Me from "@/components/modules/Me/Me";
import { ToastContainer } from "react-toastify";
import { Metadata } from "next";
import Metrics from "@/metrics/Metrics";


export const metadata:Metadata = {
  title: {
    default:"میوه فروش",
    template:"میوه فروش | %s"
  },
  description: "website for store fruit and vegetable",
  icons: {
    icon: "https://www.svgrepo.com/show/54149/apple-fruit.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 
  return (
    <html lang="fa" dir="rtl">
      
      <body
        className={`${DanaMedium.variable}
         ${Dana.variable} 
         ${DanaDemiBold.variable} 
         ${MorabbaLight.variable}
         ${MorabbaMedium.variable}
         ${MorabbaBold.variable}
          font-Dana bg-gray-100 dark:bg-zinc-800 relative `}
      >
        <ReduxProvider>
          <ThemeProviders>
            <Me />
            {children}
            <ToastContainer />
          </ThemeProviders>
        </ReduxProvider>
        <Metrics/>
      </body>
    </html>
  );
}
