import { useState, useEffect } from "react";

export type CheckoutConfig = {
  publishableKey: string;
  stripeConfigured: boolean;
  product: {
    name: string;
    price: number;
    currency: string;
  };
};

export type VerifyResponse = {
  paid: boolean;
  customerEmail?: string;
  links?: {
    vault: string;
    bonuses: string;
    templates: string;
    socialMediaPack: string;
    plrEbooks: string;
  };
};

export function useCheckoutConfig() {
  const [config, setConfig] = useState<CheckoutConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch("/api/checkout/config")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch config");
        return res.json();
      })
      .then((data) => {
        setConfig(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  return { config, isLoading, error };
}

export function useCreateSession() {
  const [isLoading, setIsLoading] = useState(false);

  const createSession = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/checkout/create-session", {
        method: "POST",
      });
      if (!res.ok) throw new Error("Failed to create session");
      const data = await res.json();
      if (data.sessionId) {
        localStorage.setItem("cfh_session_id", data.sessionId);
      }
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { createSession, isLoading };
}

export function useVerifySession(sessionId: string | null) {
  const [result, setResult] = useState<VerifyResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setIsLoading(false);
      return;
    }

    fetch(`/api/checkout/verify?session_id=${sessionId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to verify session");
        return res.json();
      })
      .then((data) => {
        setResult(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [sessionId]);

  return { result, isLoading, error };
}
