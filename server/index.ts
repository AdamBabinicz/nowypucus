import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

// Obsługa nagłówków reverse-proxy (np. Nginx, Cloudflare) dla poprawnego wykrywania protokołu HTTPS
app.set("trust proxy", true);

// Middleware przekierowań kanonicznych (brak 'www', bezpieczne ścieżki językowe)
app.use((req: Request, res: Response, next: NextFunction) => {
  const host = req.headers.host || "";

  // Nie przekierowuj podczas pracy lokalnej na maszynie deweloperskiej
  if (host.includes("localhost") || host.includes("127.0.0.1")) {
    return next();
  }

  const isWww = host.startsWith("www.");
  const isExplicitHttp = req.headers["x-forwarded-proto"] === "http";

  // 1. Przekierowanie z 'www' na domenę główną (kod 301)
  if (isWww) {
    const cleanHost = host.replace(/^www\./i, "");
    return res.redirect(301, `https://${cleanHost}${req.originalUrl}`);
  }

  // 2. Wymuszenie HTTPS tylko wtedy, gdy proxy jawnie zgłasza wejście przez http://
  if (isExplicitHttp) {
    return res.redirect(301, `https://${host}${req.originalUrl}`);
  }

  // 3. Przekierowanie starych/uciętych ścieżek angielskich (zabezpiecza raport w Google Search Console)
  const normalizedPath = req.path.replace(/\/+$/, ""); // usuwa ewentualny slash z końca
  if (normalizedPath === "/services") {
    return res.redirect(301, "https://pranie-dywanow.j.pl/en/services");
  }
  if (normalizedPath === "/equipment") {
    return res.redirect(301, "https://pranie-dywanow.j.pl/en/equipment");
  }

  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;

  // POPRAWKA: Usunięto 'reusePort: true', które powodowało błąd ENOTSUP na Windowsie
  server.listen(port, "0.0.0.0", () => {
    log(`serving on port ${port}`);
  });
})();
