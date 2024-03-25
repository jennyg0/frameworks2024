"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { PrivyProvider } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { base, baseSepolia } from "viem/chains";
import { http, createConfig } from "wagmi";
import { WagmiProvider } from "@privy-io/wagmi";

const chains = [base, baseSepolia];
const inter = Inter({ subsets: ["latin"] });
const config = createConfig({
  chains: [base, baseSepolia], // Pass your required chains as an array
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
  ssr: true,
});
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  return (
    <html lang='en'>
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <PrivyProvider
            appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
            onSuccess={() => router.push("/campaigns")}
            config={{
              // Customize Privy's appearance in your app
              appearance: {
                theme: "dark",
                accentColor: "#676FFF",
              },
              embeddedWallets: {
                createOnLogin: "users-without-wallets",
              },
            }}
          >
            <WagmiProvider config={config}>{children}</WagmiProvider>
          </PrivyProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
