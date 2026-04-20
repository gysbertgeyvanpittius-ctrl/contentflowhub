import { useEffect } from "react";
import { useLocation, useSearch } from "wouter";
import { useVerifySession } from "@/hooks/useCheckout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, CheckCircle2, ArrowLeft, Loader2, Sparkles, Folder, FileText, Image, PenTool } from "lucide-react";

export default function Success() {
  const [_, setLocation] = useLocation();
  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);
  const sessionId = searchParams.get("session_id") || localStorage.getItem("cfh_session_id");

  const { result, isLoading, error } = useVerifySession(sessionId);

  useEffect(() => {
    if (!sessionId && !isLoading) {
      setLocation("/");
    }
  }, [sessionId, isLoading, setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <h2 className="text-xl font-medium text-foreground">Verifying your purchase...</h2>
        <p className="text-muted-foreground mt-2">Please wait a moment while we unlock your vault.</p>
      </div>
    );
  }

  if (error || !result?.paid) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-destructive font-bold text-2xl">!</span>
          </div>
          <h1 className="text-3xl font-bold mb-4">Payment Not Found</h1>
          <p className="text-muted-foreground mb-8">
            We couldn't verify your payment. If you believe this is an error, please try again or contact support.
          </p>
          <Button onClick={() => setLocation("/")} variant="outline" className="w-full">
            <ArrowLeft className="mr-2 h-4 w-4" /> Return to Home
          </Button>
        </div>
      </div>
    );
  }

  const { links } = result;

  const downloadLinks = [
    { title: "Your Digital Vault", desc: "Main collection of 4500+ assets", icon: Folder, url: links?.vault },
    { title: "Bonus Materials", desc: "Exclusive extras and guides", icon: Sparkles, url: links?.bonuses },
    { title: "Templates Collection", desc: "Business & Canva templates", icon: FileText, url: links?.templates },
    { title: "Social Media Pack", desc: "3000+ social graphics", icon: Image, url: links?.socialMediaPack },
    { title: "PLR eBooks Library", desc: "500+ resellable eBooks", icon: PenTool, url: links?.plrEbooks },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[300px] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Welcome to the Vault!</h1>
          <p className="text-xl text-muted-foreground">
            Thank you for your purchase. Your digital products are ready to download below.
            We recommend bookmarking this page for future access.
          </p>
        </motion.div>

        <div className="grid gap-6">
          {downloadLinks.map((link, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <Card className="bg-card/50 border-white/5 backdrop-blur-sm overflow-hidden group">
                <div className="absolute inset-y-0 left-0 w-1 bg-primary/50 group-hover:bg-primary transition-colors" />
                <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <link.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{link.title}</CardTitle>
                      <CardDescription className="text-base mt-1">{link.desc}</CardDescription>
                    </div>
                  </div>
                  <Button 
                    asChild 
                    className="shrink-0 sm:w-auto w-full group-hover:shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all"
                    size="lg"
                  >
                    <a href={link.url || "#"} target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </a>
                  </Button>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-16 text-center text-muted-foreground text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p>Need help? Contact support with your email address used during purchase.</p>
        </motion.div>
      </div>
    </div>
  );
}
