"use client";
import { BookX, CircleX, Pencil, Pin, PinOff } from "lucide-react";
import { type Note } from "../types/noteType";

function Note({ note }: { note: Note }) {
  const modalId = `modal_${note.id}`;
  return (
    <div className="h-full w-full">
      <button
        className="btn relative min-w-[250px] flex flex-col gap-5 h-full p-[1rem] items-start max-w-[350px]"
        onClick={() => document?.getElementById(modalId)?.showModal()}
      >
        {note.pinned ? <Pin className="absolute top-0 right-0" /> : null}
        <h2 className="md:text-2xl font-bold">{note.title}</h2>
        <h3 className="md:text-xl font-semibold">{note.tagline}</h3>
        <p>{note.body.slice(0, 100) + "..."}</p>
      </button>
      <dialog id={modalId} className="modal md:text-[1.5rem] ">
        <div className="modal-box box-content p-[4rem]">
          <form className="flex flex-col  gap-5 ">
            <input type="hidden" name="id" value={note.id} />
            <div className="flex gap-5">
              <label className="w-1/5" htmlFor="title">
                Title
              </label>
              <input
                aria-label="Title of the note"
                className="w-4/5 p-[1rem]"
                type="text"
                id="title"
                name="title"
                defaultValue={note.title}
              />
            </div>
            <div className="flex gap-5">
              <label className="w-1/5" htmlFor="tagline">
                Tagline
              </label>
              <input
                className="w-4/5 p-[1rem]"
                type="text"
                id="tagline"
                name="tagline"
                defaultValue={note.tagline}
                aria-label="Tagline of the note"
              />
            </div>
            <div className="flex gap-5">
              <label className="w-1/5" htmlFor="body">
                Body
              </label>
              <textarea
                className="w-4/5 p-[1rem]"
                id="body"
                name="body"
                defaultValue={note.body}
                aria-label="Body of the note"
              />
            </div>
          </form>
          <div className="modal-action">
            <form>
              <button className="btn btn-primary flex gap-2">
                <Pencil />
                Update
              </button>
            </form>
            <form>
              <button className="btn btn-accent flex gap-2">
                <BookX />
                Delete
              </button>
            </form>
            <form>
              <button className="btn btn-primary flex gap-2">
                {note.pinned ? (
                  <>
                    <PinOff />
                    Unpin
                  </>
                ) : (
                  <>
                    <Pin />
                    Pin
                  </>
                )}
              </button>
            </form>
            <form method="dialog">
              <button className="btn btn-error flex gap-2">
                <CircleX />
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Note;
