import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoints
  const apiRouter = express.Router();
  
  // Contact form submission endpoint
  apiRouter.post('/contact', async (req, res) => {
    try {
      const { name, email, phone, service, message } = req.body;
      
      // Validate required fields
      if (!name || !email || !message) {
        return res.status(400).json({ message: 'Name, email and message are required' });
      }
      
      // In a real implementation, we would send an email here
      // using a service like Nodemailer, SendGrid, or other email API
      
      // Log the contact submission for debugging
      console.log('Contact form submission:', {
        name,
        email,
        phone: phone || 'Not provided',
        service: service || 'Not specified',
        message
      });
      
      // Return success response
      return res.status(200).json({ 
        success: true,
        message: 'Your message has been received. We will contact you shortly.'
      });
    } catch (error) {
      console.error('Error processing contact form:', error);
      return res.status(500).json({ 
        success: false,
        message: 'There was an error processing your request. Please try again later.' 
      });
    }
  });
  
  // Add the API router with /api prefix
  app.use('/api', apiRouter);

  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}

// Import express since it's used in the function
import express from "express";
