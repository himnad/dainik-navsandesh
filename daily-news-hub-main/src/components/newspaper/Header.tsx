import { Search, UserCog } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const categories = ["होम", "राजनीति", "विश्व", "खेल", "तकनीक", "विज्ञान", "व्यापार", "मनोरंजन", "स्वास्थ्य"];

const Header = () => {
  const today = new Date().toLocaleDateString("hi-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="border-b-2 border-foreground">
      {/* Top bar */}
      <div className="news-container flex items-center justify-between py-2 text-xs border-b border-border">
        <span className="text-muted-foreground">{today}</span>
        <span className="text-muted-foreground italic font-body">
          पत्रकारों द्वारा पाठकों के लिए डेली डिजिटल अखबार
        </span>
        <div className="flex items-center gap-3">
          <Link to="/admin" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors text-xs font-medium">
            <UserCog size={14} /> संपादक पैनल
          </Link>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Search size={16} />
          </button>
        </div>
      </div>

      {/* Main brand */}
      <div className="news-container flex items-center justify-center gap-4 py-4">
        <img src={logo} alt="दैनिक नवसंदेश" className="h-14 w-14 object-contain" />
        <h1 className="text-4xl md:text-5xl font-headline font-black tracking-tight text-brand-maroon">
          दैनिक नवसंदेश
        </h1>
      </div>

      {/* Navigation */}
      <nav className="border-t border-border bg-foreground">
        <div className="news-container flex items-center justify-center gap-1 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              className="px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-colors whitespace-nowrap"
            >
              {cat}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;
