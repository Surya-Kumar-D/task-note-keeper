"use client";
import { Pin } from "lucide-react";
import { type Note } from "../types/noteType";

function Note({ note }: { note: Note }) {
  return (
    <div className="h-full w-full">
      <button
        className="btn relative min-w-[250px] flex flex-col gap-5 h-full p-[1rem] items-start max-w-[350px]"
        onClick={() => document?.getElementById("my_modal_1")?.showModal()}
      >
        {note.pinned ? <Pin className="absolute top-0 right-0" /> : null}
        <h2 className="text-2xl font-bold">{note.title}</h2>
        <h3 className="text-xl font-semibold">{note.tagline}</h3>
        <p>{note.body.slice(0, 100) + "..."}</p>
      </button>
      <dialog id="my_modal_1" className="modal text-[2rem] ">
        <div className="modal-box box-content p-[4rem]">
          <form className="flex flex-col  gap-5 ">
            <div className="flex gap-5">
              <label className="w-1/5" htmlFor="title">
                Title
              </label>
              <input
                aria-label="Title of the note"
                className="w-4/5"
                type="text"
                id="title"
                name="title"
              />
            </div>
            <div className="flex gap-5">
              <label className="w-1/5" htmlFor="tagline">
                Tagline
              </label>
              <input
                className="w-4/5"
                type="text"
                id="tagline"
                name="tagline"
                aria-label="Tagline of the note"
              />
            </div>
            <div className="flex gap-5">
              <label className="w-1/5" htmlFor="body">
                Body
              </label>
              <textarea
                className="w-4/5"
                id="body"
                name="body"
                aria-label="Body of the note"
              />
            </div>
          </form>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Note;
