import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const BackArrowButton: React.FC = () => {
  const [backHref, setBackHref] = useState("/");

  useEffect(() => {
    const storedUrl = sessionStorage.getItem("lastHomePageUrl");

    if (storedUrl) {
      setBackHref(storedUrl);
    }
  }, []);

  return (
    <Link
      href={backHref}
      className="fixed left-6 top-24 z-50 rounded-full border border-white/10 bg-background/30 p-2 backdrop-blur-md transition-colors hover:bg-background/50"
      aria-label="Back to home"
    >
      <ArrowLeft className="h-5 w-5" />
    </Link>
  );
};

export default BackArrowButton;
