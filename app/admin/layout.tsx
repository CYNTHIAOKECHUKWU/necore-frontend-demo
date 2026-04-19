export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen bg-[#0F172A] text-white">
      {children}
    </section>
  );
}