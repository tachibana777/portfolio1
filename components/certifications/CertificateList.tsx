"use client";

import { useState } from "react";
import Image from "next/image";
import type { Certificate } from "@/lib/types";
import { Pagination } from "@/components/ui";

const ITEMS_PER_PAGE = 2;

export function CertificateList({ certificates }: Readonly<{ certificates: Certificate[] }>) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(certificates.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;

  return <><div className="mt-10 min-h-[230px] space-y-9">{certificates.slice(start, start + ITEMS_PER_PAGE).map((certificate) => <article key={certificate.title} className="grid grid-cols-[90px_1fr] gap-5 text-xs leading-relaxed sm:grid-cols-[150px_1fr]"><time className="font-mono text-[10px] text-neutral-500">{certificate.date}</time><div><h2 className="text-base font-semibold">{certificate.title}</h2><p className="text-neutral-400">{certificate.issuer}</p><Image src={certificate.image} alt={certificate.title} width={70} height={48} className="mt-3 h-12 w-[70px] object-cover" /></div></article>)}</div><Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /></>;
}
