"use client";

import { useState } from "react";
import type { Certificate } from "@/lib/types";
import { Pagination } from "@/components/ui";
import { CertificateThumbnail } from "./CertificateThumbnail";

const ITEMS_PER_PAGE = 2;

export function CertificateList({ certificates }: Readonly<{ certificates: Certificate[] }>) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(certificates.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;

  return <><div className="mt-12 min-h-[300px] space-y-12">{certificates.slice(start, start + ITEMS_PER_PAGE).map((certificate) => <article key={certificate.title} className="grid grid-cols-[105px_1fr] gap-6 text-[13px] leading-6 sm:grid-cols-[160px_1fr]"><time className="pt-1 font-mono text-[11px] text-neutral-500">{certificate.date}</time><div><h2 className="text-lg font-semibold">{certificate.title}</h2><p className="mt-1 text-neutral-400">{certificate.issuer}</p><div className="mt-4 flex items-end gap-4"><CertificateThumbnail src={certificate.image} title={certificate.title} width={100} height={72} className="h-[72px] w-[100px]" /><a href={certificate.image} target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-500 underline-offset-4 transition hover:text-white hover:underline">View certificate</a></div></div></article>)}</div><Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /></>;
}
