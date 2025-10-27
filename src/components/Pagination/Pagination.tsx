import { useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useTranslation } from '../../hooks/useTranslation';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const t = useTranslation();
   
  const [pageWindow, setPageWindow] = useState(1);
  const pagesPerWindow = 3; 

  
  const startPage = (pageWindow - 1) * pagesPerWindow + 1;
  const endPage = Math.min(startPage + pagesPerWindow - 1, totalPages);

   
  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const handleNextWindow = () => {
    if (endPage < totalPages) setPageWindow(pageWindow + 1);
  };

  const handlePrevWindow = () => {
    if (pageWindow > 1) setPageWindow(pageWindow - 1);
  };

  return (
    <div className="flex items-center justify-center gap-3">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-1 transition-all ${
          currentPage === 1
            ? ""
            : "bg-Primary text-white border-Primary"
        }`}
      >
        <BiChevronLeft size={16} />
        {t.previous}
      </button>

      
      <div className="flex items-center gap-2">
        
        {pageWindow > 1 && (
          <button
            onClick={handlePrevWindow}
            className="px-3 py-1 text-gray-500 hover:text-Primary transition-all"
          >
            ...
          </button>
        )}

        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded-lg text-sm transition-all ${
              currentPage === page
                ? "border"
                : ""
            }`}
          >
            {page}
          </button>
        ))}

        {endPage < totalPages && (
          <button
            onClick={handleNextWindow}
            className="px-3 py-1 text-gray-500 hover:text-Primary transition-all"
          >
            ...
          </button>
        )}
      </div>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 rounded-lg font-medium text-sm flex items-center gap-1 transition-all ${
          currentPage === totalPages
            ? ""
            : "bg-Primary text-white border-Primary"
        }`}
      >
        {t.next}
        <BiChevronRight size={16} />
      </button>
    </div>
  );
}