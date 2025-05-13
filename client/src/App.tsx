import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Oferta from "@/pages/Oferta";
import OFirmie from "@/pages/OFirmie";
import Realizacje from "@/pages/Realizacje";
import Sprzet from "@/pages/Sprzet";
import Contact from "@/pages/Contact";
import Regulamin from "@/pages/Regulamin";
import PolitykaPrywatnosci from "@/pages/PolitykaPrywatnosci";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { HelmetProvider } from "react-helmet-async";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/oferta" component={Oferta} />
      <Route path="/o-firmie" component={OFirmie} />
      <Route path="/realizacje" component={Realizacje} />
      <Route path="/realizacje/:category" component={Realizacje} />
      <Route path="/sprzet" component={Sprzet} />
      <Route path="/kontakt" component={Contact} />
      <Route path="/regulamin" component={Regulamin} />
      <Route path="/polityka-prywatnosci" component={PolitykaPrywatnosci} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <Layout>
                <Router />
              </Layout>
              <Toaster />
            </TooltipProvider>
          </QueryClientProvider>
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
