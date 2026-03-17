import { redirect } from "next/navigation";

// Single-product store: all product pages redirect to homepage
export default async function ProductPage() {
  redirect("/#product");
}
