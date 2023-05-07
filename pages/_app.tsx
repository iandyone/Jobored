import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import AppLayout from "@/components/layouts/app-layout";
import store from "@/store/store";
import "@/styles/globals.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AppLayout>
          <Component {...pageProps} />
      </AppLayout>
    </Provider>
  );
}

