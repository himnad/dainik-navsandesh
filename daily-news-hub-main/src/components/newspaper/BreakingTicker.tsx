import { Link } from "react-router-dom";

type Article = {
  id: string;
  title: string;
};

interface BreakingTickerProps {
  articles: Article[];
}

const BreakingTicker: React.FC<BreakingTickerProps> = ({ articles }) => {

  if (!articles || articles.length === 0) return null;

  return (
    <div className="bg-red-600 text-white overflow-hidden">

      <div className="flex items-center">

        {/* BREAKING Label */}
        <span className="font-bold px-4 py-2 bg-red-700">
          BREAKING
        </span>

        {/* Headlines */}
        <div className="flex gap-8 animate-marquee whitespace-nowrap px-4">

          {articles.map((article) => (
            <Link key={article.id} to={`/news/${article.id}`}>

              <span className="font-medium hover:underline">
                🔴 {article.title}
              </span>

              <span className="mx-4">|</span>

            </Link>
          ))}

        </div>

      </div>

    </div>
  );
};

export default BreakingTicker;