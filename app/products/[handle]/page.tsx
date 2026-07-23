import Image from "next/image";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import { getFulfillmentVendor } from "@/lib/fulfillment";
import { getProductByHandle } from "@/lib/shopify";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const data = await getProductByHandle(handle);
  const product = data.productByHandle;

  if (!product) notFound();

  const image = product.images.edges[0]?.node;
  const firstVariant = product.variants.edges.find(({ node }) => node.availableForSale)?.node;
  const price = product.priceRange.minVariantPrice;
  const fulfillmentVendor = getFulfillmentVendor(product.vendor);

  return (
    <main className="min-h-screen bg-black px-6 py-12 text-[#f5f2eb]">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-2">
        <div className="relative min-h-96 overflow-hidden rounded-[2rem] border border-[#d4af37]/30 bg-[#111]">
          {image ? (
            <Image src={image.url} alt={image.altText || product.title} fill className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" priority />
          ) : (
            <div className="grid h-full min-h-96 place-items-center text-[#d4af37]">Image pending</div>
          )}
        </div>

        <section className="flex flex-col justify-center">
          <a href="/merch" className="mb-6 text-sm font-black uppercase tracking-[0.2em] text-[#d4af37]">Back to merch</a>
          <span className="text-sm font-black uppercase tracking-[0.24em] text-[#d4af37]">{product.vendor}</span>
          <h1 className="mt-3 text-4xl font-black uppercase tracking-[-0.04em] text-white md:text-6xl">{product.title}</h1>
          <p className="mt-4 text-sm uppercase tracking-[0.18em] text-[#f5f2eb]/55">{fulfillmentVendor === "tapstitch-pod" ? "Tapstitch POD fulfillment" : "Bulk inventory fulfillment"}</p>
          <p className="mt-5 text-3xl font-black text-[#d4af37]">${Number(price.amount).toFixed(2)} {price.currencyCode}</p>
          <p className="mt-6 leading-8 text-[#f5f2eb]/75">{product.description}</p>
          <AddToCartButton variantId={firstVariant?.id} trackingId={product.handle} />
        </section>
      </div>
    </main>
  );
}
