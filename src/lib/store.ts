export type Category = 'Politics' | 'Economy' | 'Society' | 'Culture' | 'Medical' | 'Essay' | 'Portfolio (Art)' | 'Portfolio (Architecture)';

export interface Article {
    id: string;
    title: string;
    author: string;
    category: Category;
    content: string;
    imageUrl?: string;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: number;
}

import { sql } from '@vercel/postgres';

// Ensure the table exists. Ideally this is run as a migration.
async function ensureTableExists() {
    await sql`
    CREATE TABLE IF NOT EXISTS articles (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      category TEXT NOT NULL,
      content TEXT NOT NULL,
      image_url TEXT,
      status TEXT NOT NULL,
      created_at BIGINT NOT NULL
    );
  `;
}

export const getArticles = async (): Promise<Article[]> => {
    // Determine context: are we checking if table exists? 
    // For simplicity in this prototype, we'll try to query. If it fails, we might need to create table.
    // But let's just create table if not exists first, it's cheap enough for this scale.
    try {
        await ensureTableExists();
        const { rows } = await sql`SELECT * FROM articles`;
        return rows.map(row => ({
            id: row.id,
            title: row.title,
            author: row.author,
            category: row.category as Category,
            content: row.content,
            imageUrl: row.image_url || undefined,
            status: row.status as 'pending' | 'approved' | 'rejected',
            createdAt: Number(row.created_at),
        }));
    } catch (error) {
        console.error('Database Error:', error);
        return [];
    }
};

export const addArticle = async (article: Omit<Article, 'id' | 'createdAt' | 'status'>) => {
    await ensureTableExists();

    const id = Math.random().toString(36).substring(7);
    const createdAt = Date.now();
    const status = 'pending';

    await sql`
        INSERT INTO articles (id, title, author, category, content, image_url, status, created_at)
        VALUES (${id}, ${article.title}, ${article.author}, ${article.category}, ${article.content}, ${article.imageUrl || null}, ${status}, ${createdAt})
    `;

    return { ...article, id, createdAt, status };
};

export const updateArticleStatus = async (id: string, status: Article['status']) => {
    await sql`
        UPDATE articles SET status = ${status} WHERE id = ${id}
    `;
};
