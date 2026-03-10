import { useState, useEffect, useMemo } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, QueryDocumentSnapshot } from "firebase/firestore";

import Header from "@/components/newspaper/Header";
import BreakingTicker from "@/components/newspaper/BreakingTicker";
import HeroStory from "@/components/newspaper/HeroStory";
import SidebarNews from "@/components/newspaper/SidebarNews";
import CategorySection from "@/components/newspaper/CategorySection";
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

const Index = () => {

  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const unsubscribe = onSnapshot(collection(db, "news"), (snapshot) => {

      const data: Article[] = snapshot.docs.map(
        (doc: QueryDocumentSnapshot) => ({
          id: doc.id,
          ...(doc.data() as Omit<Article, "id">),
        })
      );

      const sorted = data.sort(
        (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
      );

      setNews(sorted);
      setLoading(false);

    }, (error) => {

      console.error("Failed to fetch news:", error);
      setLoading(false);

    });

    return () => unsubscribe();

  }, []);

  // Group articles by category
  const categoryMap = useMemo(() => {

    const map: Record<string, Article[]> = {};

    news.forEach((article) => {

      if (!map[article.category]) {
        map[article.category] = [];
      }

      map[article.category].push(article);

    });

    return map;

  }, [news]);

  const categories = Object.keys(categoryMap);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground text-lg">
          Loading news...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">

      <Header />

      {/* ✅ Latest 5 headlines ticker */}
      <BreakingTicker articles={news.slice(0, 5)} />

      <main className="news-container py-6">

        {/* Hero + Sidebar */}
        {news.length > 0 && (

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Hero story */}
            <div className="lg:col-span-2">
              <HeroStory article={news[0]} />
            </div>

            {/* Sidebar latest news */}
            <div className="lg:col-span-1">
              <SidebarNews articles={news.slice(1, 6)} />
            </div>

          </div>

        )}

        {/* Category Sections */}
        {categories.length > 0 && (

          <div className="space-y-8 mt-8">

            {categories.map((category) => (

              <div key={category}>

                <div className="section-divider" />

                <CategorySection
                  title={category}
                  articles={categoryMap[category] || []}
                />

              </div>

            ))}

          </div>

        )}

        {/* Empty state */}
        {!loading && news.length === 0 && (

          <div className="text-center py-20 text-muted-foreground">

            <p className="text-xl">
              No articles published yet.
            </p>

            <p className="text-sm mt-2">
              Add articles in the CMS to see them here.
            </p>

          </div>

        )}

      </main>

      <Footer />

    </div>
  );
};

export default Index;