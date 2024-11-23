import Note from "./Note";

function ModalComponent({
  notes,
  children,
}: {
  notes: Note[];
  children?: React.ReactNode;
}) {
  return (
    <>
      <ul className="grid gap-[20px] grid-cols-2 md:grid-cols-3 2xl:grid-cols-6">
        {notes.map((note) => (
          <li key={note.id} className="h-full w-full">
            <Note note={note} />
          </li>
        ))}
      </ul>
      {children ? children : null}
    </>
  );
}

export default ModalComponent;
