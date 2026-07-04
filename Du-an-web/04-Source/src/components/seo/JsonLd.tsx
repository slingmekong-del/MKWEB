// Renders a structured-data <script> tag. JSON-LD is data, not executable code,
// so a native <script> is correct (per Next.js guidance). We escape "<" to its
// unicode form to prevent any XSS via string fields.
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
