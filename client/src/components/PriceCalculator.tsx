import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FiX, FiZap } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

interface PriceCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

type ServiceType = "carpet" | "lining";

const PriceCalculator = ({ isOpen, onClose }: PriceCalculatorProps) => {
  const { t, i18n } = useTranslation();
  const [serviceType, setServiceType] = useState<ServiceType>("carpet");
  const [width, setWidth] = useState<string>("");
  const [length, setLength] = useState<string>("");
  const [price, setPrice] = useState<number | null>(null);

  const CARPET_PRICE_PER_SQM = 25;
  const LINING_PRICE_PER_SQM = 14;
  const TRANSPORT_COST = 20;
  const MINIMUM_ORDER_VALUE = 100;

  useEffect(() => {
    setWidth("");
    setLength("");
    setPrice(null);
  }, [i18n.language, serviceType, isOpen]); // Resetuj także przy otwarciu/zamknięciu

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(i18n.language, {
      style: "currency",
      currency: "PLN",
    }).format(value);
  };

  const handleCalculate = () => {
    const w = parseFloat(width);
    const l = parseFloat(length);

    if (isNaN(w) || isNaN(l) || w <= 0 || l <= 0) {
      setPrice(null);
      alert(t("calculator.validationError", "Please enter valid dimensions."));
      return;
    }

    const areaM2 = (w / 100) * (l / 100);
    let calculatedPrice = 0;

    if (serviceType === "carpet") {
      calculatedPrice = areaM2 * CARPET_PRICE_PER_SQM;
    } else {
      calculatedPrice = areaM2 * LINING_PRICE_PER_SQM;
    }
    setPrice(calculatedPrice);
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] bg-black/50 dark:bg-black/70 flex items-center justify-center p-4"
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            className="bg-card text-card-foreground w-full max-w-md rounded-xl shadow-2xl relative overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border">
              <h3 className="text-xl font-semibold font-heading flex items-center">
                <FiZap className="w-6 h-6 mr-2 text-primary" />
                {t("calculator.title")}
              </h3>
              <button
                onClick={onClose}
                className="p-1 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                aria-label={t("common.close")}
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-6 overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1">
                  {t("calculator.serviceType")}
                </label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setServiceType("carpet")}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors
                                            ${
                                              serviceType === "carpet"
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-muted hover:bg-muted/80 text-muted-foreground"
                                            }`}
                  >
                    {t("services.carpetCleaning")}
                  </button>
                  <button
                    onClick={() => setServiceType("lining")}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors
                                            ${
                                              serviceType === "lining"
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-muted hover:bg-muted/80 text-muted-foreground"
                                            }`}
                  >
                    {t("services.floorCleaning")}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="calc-width" // Unikalne ID dla inputów
                    className="block text-sm font-medium text-foreground/80 mb-1"
                  >
                    {t("calculator.width")}
                  </label>
                  <input
                    type="number"
                    id="calc-width"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    placeholder={t("calculator.widthPlaceholder") || "np. 150"}
                    className="w-full px-3 py-2 border border-input rounded-md focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
                  />
                </div>
                <div>
                  <label
                    htmlFor="calc-length" // Unikalne ID dla inputów
                    className="block text-sm font-medium text-foreground/80 mb-1"
                  >
                    {t("calculator.length")}
                  </label>
                  <input
                    type="number"
                    id="calc-length"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    placeholder={t("calculator.lengthPlaceholder") || "np. 200"}
                    className="w-full px-3 py-2 border border-input rounded-md focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
                  />
                </div>
              </div>

              <button
                onClick={handleCalculate}
                className="w-full font-semibold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center
                                 bg-[hsl(var(--marine-h)_var(--marine-s)_65%)] text-[hsl(var(--marine-h)_30%_15%)]
                                 border-2 border-transparent
                                 hover:bg-transparent
                                 hover:text-[hsl(var(--marine-h)_var(--marine-s)_var(--marine-l))]
                                 hover:border-[hsl(var(--marine-h)_var(--marine-s)_var(--marine-l))]
                                 dark:hover:text-[hsl(var(--foreground))]
                                 dark:hover:border-[hsl(var(--foreground))]"
              >
                {t("calculator.calculate")}
              </button>

              {price !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-muted rounded-lg text-center"
                >
                  <p className="text-sm text-muted-foreground">
                    {t("calculator.estimatedPrice")}
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {formatCurrency(
                      price < MINIMUM_ORDER_VALUE && price > 0
                        ? MINIMUM_ORDER_VALUE
                        : price
                    )}
                  </p>
                  {price < MINIMUM_ORDER_VALUE && price > 0 && (
                    <p className="mt-2 text-xs font-medium text-destructive">
                      (
                      {t("calculator.minOrderNote", {
                        minPrice: formatCurrency(MINIMUM_ORDER_VALUE),
                      })}
                      )
                    </p>
                  )}
                </motion.div>
              )}
            </div>
            <div className="p-4 sm:p-6 border-t border-border text-center">
              <p className="mb-2 text-sm font-semibold text-destructive dark:text-destructive">
                {t("calculator.minOrderInfoAlwaysVisible", {
                  minPrice: formatCurrency(MINIMUM_ORDER_VALUE),
                })}
              </p>
              <p className="text-xs text-muted-foreground">
                {t("calculator.transportInfo", {
                  price: formatCurrency(TRANSPORT_COST),
                })}
                <br />
                {t("calculator.finalPriceNote")}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PriceCalculator;
