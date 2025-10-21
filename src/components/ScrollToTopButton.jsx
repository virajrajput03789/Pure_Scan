import { useEffect, useState } from "react";

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return visible ? (
    <button
      onClick={scrollToTop}
      className="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded-full shadow-lg z-50 hover:bg-green-600 transition"
      aria-label="Scroll to top"
    >
      ↑
    </button>
  ) : null;
}

export default ScrollToTopButton;