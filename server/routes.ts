import express, { type Express, type Request, type Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Manifest wykrywalności dla autonomicznych agentów AI (specyfikacja ARD)
  const aiCatalogData = {
    $schema: "https://agent-readiness.org/schema/v1/ai-catalog.json",
    version: "1.0.0",
    name: "SUPER PUCUŚ - Pranie dywanów, tapicerki meblowej, mycie kostki brukowej Radom",
    description:
      "Profesjonalne pranie dywanów, wykładzin, tapicerki meblowej oraz czyszczenie ciśnieniowe kostki brukowej i posadzek w Radomiu i okolicach.",
    url: "https://pranie-dywanow.j.pl",
    provider: {
      name: "SUPER PUCUŚ",
      url: "https://pranie-dywanow.j.pl",
      telephone: "+48531890827",
    },
    capabilities: [
      {
        name: "Pranie dywanów i wykładzin",
        description:
          "Głębokie czyszczenie i pranie ekstrakcyjne dywanów oraz wykładzin dla domu i biura.",
        url: "https://pranie-dywanow.j.pl/oferta",
      },
      {
        name: "Pranie tapicerki meblowej",
        description:
          "Czyszczenie kanap, narożników, foteli, krzeseł i materacy.",
        url: "https://pranie-dywanow.j.pl/oferta",
      },
      {
        name: "Mycie kostki brukowej i posadzek",
        description:
          "Czyszczenie ciśnieniowe podjazdów, tarasów, kostki brukowej oraz posadzek.",
        url: "https://pranie-dywanow.j.pl/oferta",
      },
    ],
  };

  const handleAiCatalog = (_req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    return res.status(200).json(aiCatalogData);
  };

  // Endpointy dla botów i crawlerów AI
  app.get("/ai-catalog.json", handleAiCatalog);
  app.get("/.well-known/ai-catalog.json", handleAiCatalog);

  // API endpoints
  const apiRouter = express.Router();

  // Contact form submission endpoint
  apiRouter.post("/contact", async (req: Request, res: Response) => {
    try {
      const { name, email, phone, service, message } = req.body;

      // Validate required fields
      if (!name || !email || !message) {
        return res
          .status(400)
          .json({ message: "Name, email and message are required" });
      }

      // In a real implementation, we would send an email here
      // using a service like Nodemailer, SendGrid, or other email API

      // Log the contact submission for debugging
      console.log("Contact form submission:", {
        name,
        email,
        phone: phone || "Not provided",
        service: service || "Not specified",
        message,
      });

      // Return success response
      return res.status(200).json({
        success: true,
        message: "Your message has been received. We will contact you shortly.",
      });
    } catch (error) {
      console.error("Error processing contact form:", error);
      return res.status(500).json({
        success: false,
        message:
          "There was an error processing your request. Please try again later.",
      });
    }
  });

  // Add the API router with /api prefix
  app.use("/api", apiRouter);

  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
