'use server';

import { addArticle, updateArticleStatus, deleteArticle as deleteArticleFromStore, updateArticleContent, Article } from "@/lib/store";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { put } from '@vercel/blob';

// ... (keep loginAdmin)

export async function loginAdmin(formData: FormData) {
    // ... (keep existing)
    const password = formData.get('password') as string;

    if (password === '080310') {
        const cookieStore = await cookies();
        cookieStore.set('admin_session', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
        });
        redirect('/admin');
    } else {
        redirect('/admin/login?error=Invalid password');
    }
}

export async function editArticle(formData: FormData) {
    const id = formData.get('id') as string;
    const title = formData.get('title') as string;
    const author = formData.get('author') as string;
    const category = formData.get('category') as Article['category'];
    const content = formData.get('content') as string;
    const imageFile = formData.get('imageFile') as File;
    const deleteImage = formData.get('deleteImage') === 'true';

    let imageUrl = undefined;

    if (deleteImage) {
        imageUrl = ""; // Will be converted to null by store logic
    } else if (imageFile && imageFile.size > 0) {
        try {
            if (process.env.BLOB_READ_WRITE_TOKEN) {
                const blob = await put(imageFile.name, imageFile, { access: 'public' });
                imageUrl = blob.url;
            } else {
                imageUrl = "https://picsum.photos/800/400";
            }
        } catch (error) {
            console.error("Upload failed", error);
        }
    }

    await updateArticleContent(id, {
        title,
        author,
        category,
        content: content || "",
        ...(imageUrl !== undefined ? { imageUrl } : {})
    });

    revalidatePath('/admin');
    revalidatePath(`/article/${id}`);
    revalidatePath('/');
    redirect('/admin');
}

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
