"use client";
import { useRouter } from "next/navigation";
import { Note } from "../types/noteType";
import { useThemeToggle } from "./ThemeProvider";

function PaginationComponent({ totalPages }: { totalPages: number }) {
  const { currentPage, setCurrentPage } = useThemeToggle();
  const router = useRouter();

  const handlePageChange = (pageNumber: number) => {
    router.push(`/?page=${pageNumber}`, { scroll: false });
    setCurrentPage(pageNumber);
  };

  return (
    <div className="join flex items-center justify-center">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          className={`join-item btn btn-lg ${
            i + 1 === currentPage ? "btn-active" : ""
          }`}
          onClick={() => handlePageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}

export default PaginationComponent;
