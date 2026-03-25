import { redirect } from "next/navigation";

// Single-product store: all product pages redirect to homepage (top, no anchor)
export default async function ProductPage() {
  redirect("/");
}
