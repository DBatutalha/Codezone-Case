export default function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`w-full py-4 lg:py-8 max-[428px]:py-2 mobile-section ${className}`}
    >
      {children}
    </section>
  );
}
