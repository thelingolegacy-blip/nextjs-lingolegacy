import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";
import DropCard from "@/components/DropCard";
import DropCountdown from "@/components/DropCountdown";
import { getFulfillmentVendor } from "@/lib/fulfillment";
import { getMerchProducts } from "@/lib/shopify";

export const metadata = {
  title: "Loyalty Lane Merch Drops",
  description: "Tapstitch POD and Loyalty Lane bulk inventory storefront powered by Shopify Storefront API.",
};

export default async function MerchPage() {
  let products = [] as Awaited<ReturnType<typeof getMerchProducts>>["products"]["edges"];
  let error: string | null = null;

  try {
    const data = await getMerchProducts();
    products = data.products.edges;
  } catch (err) {
    error = err instanceof Error ? err.message : "Unable to load Shopify products.";
  }

  return (
    <main className="theme-loyalty-lane min-h-screen bg-[#050505] px-6 py-12 text-[#f5f2eb] studio-enter">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 text-center">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#d4af37]">Loyalty Lane commerce layer</p>
          <h1 className="mt-3 text-5xl font-black uppercase tracking-[-0.06em] text-white md:text-7xl">
            Ecosystem Drops
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-[#f5f2eb]/75">
            Shopify stays the checkout source of truth. Tapstitch vendor items route to POD fulfillment through Shopify, while Loyalty Lane Bulk items stay flagged for physical stock workflows.
          </p>
        </header>

        <DropCountdown targetDate="2026-08-01T00:00:00-04:00" dropName="1991 Heritage Catalogue" />

        {error ? (
          <section className="mt-10 rounded-3xl border border-[#d4af37]/30 bg-[#111] p-6 text-center text-[#f5f2eb]/80">
            <h2 className="text-2xl font-black text-white">Storefront not configured yet</h2>
            <p className="mt-2">{error}</p>
          </section>
        ) : null}

        <section className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map(({ node }) => {
            const image = node.images.edges[0]?.node;
            const price = node.priceRange.minVariantPrice;
            const firstVariant = node.variants.edges.find(({ node: variant }) => variant.availableForSale)?.node;
            const fulfillmentVendor = getFulfillmentVendor(node.vendor);

            return (
              <DropCard key={node.id} className="flex flex-col justify-between">
                <div>
                  {image ? (
                    <a href={`/products/${node.handle}`} className="heritage-scan relative mb-4 block h-64 overflow-hidden rounded-2xl bg-black">
                      <Image src={image.url} alt={image.altText || node.title} fill className="object-cover transition duration-300 hover:scale-105" sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
                    </a>
                  ) : (
                    <div className="mb-4 grid h-64 place-items-center rounded-2xl bg-black text-[#d4af37]">No image</div>
                  )}
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-[#d4af37]">{node.vendor}</span>
                  <h2 className="mt-2 text-xl font-black text-white"><a href={`/products/${node.handle}`}>{node.title}</a></h2>
                  <p className="mt-2 text-sm uppercase tracking-[0.16em] text-[#f5f2eb]/50">{fulfillmentVendor === "tapstitch-pod" ? "Tapstitch POD" : "Bulk inventory"}</p>
                  <p className="mt-3 text-lg font-black text-[#d4af37]">${Number(price.amount).toFixed(2)} {price.currencyCode}</p>
                </div>
                <AddToCartButton variantId={firstVariant?.id} trackingId={node.handle} />
              </DropCard>
            );
          })}
        </section>
      </div>
    </main>
  );
}
