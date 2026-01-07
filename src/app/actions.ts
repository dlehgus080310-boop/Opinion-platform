'use server';

import { addArticle, updateArticleStatus, deleteArticle as deleteArticleFromStore, Article } from "@/lib/store";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { put } from '@vercel/blob';

// ... (keep middle content same, just focusing on imports and new function)

export async function deleteArticle(id: string) {
    await deleteArticleFromStore(id);
    revalidatePath('/admin');
    revalidatePath('/');
}

export async function submitArticle(formData: FormData) {
    const title = formData.get('title') as string;
    const author = formData.get('author') as string;
    const category = formData.get('category') as Article['category'];
    const content = formData.get('content') as string;
    const imageFile = formData.get('imageFile') as File;

    if (!title || !author || !category) {
        throw new Error("Missing fields");
    }

    // For Portfolio, content is optional. For others, it might be required, but we'll relax it for now.

    let imageUrl = '';

    if (imageFile && imageFile.size > 0) {
        try {
            // This will only work if BLOB_READ_WRITE_TOKEN is set (on Vercel)
            // For local dev without token, we'll skip or use a placeholder.
            if (process.env.BLOB_READ_WRITE_TOKEN) {
                const blob = await put(imageFile.name, imageFile, {
                    access: 'public',
                });
                imageUrl = blob.url;
            } else {
                console.warn("No BLOB token found. Using placeholder.");
                imageUrl = "https://picsum.photos/800/400"; // Placeholder for local dev
            }
        } catch (error) {
            console.error("Upload failed", error);
            // Default to placeholder if upload fails (e.g. locally)
            imageUrl = "https://picsum.photos/800/400";
        }
    }

    await addArticle({
        title,
        author,
        category,
        content: content || "", // Allow empty content
        imageUrl: imageUrl || undefined,
    });

    revalidatePath('/admin');
    redirect('/submit/success');
}

export async function approveArticle(id: string) {
    await updateArticleStatus(id, 'approved');
    revalidatePath('/');
    revalidatePath('/admin');
}

export async function rejectArticle(id: string) {
    await updateArticleStatus(id, 'rejected');
    revalidatePath('/admin');
}
