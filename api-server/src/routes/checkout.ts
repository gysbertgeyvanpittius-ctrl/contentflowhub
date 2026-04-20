import { Router, type Request, type Response } from "express";
import Stripe from "stripe";

const router = Router();

// Config — edit these to change product details and links
const PRODUCT_CONFIG = {
  name: "Content Flow Hub – Ultimate Digital Vault",
  price: 1900, // in cents = $19.00
  currency: "usd",
  successUrl: `${process.env.REPLIT_DEV_DOMAIN ? `https://${process.env.REPLIT_DEV_DOMAIN.split(",")[0]}` : ""}/success?session_id={CHECKOUT_SESSION_ID}`,
  cancelUrl: `${process.env.REPLIT_DEV_DOMAIN ? `https://${process.env.REPLIT_DEV_DOMAIN.split(",")[0]}` : ""}/`,
  // Digital delivery links — update these with your real links
  deliveryLinks: {
    vault: "https://drive.google.com/drive/folders/your-main-vault-link",
    bonuses: "https://drive.google.com/drive/folders/your-bonuses-link",
    templates: "https://www.canva.com/design/your-templates-link",
    socialMediaPack: "https://drive.google.com/drive/folders/your-social-media-pack",
    plrEbooks: "https://drive.google.com/drive/folders/your-plr-ebooks-link",
  },
};

function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key, { apiVersion: "2025-01-27.acacia" });
}

// POST /api/checkout/create-session
router.post("/create-session", async (req: Request, res: Response) => {
  const stripe = getStripe();
  if (!stripe) {
    res.status(503).json({
      error: "Payment system not configured. Please add Stripe keys.",
      stripeConfigured: false,
    });
    return;
  }

  try {
    const host = req.headers.origin || req.headers.referer || "";
    const baseUrl = host.replace(/\/$/, "");

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: PRODUCT_CONFIG.currency,
            product_data: {
              name: PRODUCT_CONFIG.name,
              description:
                "1000+ Templates, 500+ PLR eBooks, 3000+ Social Media Graphics, Bonuses & More",
            },
            unit_amount: PRODUCT_CONFIG.price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/`,
    });

    res.json({ url: session.url, sessionId: session.id });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    req.log.error({ err }, "Stripe checkout session creation failed");
    res.status(500).json({ error: message });
  }
});

// GET /api/checkout/verify?session_id=xxx
router.get("/verify", async (req: Request, res: Response) => {
  const stripe = getStripe();
  if (!stripe) {
    res.status(503).json({ error: "Payment system not configured", stripeConfigured: false });
    return;
  }

  const { session_id } = req.query;
  if (!session_id || typeof session_id !== "string") {
    res.status(400).json({ error: "Missing session_id" });
    return;
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (session.payment_status === "paid") {
      res.json({
        paid: true,
        customerEmail: session.customer_details?.email,
        links: PRODUCT_CONFIG.deliveryLinks,
      });
    } else {
      res.status(402).json({ paid: false, error: "Payment not completed" });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    req.log.error({ err }, "Stripe session verification failed");
    res.status(500).json({ error: message });
  }
});

// GET /api/checkout/config — returns publishable key and product info (safe to expose)
router.get("/config", (_req: Request, res: Response) => {
  res.json({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || null,
    stripeConfigured: !!(process.env.STRIPE_SECRET_KEY && process.env.STRIPE_PUBLISHABLE_KEY),
    product: {
      name: PRODUCT_CONFIG.name,
      price: PRODUCT_CONFIG.price,
      currency: PRODUCT_CONFIG.currency,
    },
  });
});

export default router;
