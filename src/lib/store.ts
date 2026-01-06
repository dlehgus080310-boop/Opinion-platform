export type Category = 'Politics' | 'Economy' | 'Society' | 'Culture' | 'Medical' | 'Essay';

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

// In-memory store for development (resets on server restart)
// In a real app, this would be a database.
export let articles: Article[] = [
    {
        id: '1',
        title: 'Example: The Future of Economy',
        author: 'John Doe',
        category: 'Economy',
        content: 'This is a sample article about the economy...',
        status: 'approved',
        createdAt: Date.now(),
    }
];

export const getArticles = () => articles;

export const addArticle = (article: Omit<Article, 'id' | 'createdAt' | 'status'>) => {
    const newArticle: Article = {
        ...article,
        id: Math.random().toString(36).substring(7),
        createdAt: Date.now(),
        status: 'pending',
    };
    articles = [newArticle, ...articles];
    return newArticle;
};

export const updateArticleStatus = (id: string, status: Article['status']) => {
    articles = articles.map(a => a.id === id ? { ...a, status } : a);
};
