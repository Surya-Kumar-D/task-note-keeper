"use server";

import { noteSchema } from "@/app/types/noteType";
import prisma from "./db";

export async function addNote(formData: FormData) {
  const { title, tagline, body } = Object.fromEntries(formData);

  const validatedData = noteSchema.safeParse({ title, tagline, body });

  if (!validatedData.success) {
    console.log(validatedData.error);
    throw new Error(validatedData.error.message);
  }

  await prisma.note.create({
    data: {
      title: title as string,
      tagline: tagline as string,
      body: body as string,
    },
  });
}

export const getAllNote = async () => {
  return await prisma.note.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};
