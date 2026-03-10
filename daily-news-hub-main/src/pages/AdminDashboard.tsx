import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useToast } from "@/hooks/use-toast";

import { Newspaper, LogOut, Plus, Trash2, ImagePlus, Clock } from "lucide-react";

import { db } from "@/lib/firebase";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

const CATEGORIES = [
  "राजनीति",
  "विश्व समाचार",
  "खेल",
  "तकनीक",
  "विज्ञान एवं स्वास्थ्य",
  "व्यापार",
  "मनोरंजन",
];

const AdminDashboard = () => {

  const navigate = useNavigate();
  const { toast } = useToast();

  const [user, setUser] = useState<any>(null);

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [articles, setArticles] = useState<any[]>([]);

  // Load admin + fetch articles
  useEffect(() => {

    const stored = localStorage.getItem("admin_user");

    if (!stored) {
      navigate("/admin");
      return;
    }

    setUser(JSON.parse(stored));

    fetchArticles();

  }, [navigate]);

  const fetchArticles = async () => {

    const snapshot = await getDocs(collection(db, "news"));

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setArticles(data);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("admin_user");
    navigate("/admin");
  };

  // Image preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const file = e.target.files?.[0];

    if (file) {

      setImageFile(file);

      const reader = new FileReader();

      reader.onload = () => {
        setImagePreview(reader.result as string);
      };

      reader.readAsDataURL(file);
    }

  };

  // Upload image to Cloudinary
  const uploadImageToCloudinary = async (file: File) => {

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "news_upload");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dbqqxolxt/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    return data.secure_url;

  };

  // Publish article
  const handlePublish = async (e: React.FormEvent) => {

    e.preventDefault();
    // 🔍 Debug line
    console.log("Form values:", { title, category, content });
    if (!title || !category || !content) {

      toast({
        title: "त्रुटि",
        description: "कृपया सभी आवश्यक फ़ील्ड भरें।",
        variant: "destructive",
      });

      return;
    }

    try {
      //console.log("Step 1: Entered try block");
      let imageUrl = "";

      if (imageFile) {
        //console.log("Step 2: Uploading image");
        imageUrl = await uploadImageToCloudinary(imageFile);
      }
      //console.log("Step 3: Before Firestore write");
      const docRef = await addDoc(collection(db, "news"), {
        title,
        subtitle,
        category,
        content,
        imageUrl,
        author: user?.name || "Admin",
        createdAt: serverTimestamp(),
      });
      //console.log("Step 4: Firestore write success", docRef.id);

      const newArticle = {
        id: docRef.id,
        title,
        category,
        subtitle,
        content,
        imageUrl,
        author: user?.name || "Admin",
        time: "अभी",
      };

      setArticles((prev) => [newArticle, ...prev]);

      toast({
        title: "समाचार प्रकाशित!",
        description: `"${title}" सफलतापूर्वक प्रकाशित हुआ।`,
      });

      setTitle("");
      setSubtitle("");
      setCategory("");
      setContent("");
      setImagePreview(null);
      setImageFile(null);

    } catch (error) {
      console.error("🔥 Firestore publish error:", error);

      toast({
        title: "त्रुटि",
        description: "समाचार प्रकाशित नहीं हो पाया।",
        variant: "destructive",
      });

    }

  };

  // Delete article
  const handleDelete = async (id: string) => {

    await deleteDoc(doc(db, "news", id));

    setArticles((prev) => prev.filter((a) => a.id !== id));

    toast({
      title: "समाचार हटाया गया",
      description: "आर्टिकल सफलतापूर्वक हटा दिया गया।",
    });

  };

  if (!user) return null;

  return (

    <div className="min-h-screen bg-muted">

      <header className="bg-foreground text-primary-foreground sticky top-0 z-50">

        <div className="news-container flex items-center justify-between py-3">

          <div className="flex items-center gap-3">
            <Newspaper size={24} />
            <span className="font-headline text-lg font-bold">
              दैनिक नवसंदेश — संपादक पैनल
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm opacity-80">{user.name}</span>

            <Button variant="secondary" size="sm" onClick={handleLogout}>
              <LogOut size={16} className="mr-1" /> लॉगआउट
            </Button>
          </div>

        </div>

      </header>

      <main className="news-container py-6 space-y-6">

        {/* Publish Form */}

        <Card className="border-2 border-border">

          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center gap-2">
              <Plus size={20} /> नया समाचार प्रकाशित करें
            </CardTitle>
          </CardHeader>

          <CardContent>

            <form onSubmit={handlePublish} className="space-y-4">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="space-y-2">

                  <Label>शीर्षक *</Label>

                  <Input
                    placeholder="समाचार का शीर्षक लिखें..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />

                </div>

                <div className="space-y-2">

                  <Label>श्रेणी *</Label>

                  <Select value={category} onValueChange={setCategory}>

                    <SelectTrigger>
                      <SelectValue placeholder="श्रेणी चुनें" />
                    </SelectTrigger>

                    <SelectContent>

                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}

                    </SelectContent>

                  </Select>

                </div>

              </div>

              <div className="space-y-2">

                <Label>उपशीर्षक</Label>

                <Input
                  placeholder="वैकल्पिक उपशीर्षक..."
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                />

              </div>

              <div className="space-y-2">

                <Label>सामग्री *</Label>

                <Textarea
                  placeholder="समाचार की पूरी सामग्री यहाँ लिखें..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={6}
                  required
                />

              </div>

              <div className="space-y-2">

                <Label>तस्वीर अपलोड करें</Label>

                <div className="flex items-center gap-4">

                  <label className="flex items-center gap-2 px-4 py-2 border border-dashed border-border rounded-md cursor-pointer hover:bg-secondary transition-colors">

                    <ImagePlus size={18} />
                    <span className="text-sm">तस्वीर चुनें</span>

                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />

                  </label>

                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="preview"
                      className="h-16 w-24 object-cover rounded border"
                    />
                  )}

                </div>

              </div>

              <Button type="submit">
                <Plus size={16} className="mr-1" />
                प्रकाशित करें
              </Button>

            </form>

          </CardContent>

        </Card>

        {/* Articles List */}

        <Card className="border-2 border-border">

          <CardHeader>
            <CardTitle className="font-headline text-xl">
              सभी समाचार ({articles.length})
            </CardTitle>
          </CardHeader>

          <CardContent>

            <div className="space-y-3">

              {articles.map((article) => (

                <div
                  key={article.id}
                  className="flex items-start justify-between gap-4 p-3 bg-secondary rounded-md"
                >

                  <div className="flex-1">

                    <div className="flex items-center gap-2 mb-1">

                      <span className="category-label text-[10px]">
                        {article.category}
                      </span>

                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock size={12} /> {article.time || "—"}
                      </span>

                    </div>

                    <h3 className="font-headline font-semibold text-sm truncate">
                      {article.title}
                    </h3>

                    {article.author && (
                      <p className="text-xs text-muted-foreground mt-1">
                        — {article.author}
                      </p>
                    )}

                  </div>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(article.id)}
                  >
                    <Trash2 size={14} className="mr-1" /> हटाएँ
                  </Button>

                </div>

              ))}

              {articles.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  कोई समाचार नहीं है। ऊपर फ़ॉर्म से नया समाचार जोड़ें।
                </p>
              )}

            </div>

          </CardContent>

        </Card>

      </main>

    </div>
  );

};

export default AdminDashboard;