import PhysicsDashboard from "@/components/PhysicsDashboard";

export default async function Home({ params }) {
  const { lang } = await params;
  return <PhysicsDashboard lang={lang || "si"} />;
}
