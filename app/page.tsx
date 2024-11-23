import { getAllNote } from "@/utils/actions";
import Button from "./components/Button";
import ModalComponent from "./components/ModalComponent";
import NoteForm from "./components/NoteForm";
import PaginationComponent from "./components/PaginationComponent";

async function page() {
  const notes = await getAllNote();
  const pinnedNotes = notes.filter((note) => note.pinned === true);
  const unpinnedNotes = notes.filter((note) => note.pinned === false);
  console.log(pinnedNotes);
  console.log(unpinnedNotes);
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
      <ModalComponent notes={unpinnedNotes}>
        <PaginationComponent />
      </ModalComponent>
    </div>
  );
}

export default page;
