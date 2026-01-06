'use server';

import { addArticle, updateArticleStatus, Article } from "@/lib/store";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function submitArticle(formData: FormData) {
    const title = formData.get('title') as string;
    const author = formData.get('author') as string;
    const category = formData.get('category') as Article['category'];
    const content = formData.get('content') as string;
    // In a real app, we would handle file upload here. 
    // For this prototype, we'll accept a URL string or use a placeholder if provided as text.
    // If it was a file input, we'd need to process it.
    const imageUrl = formData.get('imageUrl') as string;

    if (!title || !author || !category || !content) {
        throw new Error("Missing fields");
    }

    addArticle({
        title,
        author,
        category,
        content,
        imageUrl: imageUrl || undefined,
    });

    revalidatePath('/admin');
    redirect('/submit/success');
}

export async function approveArticle(id: string) {
    updateArticleStatus(id, 'approved');
    revalidatePath('/');
    revalidatePath('/admin');
}

export async function rejectArticle(id: string) {
    updateArticleStatus(id, 'rejected');
    revalidatePath('/admin');
}
