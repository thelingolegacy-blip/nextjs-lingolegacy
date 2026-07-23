const storefrontDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export type ShopifyMoney = {
  amount: string;
  currencyCode: string;
};

export type ShopifyProduct = {
  id: string;
  title: string;
  handle: string;
  vendor: string;
  description: string;
  productType?: string;
  tags?: string[];
  priceRange: {
    minVariantPrice: ShopifyMoney;
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string | null;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        availableForSale: boolean;
      };
    }>;
  };
};

export type ShopifyProductsResponse = {
  products: {
    edges: Array<{ node: ShopifyProduct }>;
  };
};

export type ShopifyProductResponse = {
  productByHandle: ShopifyProduct | null;
};

export type ShopifyCartCreateResponse = {
  cartCreate: {
    cart: {
      id: string;
      checkoutUrl: string;
    } | null;
    userErrors: Array<{ field: string[] | null; message: string }>;
  };
};

function assertShopifyConfig() {
  if (!storefrontDomain || !storefrontAccessToken) {
    throw new Error(
      "Shopify Storefront API is not configured. Set NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN.",
    );
  }
}

export async function shopifyFetch<T>({
  query,
  variables,
  cache = "force-cache",
  revalidate = 300,
}: {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
  revalidate?: number;
}): Promise<T> {
  assertShopifyConfig();

  const requestInit: RequestInit & { next?: { revalidate: number } } = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken!,
    },
    body: JSON.stringify({ query, variables }),
    cache,
  };

  if (cache !== "no-store") {
    requestInit.next = { revalidate };
  }

  const response = await fetch(
    `https://${storefrontDomain}/api/2026-01/graphql.json`,
    requestInit,
  );

  if (!response.ok) {
    throw new Error(`Shopify Storefront API returned ${response.status}`);
  }

  const payload = (await response.json()) as {
    data?: T;
    errors?: Array<{ message: string }>;
  };

  if (payload.errors?.length) {
    throw new Error(payload.errors.map((error) => error.message).join("; "));
  }

  if (!payload.data) {
    throw new Error("Shopify Storefront API returned no data.");
  }

  return payload.data;
}

export async function getMerchProducts() {
  const query = `
    query getMerchProducts {
      products(first: 24, sortKey: CREATED_AT, reverse: true) {
        edges {
          node {
            id
            title
            handle
            vendor
            productType
            tags
            description
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  availableForSale
                }
              }
            }
          }
        }
      }
    }
  `;

  return shopifyFetch<ShopifyProductsResponse>({ query });
}

export async function getProductByHandle(handle: string) {
  const query = `
    query getProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        handle
        vendor
        productType
        tags
        description
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 3) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              availableForSale
            }
          }
        }
      }
    }
  `;

  return shopifyFetch<ShopifyProductResponse>({
    query,
    variables: { handle },
  });
}

export async function createCart(variantId: string, quantity = 1) {
  const mutation = `
    mutation createCart($lines: [CartLineInput!]) {
      cartCreate(input: { lines: $lines }) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  return shopifyFetch<ShopifyCartCreateResponse>({
    query: mutation,
    variables: {
      lines: [{ merchandiseId: variantId, quantity }],
    },
    cache: "no-store",
    revalidate: 0,
  });
}
