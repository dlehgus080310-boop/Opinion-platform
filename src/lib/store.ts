import { prisma } from "./prisma";

export type Category = 'Politics' | 'Economy' | 'Society' | 'Culture' | 'Science' | 'Medical' | 'Essay' | 'Academic Research' | 'AP Economics Insights';

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

// Fetch all articles
export const getArticles = async (): Promise<Article[]> => {
    try {
        const articles = await prisma.article.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return articles.map(article => ({
            id: article.id,
            title: article.title,
            author: article.author,
            category: article.category as Category,
            content: article.content,
            imageUrl: article.imageUrl || undefined,
            status: article.status as Article["status"],
            createdAt: article.createdAt.getTime(),
        }));
    } catch (error) {
        console.error("Prisma Error getArticles:", error);
        return [];
    }
};

// Fetch single article by ID
export const getArticleById = async (id: string): Promise<Article | undefined> => {
    try {
        const article = await prisma.article.findUnique({
            where: { id },
        });

        if (!article) return undefined;

        return {
            id: article.id,
            title: article.title,
            author: article.author,
            category: article.category as Category,
            content: article.content,
            imageUrl: article.imageUrl || undefined,
            status: article.status as Article["status"],
            createdAt: article.createdAt.getTime(),
        };
    } catch (error) {
        console.error("Prisma Error getArticleById:", error);
        return undefined;
    }
};

export const addArticle = async (article: Omit<Article, 'id' | 'createdAt' | 'status'>) => {
    const newArticle = await prisma.article.create({
        data: {
            title: article.title,
            author: article.author,
            category: article.category,
            content: article.content,
            imageUrl: article.imageUrl || null,
            status: 'pending',
        }
    });

    return {
        id: newArticle.id,
        title: newArticle.title,
        author: newArticle.author,
        category: newArticle.category as Category,
        content: newArticle.content,
        imageUrl: newArticle.imageUrl || undefined,
        status: newArticle.status as Article["status"],
        createdAt: newArticle.createdAt.getTime(),
    };
};

export const updateArticleStatus = async (id: string, status: Article['status']) => {
    await prisma.article.update({
        where: { id },
        data: { status },
    });
};

export const deleteArticle = async (id: string) => {
    await prisma.article.delete({
        where: { id },
    });
};

export const updateArticleContent = async (id: string, data: Partial<Omit<Article, 'id' | 'createdAt' | 'status'>>) => {
    await prisma.article.update({
        where: { id },
        data: {
            ...data,
            imageUrl: data.imageUrl === '' ? null : data.imageUrl,
        }
    });
};
