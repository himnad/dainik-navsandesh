import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground mt-12">
      <div className="news-container py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <img src={logo} alt="दैनिक नवसंदेश" className="h-10 w-10 object-contain" />
              <span className="font-headline text-xl font-bold">दैनिक नवसंदेश</span>
            </div>
            <p className="text-sm text-primary-foreground/60 italic">
              "सबकी बात, रोज़ाना साथ"
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-headline font-bold mb-3 text-sm uppercase tracking-wider">श्रेणियाँ</h4>
            <ul className="space-y-1.5 text-sm text-primary-foreground/70">
              {["राजनीति", "विश्व समाचार", "खेल", "तकनीक", "विज्ञान", "मनोरंजन"].map((cat) => (
                <li key={cat}>
                  <button className="hover:text-primary-foreground transition-colors">{cat}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-headline font-bold mb-3 text-sm uppercase tracking-wider">हमारे बारे में</h4>
            <ul className="space-y-1.5 text-sm text-primary-foreground/70">
              <li><button className="hover:text-primary-foreground transition-colors">संपादकीय नीति</button></li>
              <li><button className="hover:text-primary-foreground transition-colors">संपर्क करें</button></li>
              <li><button className="hover:text-primary-foreground transition-colors">गोपनीयता नीति</button></li>
              <li><button className="hover:text-primary-foreground transition-colors">नियम एवं शर्तें</button></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-xs text-primary-foreground/50">
          © {new Date().getFullYear()} दैनिक नवसंदेश। सर्वाधिकार सुरक्षित।
        </div>
      </div>
    </footer>
  );
};

export default Footer;
