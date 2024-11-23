"use server";

import { noteSchema } from "@/app/types/noteType";
import prisma from "./db";
import { revalidatePath } from "next/cache";

export async function addNote(prevState, formData: FormData) {
  const { title, tagline, body } = Object.fromEntries(formData);

  const validatedData = noteSchema.safeParse({ title, tagline, body });

  if (!validatedData.success) {
    const formattedErrors = Object.entries(
      validatedData.error.flatten().fieldErrors
    ).map(([field, errors]) => ({
      field,
      errors,
    }));
    console.log(formattedErrors);
    return {
      message: formattedErrors.map((err) => err.errors.join(", ")).join("\n"),
      status: "failure",
    };
  }

  try {
    await prisma.note.create({
      data: {
        title: title as string,
        tagline: tagline as string,
        body: body as string,
      },
    });
  } catch (err) {
    return {
      message: "There was an error with saving your note",
      status: "fail",
    };
  }

  return { message: "New note is successfully created! 📒", status: "success" };
}

export async function updateNote(prevState, formData: FormData) {
  const { id, title, tagline, body } = Object.fromEntries(formData);

  const validatedData = noteSchema.safeParse({ title, tagline, body });

  if (!validatedData.success) {
    const formattedErrors = Object.entries(
      validatedData.error.flatten().fieldErrors
    ).map(([field, errors]) => ({
      field,
      errors,
    }));
    console.log(formattedErrors);
    return {
      message: formattedErrors.map((err) => err.errors.join(", ")).join("\n"),
      status: "failure",
    };
  }

  try {
    await prisma.note.update({
      where: {
        id: id as string,
      },
      data: {
        title: title as string,
        tagline: tagline as string,
        body: body as string,
      },
    });
  } catch (err) {
    return {
      message: "There was an error with updating your note",
      status: "fail",
    };
  }

  return { message: "Note is successfully updated! 📒", status: "success" };
}

export async function deleteNote(prevState, formData: FormData) {
  const { id } = Object.fromEntries(formData);

  try {
    console.log("started");
    await prisma.note.delete({
      where: {
        id: id as string,
      },
    });
    console.log("deleted");
  } catch (err) {
    return {
      message: "There was an error with deleting your note",
      status: "fail",
    };
  }

  return { message: "Note is successfully deleted! 📒", status: "success" };
}

export async function togglePin(prevState, formData: FormData) {
  const { id, pinned } = Object.fromEntries(formData);
  const pinStatus = Number(pinned) === 1 ? false : true;
  try {
    await prisma.note.update({
      where: {
        id: id as string,
      },
      data: {
        pinned: pinStatus,
      },
    });
  } catch (err) {
    return {
      message: "There was an error with pinning your note",
      status: "fail",
    };
  }

  return {
    message: `Note is successfully ${pinStatus ? "pinned" : "unpinned"}! ${
      pinStatus ? "📌" : "📍"
    }`,
    status: "success",
  };
}

export const getAllNote = async () => {
  return await prisma.note.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export async function revalidateNotes() {
  revalidatePath("/");
}
