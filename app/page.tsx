import { getAllNote } from "@/utils/actions";

import ModalComponent from "./components/ModalComponent";
import NoteForm from "./components/NoteForm";
import PaginationComponent from "./components/PaginationComponent";

type PageProps = {
  searchParams: { page: string };
};

async function page({ searchParams }: PageProps) {
  const page = await searchParams;
  const notes = await getAllNote();
  const pinnedNotes = notes.filter((note) => note.pinned === true);
  const unpinnedNotes = notes.filter((note) => note.pinned === false);
  const itemsPerPage = 6;
  const currentPage = Number(page) || 1;
  const totalUnpinnedNotes = Math.ceil(unpinnedNotes.length / itemsPerPage);
  const paginatedUnpinnedNotes = unpinnedNotes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col gap-5">
      <NoteForm />
      {pinnedNotes.length > 0 ? (
        <>
          <p className="font-bold text-2xl">Pinned</p>
          <ModalComponent notes={pinnedNotes} />
        </>
      ) : null}
      <p className="font-bold text-2xl">Others</p>
      <ModalComponent notes={paginatedUnpinnedNotes}>
        <PaginationComponent totalPages={totalUnpinnedNotes} />
      </ModalComponent>
    </div>
  );
}

export default page;
