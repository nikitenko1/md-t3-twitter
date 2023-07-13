import "react-lazy-load-image-component/src/effects/opacity.css";
import "@/styles/globals.css";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "@/utils/api";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";
// Localized relative date/time formatting (both for past and future dates).
import TimeAgo from "javascript-time-ago";
// English.
import en from "javascript-time-ago/locale/en";
import { useEffect, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";
import AuthWrapper from "@/components/AuthWrapper";
import Layout from "@/components/Layout";

TimeAgo.addDefaultLocale(en);

const nextProgressOptions = {
  color: "#fbbf24",
  showOnShallow: true,
  options: {
    showSpinner: false,
  },
};

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const theme = useReadLocalStorage("theme");
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  return (
    <div data-theme={theme}>
      <SessionProvider session={session}>
        <AuthWrapper>
          <Layout>
            <NextNProgress {...nextProgressOptions} />
            <Component {...pageProps} />
            <Toaster
              position="top-center"
              toastOptions={{
                success: {
                  style: {
                    background: "#1e9cf1",
                    color: "white",
                  },
                },
                error: {
                  style: {
                    background: "#b2071d",
                    color: "white",
                  },
                },
              }}
            />
          </Layout>
        </AuthWrapper>
      </SessionProvider>
    </div>
  );
};

export default api.withTRPC(MyApp);
