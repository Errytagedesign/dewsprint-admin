import Link from "next/link";
import Image from "next/image";
import { allImages } from "@/public/images/images";
import { cn } from "@/libs/utils";

function BrandLogo({ className }: { className?: string; onboard?: boolean }) {
  return (
    <Link href="/" className={cn("flex items-center gap-4", className)}>
      <figure className="size-10">
        <Image src={allImages.brandLogo} alt="DewSprint Logo" />
      </figure>
      <h4>DewSprint</h4>
    </Link>
  );
}

export default BrandLogo;
