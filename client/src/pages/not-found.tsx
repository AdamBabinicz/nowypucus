import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>
          {t("not_found.meta_title", "Strona nie znaleziona | Pranie Dywanów")}
        </title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6">
            <div className="flex items-center mb-4 gap-2">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <h1 className="font-limelight text-2xl font-bold text-gray-900">
                {t("not_found.title", "404 Strona nie znaleziona")}
              </h1>
            </div>

            <p className="mt-4 text-sm text-gray-600">
              {t(
                "not_found.description",
                "Przepraszamy, ale strona o podanym adresie nie istnieje lub została przeniesiona.",
              )}
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
