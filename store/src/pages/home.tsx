import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCheckoutConfig, useCreateSession } from "@/hooks/useCheckout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2, Zap, MonitorPlay, BookOpen, PenTool, LayoutDashboard, Shield, Diamond, Clock, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PurchasePopup from "@/components/PurchasePopup";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const wordAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export default function Home() {
  const { config, isLoading: isConfigLoading } = useCheckoutConfig();
  const { createSession, isLoading: isSessionLoading } = useCreateSession();
  const { toast } = useToast();
  const [timeLeft, setTimeLeft] = useState(86400); // 24 hours in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleCheckout = async () => {
    if (!config?.stripeConfigured) {
      toast({
        title: "Checkout Unavailable",
        description: "Stripe coming soon. Payment is not configured yet.",
        variant: "destructive"
      });
      return;
    }

    try {
      await createSession();
    } catch (e) {
      toast({
        title: "Checkout Error",
        description: "Something went wrong creating your session. Please try again.",
        variant: "destructive"
      });
    }
  };

  const titleText = "Launch Your Digital Product Empire Today";
  const titleWords = titleText.split(" ");

  const trustSignals = [
    "4,500+ Products", "Instant Access", "Lifetime Updates", 
    "100% Resell Rights", "No Subscription", "One-Time Payment"
  ];

  const reviews = [
    { name: "Jessica M.", location: "Austin, TX", rating: 5, date: "March 2025", avatar: "JM", color: "from-blue-400 to-purple-500", text: "Absolutely worth every penny. I was skeptical at first because of the $19 price — I thought it couldn't be that good. But I was completely wrong. The template quality is on par with stuff I've seen sold for $97+. I set up an Etsy shop the same weekend and made my first sale within 4 days." },
    { name: "Marcus T.", location: "Toronto, CA", rating: 5, date: "February 2025", avatar: "MT", color: "from-teal-400 to-blue-500", text: "The PLR eBooks are genuinely high quality. I've rebranded 5 of them so far and listed them as my own products. Already made back 3x my investment this month alone. The social media graphics are also a game changer — I use them for client work too." },
    { name: "Priya K.", location: "Houston, TX", rating: 5, date: "March 2025", avatar: "PK", color: "from-pink-400 to-rose-500", text: "As a VA trying to build my own income streams, this bundle was exactly what I needed. The Canva templates are drag-and-drop simple, the eBooks are written well enough to sell as-is, and the social media graphics are beautiful. 10/10 recommend for anyone wanting to start a digital product business fast." },
    { name: "Darnell R.", location: "Atlanta, GA", rating: 5, date: "January 2025", avatar: "DR", color: "from-amber-400 to-orange-500", text: "I've bought similar bundles before for 5x the price and they weren't half as good as this. The sheer volume of content is staggering — I haven't even gone through it all yet. Delivery was instant, files are well organized, and the quality is impressive. Best $19 I've ever spent online." },
    { name: "Sophie L.", location: "London, UK", rating: 5, date: "April 2025", avatar: "SL", color: "from-emerald-400 to-teal-500", text: "I run a small content agency and I now use these templates for client deliverables. It saves me hours every week. The business asset templates alone (invoices, proposals, client packs) were worth the price. This bundle basically paid for itself on my very first client project." },
    { name: "Tyler B.", location: "Phoenix, AZ", rating: 5, date: "March 2025", avatar: "TB", color: "from-violet-400 to-blue-500", text: "Bought this for my wife who wanted to start a side hustle selling digital products. She had her first Etsy shop live within 48 hours. She's already made 3 sales with zero marketing experience. The bonus email sequences were a huge help — they're professional and actually convert." },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      <PurchasePopup />
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/60 backdrop-blur-xl transition-all duration-300">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="font-bold text-2xl tracking-tight flex items-center gap-3 group cursor-pointer">
            <div className="relative w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-500 to-blue-400 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all duration-500">
               {/* Fallback icon if logo fails to load */}
              <Zap className="w-6 h-6 text-white absolute z-10" />
              <img src="/logo-icon.png" alt="Logo" className="w-full h-full object-contain relative z-20" onError={(e) => e.currentTarget.style.opacity = '0'} />
            </div>
            <span className="font-outfit text-white">Content Flow</span>
            <span className="font-outfit text-blue-500">Hub</span>
          </div>
          <Button 
            variant="default" 
            className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-full px-8 py-6 text-md shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all duration-300"
            onClick={handleCheckout}
            disabled={isSessionLoading || isConfigLoading}
          >
            Get Access Now
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[100dvh] bg-radial-hero pt-24 sm:pt-32 pb-12 sm:pb-20 flex items-center overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            <div className="flex-1 text-center lg:text-left">
              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[1.1] mb-8 font-outfit"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {titleWords.map((word, index) => (
                  <motion.span 
                    key={index} 
                    className={`inline-block mr-4 ${word === 'Empire' ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 glow-text' : 'text-white'}`}
                    variants={wordAnimation}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.p 
                className="text-base sm:text-xl lg:text-2xl text-muted-foreground mb-8 sm:mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Get instant access to over 4,500+ premium templates, eBooks, and social graphics. Ready to rebrand, resell, and scale your income instantly.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto text-xl h-16 px-10 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-[0_0_40px_rgba(37,99,235,0.5)] hover:shadow-[0_0_60px_rgba(37,99,235,0.7)] transition-all duration-300 relative group overflow-hidden"
                  onClick={handleCheckout}
                  disabled={isSessionLoading || isConfigLoading}
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  {isSessionLoading ? "Processing Securely..." : "Unlock Full Access – $19"}
                </Button>
              </motion.div>

              <motion.div 
                className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-6 text-xs sm:text-sm font-medium text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-400" />
                  <span>4,500+ Digital Products</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-400" />
                  <span>Instant Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-400" />
                  <span>100% Resell Rights</span>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              className="flex-1 w-full max-w-2xl lg:max-w-none perspective-1000"
              initial={{ opacity: 0, rotateY: 20, rotateX: 10, scale: 0.9 }}
              animate={{ opacity: 1, rotateY: -5, rotateX: 5, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="relative rounded-2xl overflow-hidden border border-white/10 glow-shadow bg-card/50 backdrop-blur-sm">
                <img 
                  src="/hero-mockup.png" 
                  alt="Digital Product Mockup" 
                  className="w-full h-auto object-cover object-center rounded-2xl"
                  onError={(e) => {
                    e.currentTarget.src = "/product-hero.png";
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Ticker */}
      <div className="ticker-wrap py-4 bg-blue-950/20 border-y border-blue-900/30">
        <div className="ticker">
          {[...trustSignals, ...trustSignals].map((text, i) => (
            <div key={i} className="ticker-item text-blue-200/80 uppercase tracking-widest text-sm font-bold">
              {text}
              <Diamond className="w-3 h-3 text-blue-500 ml-8 inline-block" />
            </div>
          ))}
        </div>
      </div>

      {/* What's Inside Section */}
      <section className="py-16 lg:py-32 relative bg-background">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-12 lg:mb-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black mb-4 lg:mb-6 font-outfit">The Complete Arsenal</h2>
            <p className="text-muted-foreground text-base sm:text-xl max-w-3xl mx-auto font-light leading-relaxed">Stop piecing together random templates. Get the ultimate all-in-one bundle designed for creators who want to scale fast.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { count: "1000+", icon: LayoutDashboard, title: "Editable Templates", desc: "Planners, trackers, and business documents perfectly structured for customization." },
              { count: "500+", icon: BookOpen, title: "PLR eBooks", desc: "High-value guides in top niches ready to be rebranded and sold for 100% profit." },
              { count: "3000+", icon: MonitorPlay, title: "Social Graphics", desc: "Scroll-stopping Instagram and Pinterest posts, carousels, and stories." },
              { count: "200+", icon: PenTool, title: "Business Assets", desc: "Invoices, pricing guides, client portals, and welcome packets." },
              { count: "100%", icon: Zap, title: "Canva Ready", desc: "Drag-and-drop editing with free Canva accounts. No expensive software needed." },
              { count: "3", icon: Diamond, title: "Premium Bonuses", desc: "Marketing blueprints and launch strategies to guarantee your first sale." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                className="group bg-card/40 backdrop-blur-md border border-white/5 rounded-3xl p-8 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(37,99,235,0.15)] transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="absolute top-0 right-0 p-6 text-6xl font-black text-white/[0.03] group-hover:text-blue-500/[0.05] transition-colors duration-500 pointer-events-none">
                  {item.count}
                </div>
                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <item.icon className="w-8 h-8 text-blue-400" />
                </div>
                <div className="text-blue-400 font-bold mb-2 text-sm tracking-wider uppercase">{item.count}</div>
                <h3 className="text-2xl font-bold mb-4 font-outfit text-white">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="mt-20 flex justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <img src="/bundle-stack.png" alt="Bundle Stack" className="max-w-full h-auto rounded-3xl shadow-2xl border border-white/10" onError={(e) => e.currentTarget.style.display = 'none'} />
          </motion.div>
        </div>
      </section>

      {/* Social Proof / Split Section */}
      <section className="py-16 lg:py-32 bg-card border-y border-white/5 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl lg:text-5xl font-black mb-8 font-outfit">Perfect for creators who value time.</h2>
              <div className="space-y-6">
                {[
                  "You want to launch a digital product store this weekend, not next year.",
                  "You are tired of staring at a blank screen trying to create templates from scratch.",
                  "You want high-quality lead magnets to grow your email list instantly.",
                  "You want to keep 100% of the profits from every sale you make."
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="mt-1 bg-blue-500/20 p-1 rounded-full">
                      <CheckCircle2 className="w-6 h-6 text-blue-400" />
                    </div>
                    <p className="text-xl text-muted-foreground">{point}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-background border border-white/10 p-8 rounded-3xl relative">
                <div className="text-6xl text-blue-500/20 absolute top-4 right-8 font-serif">"</div>
                <p className="text-xl text-foreground italic mb-6 relative z-10">
                  "I was struggling to come up with ideas for my Etsy shop. I bought this bundle, customized a few planners in Canva, and made my money back on the first day. It's literally a business in a box."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center font-bold text-white text-lg">SJ</div>
                  <div>
                    <div className="font-bold">Sarah Jenkins</div>
                    <div className="text-sm text-blue-400">Digital Creator</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-background border border-white/10 p-8 rounded-3xl relative ml-0 lg:ml-12">
                <div className="text-6xl text-blue-500/20 absolute top-4 right-8 font-serif">"</div>
                <p className="text-xl text-foreground italic mb-6 relative z-10">
                  "The quality of the PLR eBooks is incredible. I've rebranded three of them and am selling them for $27 each. Best investment I've made for my brand."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center font-bold text-white text-lg">MR</div>
                  <div>
                    <div className="font-bold">Marcus Reed</div>
                    <div className="text-sm text-blue-400">Business Coach</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bonuses Section */}
      <section className="py-16 lg:py-32 relative">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <Badge variant="outline" className="mb-6 py-2 px-5 border-amber-500/30 text-amber-400 bg-amber-500/10">
              Limited Time Only
            </Badge>
            <h2 className="text-4xl lg:text-6xl font-black mb-6 font-outfit">Exclusive Bonuses</h2>
            <p className="text-xl text-muted-foreground">Order today and get these premium marketing assets absolutely free.</p>
          </motion.div>

          <div className="space-y-6">
            {[
              { title: "The Etsy Store Launch Blueprint", value: "$47", desc: "Step-by-step guide to setting up your shop, optimizing listings, and getting your first sale." },
              { title: "100 Fill-in-the-Blank Hook Templates", value: "$29", desc: "Viral hooks for TikTok, Instagram Reels, and Shorts to drive traffic to your products." },
              { title: "Email Marketing Sequences", value: "$67", desc: "Pre-written email templates to nurture leads and convert subscribers into buyers." }
            ].map((bonus, i) => (
              <motion.div 
                key={i}
                className="flex flex-col md:flex-row items-center gap-8 p-8 rounded-3xl bg-gradient-to-r from-card to-background border border-white/5 relative overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500/0 group-hover:bg-blue-500 transition-colors duration-300" />
                <div className="w-24 h-24 shrink-0 rounded-2xl bg-blue-950 flex items-center justify-center p-4 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                  <img src="/bonus-badge.png" alt="Bonus" className="w-full h-full object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = '<span class="text-3xl">🎁</span>' }} />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="text-sm font-bold text-amber-400 mb-2 uppercase tracking-wider">Bonus #{i + 1}</div>
                  <h3 className="text-2xl font-bold mb-2 font-outfit">{bonus.title}</h3>
                  <p className="text-muted-foreground">{bonus.desc}</p>
                </div>
                <div className="text-center md:text-right">
                  <div className="text-lg text-muted-foreground line-through decoration-red-500 decoration-2 mb-1">Value: {bonus.value}</div>
                  <div className="text-xl font-black text-green-400">FREE</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing/CTA Section */}
      <section className="py-16 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto bg-card/80 backdrop-blur-2xl border border-blue-500/30 rounded-3xl lg:rounded-[3rem] p-6 sm:p-10 lg:p-16 shadow-[0_0_100px_rgba(37,99,235,0.15)] relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Banner top */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600" />
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 font-outfit">Get The Complete Vault Today.</h2>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-lg"><CheckCircle2 className="text-blue-400" /> 4,500+ Digital Assets</li>
                  <li className="flex items-center gap-3 text-lg"><CheckCircle2 className="text-blue-400" /> All 3 Premium Bonuses</li>
                  <li className="flex items-center gap-3 text-lg"><CheckCircle2 className="text-blue-400" /> 100% Commercial Resell Rights</li>
                  <li className="flex items-center gap-3 text-lg"><CheckCircle2 className="text-blue-400" /> Lifetime Updates Included</li>
                </ul>
              </div>
              
              <div className="text-center p-8 rounded-3xl bg-background/50 border border-white/5 relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-black text-sm font-bold px-4 py-1 rounded-full flex items-center gap-2 shadow-lg">
                  <Clock className="w-4 h-4" />
                  Offer Ends: {formatTime(timeLeft)}
                </div>
                
                <div className="mb-2 mt-4 text-muted-foreground text-xl font-medium">Normal Price: <span className="line-through decoration-red-500 decoration-2">$197</span></div>
                <div className="text-6xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-blue-600 mb-6 sm:mb-8 font-outfit">$19</div>
                
                <Button 
                  size="lg" 
                  className="w-full text-xl h-20 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl shadow-[0_0_40px_rgba(37,99,235,0.6)] hover:shadow-[0_0_60px_rgba(37,99,235,0.8)] transition-all duration-300 animate-pulse font-bold"
                  onClick={handleCheckout}
                  disabled={isSessionLoading || isConfigLoading}
                >
                  {isSessionLoading ? "Securely Processing..." : "Get Instant Access Now"}
                </Button>
                
                <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-semibold text-muted-foreground">
                  <span className="flex items-center gap-1"><Shield className="w-4 h-4" /> Secure Checkout</span>
                  <span className="flex items-center gap-1"><Zap className="w-4 h-4" /> Instant Access</span>
                  <span className="flex items-center gap-1"><Diamond className="w-4 h-4" /> 30-Day Guarantee</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 lg:py-32 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-600/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <Badge variant="outline" className="mb-6 py-2 px-5 border-yellow-500/30 text-yellow-400 bg-yellow-500/10">
              Real Customer Reviews
            </Badge>
            <h2 className="text-4xl lg:text-6xl font-black mb-4 font-outfit">What Buyers Are Saying</h2>
            {/* Aggregate rating bar */}
            <div className="flex items-center justify-center gap-3 mt-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-2xl font-bold text-white">5.0</span>
              <span className="text-muted-foreground">· 2,400+ verified purchases</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                className="bg-card/50 border border-white/5 rounded-3xl p-6 hover:border-blue-500/30 hover:shadow-[0_0_25px_rgba(37,99,235,0.1)] transition-all duration-300 flex flex-col gap-4"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                {/* Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(review.rating)].map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                {/* Review text */}
                <p className="text-muted-foreground leading-relaxed flex-1 text-sm">
                  "{review.text}"
                </p>
                {/* Reviewer */}
                <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${review.color} flex items-center justify-center font-bold text-white text-sm shrink-0`}>
                    {review.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-white">{review.name}</div>
                    <div className="text-xs text-muted-foreground">{review.location} · {review.date}</div>
                  </div>
                  <div className="ml-auto">
                    <Badge variant="outline" className="text-[10px] border-green-500/30 text-green-400 bg-green-500/10 px-2 py-0.5">
                      Verified
                    </Badge>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 lg:py-24 bg-card border-t border-white/5">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl sm:text-4xl font-black mb-4 font-outfit">Frequently Asked Questions</h2>
          </motion.div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {[
              { q: "Is this a monthly subscription?", a: "No. This is a one-time payment of $19. You get lifetime access to all current products and future updates with no hidden fees or subscriptions." },
              { q: "What does 'Master Resell Rights' mean?", a: "It means you can legally sell these exact products to your own customers and keep 100% of the profits. You can rebrand them, modify them, or sell them exactly as they are." },
              { q: "Do I need paid software to edit these?", a: "No. The vast majority of our templates are designed for Canva, which has a fantastic free version. You do not need Adobe Creative Cloud or any expensive software." },
              { q: "How soon do I get access?", a: "Instantly. As soon as your payment is processed, you will receive an email with a secure link to access the entire vault immediately." },
              { q: "Can I use these for my clients?", a: "Absolutely. If you are a freelancer or agency, you can use these assets to deliver high-quality work to your clients faster." }
            ].map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-background border border-white/5 rounded-2xl px-6 py-2 data-[state=open]:border-l-4 data-[state=open]:border-l-blue-500 transition-all duration-300">
                <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline hover:text-blue-400 py-4">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t border-white/5 text-center text-muted-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center justify-center mb-8">
             <div className="font-bold text-xl tracking-tight flex items-center gap-2 mb-4 grayscale opacity-50">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-blue-400" />
                </div>
                Content Flow Hub
              </div>
          </div>
          <p className="text-sm">&copy; {new Date().getFullYear()} Content Flow Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
