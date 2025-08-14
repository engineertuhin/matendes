"use client";
import "../assets/css/globals.css";
import { Inter } from "next/font/google";
import { siteConfig } from "@/config/site";
import Providers from "@/provider/providers";
import "simplebar-react/dist/simplebar.min.css";
import TanstackProvider from "@/provider/providers.client";

import "flatpickr/dist/themes/light.css";
import DirectionProvider from "@/provider/direction.provider";
import store from "@/lib/store";
import { Provider } from "react-redux";
const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children, params: { lang } }) {
  return (
    <html lang={lang}>
      <Provider store={store}>
        <TanstackProvider>
          <Providers>
            <DirectionProvider lang={lang}>{children}</DirectionProvider>
          </Providers>
        </TanstackProvider>
      </Provider>
    </html>
  );
}
