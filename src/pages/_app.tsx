import { onErrorHandler } from "@/libs/axios/responseHandler";
import "@/styles/globals.css";
import { HeroUIProvider } from '@heroui/react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { ToasterProvider } from "@/contexts/ToasterContext";
import ReduxProvider from "@/store/provider";
import AppShell from "@/components/commons/AppShell";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,

        throwOnError(error) {
          onErrorHandler(error)
          return false
        },
      },

      mutations: {
        onError: onErrorHandler
      }
    }
  })
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ReduxProvider>
          <HeroUIProvider>
            <ToasterProvider>
              <AppShell>
                <Component {...pageProps} />
              </AppShell>
            </ToasterProvider>
          </HeroUIProvider>
        </ReduxProvider>
      </QueryClientProvider>
    </SessionProvider>

  )
}