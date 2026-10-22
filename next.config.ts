import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // `cacheComponents` y `partialPrefetching` quedan deshabilitados a propósito:
  // son incompatibles con `export const dynamic = "force-dynamic"`, que necesitamos
  // porque todas las páginas leen datos frescos desde PostgreSQL en cada visita.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
