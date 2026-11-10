import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

app.set("trust proxy", true);

// Middleware przekierowań: TYLKO dla 'www' oraz starych slugów do GSC
app.use((req: Request, res: Response, next: NextFunction) => {
  const host = req.headers.host || "";

  if (host.includes("localhost") || host.includes("127.0.0.1")) {
    return next();
  }

  // 1. Przekierowanie z 'www' na domenę główną (kod 301)
  if (host.startsWith("www.")) {
    const cleanHost = host.replace(/^www\./i, "");
    return res.redirect(301, `https://${cleanHost}${req.originalUrl}`);
  }

  // 2. Przekierowanie starych/uciętych ścieżek angielskich dla Google Search Console
  const normalizedPath = req.path.replace(/\/+$/, "");
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

  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const port = 5000;

  server.listen(port, "0.0.0.0", () => {
    log(`serving on port ${port}`);
  });
})();
