import { useEffect } from "react";

export default function AdBlock() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  }, []);

  return (
    <ins className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-4998926240637053"
      data-ad-slot="1756371155"   // ✅ tera real slot ID
      data-ad-format="auto"
      data-full-width-responsive="true"></ins>
  );
}