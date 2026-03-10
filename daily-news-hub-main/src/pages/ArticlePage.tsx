import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

import Header from "@/components/newspaper/Header";
import BreakingTicker from "@/components/newspaper/BreakingTicker";
import Footer from "@/components/newspaper/Footer";

type Article = {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  content: string;
  imageUrl?: string;
  author?: string;
  createdAt?: any;
};

const ArticlePage = () => {
  const { id } = useParams();

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;

      try {
        const ref = doc(db, "news", id);
        const snapshot = await getDoc(ref);

        if (snapshot.exists()) {
          const data = {
            id: snapshot.id,
            ...(snapshot.data() as Omit<Article, "id">),
          };

          setArticle(data);
        }
      } catch (error) {
        console.error("Failed to fetch article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading article...
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Article not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BreakingTicker articles={[]} />

      <main className="news-container py-8">
        <article className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>

          {article.subtitle && (
            <p className="text-lg text-muted-foreground mb-4">
              {article.subtitle}
            </p>
          )}

          <div className="text-sm text-muted-foreground mb-6">
            {article.author} • {article.category}
          </div>

          {article.imageUrl && (
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full rounded-lg mb-6"
            />
          )}

          <div className="prose max-w-none">{article.content}</div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default ArticlePage;