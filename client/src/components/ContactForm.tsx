import { useTranslation } from "react-i18next";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FiSend } from "react-icons/fi";
import { useToast } from "@/hooks/use-toast";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mwpozdyn";

const ContactForm = () => {
  const { t } = useTranslation();

  const contactFormSchema = z.object({
    name: z
      .string()
      .min(2, {
        message: t("validation.nameMin", "Name must be at least 2 characters"),
      })
      .max(50, {
        message: t("validation.nameMax", "Name must be at most 50 characters"),
      }),
    email: z.string().email({
      message: t(
        "validation.emailInvalid",
        "Please enter a valid email address"
      ),
    }),
    phone: z.string().optional(),
    service: z.string().optional(),
    message: z
      .string()
      .min(10, {
        message: t(
          "validation.messageMin",
          "Message must be at least 10 characters"
        ),
      })
      .max(1000, {
        message: t(
          "validation.messageMax",
          "Message must be at most 1000 characters"
        ),
      }),
    terms: z.boolean().refine((value) => value === true, {
      message: t("validation.termsRequired", "You must accept the terms"),
    }),
  });

  type ContactFormValues = z.infer<typeof contactFormSchema>;

  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }, // Używamy isSubmitting z react-hook-form
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
      terms: false,
    },
  });

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: t("contact.successTitle", "Wiadomość wysłana!"),
          description: t(
            "contact.successMessage",
            "Dziękujemy za kontakt. Odpowiemy najszybciej jak to możliwe."
          ),
          variant: "default",
        });
        reset();
      } else {
        const errorData = await response.json().catch(() => ({})); // Spróbuj sparsować błąd, jeśli nie - pusty obiekt
        const errorMessage =
          errorData.errors?.map((err: any) => err.message).join(", ") ||
          t(
            "contact.errorMessage",
            "Wystąpił błąd podczas wysyłania wiadomości."
          );
        toast({
          title: t("contact.errorTitle", "Błąd wysyłania"),
          description: errorMessage,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Błąd przesyłania formularza:", error);
      toast({
        title: t("contact.errorTitle", "Błąd wysyłania"),
        description: t(
          "contact.errorMessageNetwork",
          "Wystąpił błąd sieciowy. Spróbuj ponownie później."
        ),
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-foreground dark:text-foreground/80 mb-1"
        >
          {t("contact.nameLabel", "Imię i nazwisko")} *
        </label>
        <input
          type="text"
          id="name"
          className={`w-full px-4 py-2 border ${
            errors.name
              ? "border-destructive"
              : "border-border dark:border-border"
          } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background dark:bg-input dark:text-foreground`}
          {...register("name")}
          disabled={isSubmitting}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-foreground dark:text-foreground/80 mb-1"
        >
          {t("contact.emailLabel", "Adres e-mail")} *
        </label>
        <input
          type="email"
          id="email"
          className={`w-full px-4 py-2 border ${
            errors.email
              ? "border-destructive"
              : "border-border dark:border-border"
          } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background dark:bg-input dark:text-foreground`}
          {...register("email")}
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-foreground dark:text-foreground/80 mb-1"
        >
          {t("contact.phoneLabel", "Numer telefonu")}
        </label>
        <input
          type="tel"
          id="phone"
          className="w-full px-4 py-2 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background dark:bg-input dark:text-foreground"
          {...register("phone")}
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label
          htmlFor="service"
          className="block text-sm font-medium text-foreground dark:text-foreground/80 mb-1"
        >
          {t("contact.serviceLabel", "Usługa")}
        </label>
        <select
          id="service"
          className="w-full px-4 py-2 border border-border dark:border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background dark:bg-input dark:text-foreground"
          {...register("service")}
          disabled={isSubmitting}
        >
          <option value="">
            {t("contact.selectService", "Wybierz usługę...")}
          </option>
          <option value="dywany">
            {t("services.carpetCleaning", "Pranie dywanów")}
          </option>
          <option value="meble">
            {t("services.furnitureCleaning", "Pranie mebli")}
          </option>
          <option value="kostka">
            {t("services.paverCleaning", "Czyszczenie kostki")}
          </option>
          <option value="inne">{t("contact.other", "Inne")}</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-foreground dark:text-foreground/80 mb-1"
        >
          {t("contact.messageLabel", "Wiadomość")} *
        </label>
        <textarea
          id="message"
          rows={4}
          className={`w-full px-4 py-2 border ${
            errors.message
              ? "border-destructive"
              : "border-border dark:border-border"
          } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background dark:bg-input dark:text-foreground`}
          {...register("message")}
          disabled={isSubmitting}
        ></textarea>
        {errors.message && (
          <p className="mt-1 text-sm text-destructive">
            {errors.message.message}
          </p>
        )}
      </div>

      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            id="terms"
            className={`focus:ring-primary h-4 w-4 text-primary border ${
              errors.terms ? "border-destructive" : "border-border"
            } rounded`}
            {...register("terms")}
            disabled={isSubmitting}
          />
        </div>
        <label
          htmlFor="terms"
          className="ml-2 block text-sm text-foreground dark:text-foreground/80"
        >
          {t("contact.termsLabel", "Akceptuję warunki")} *
        </label>
      </div>
      {errors.terms && (
        <p className="mt-1 text-sm text-destructive">{errors.terms.message}</p>
      )}

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full font-semibold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center disabled:opacity-70
                     bg-[hsl(var(--marine-h)_var(--marine-s)_65%)] text-[hsl(var(--marine-h)_30%_15%)]
                     border-2 border-transparent
                     hover:bg-transparent
                     hover:text-[hsl(var(--marine-h)_var(--marine-s)_var(--marine-l))]
                     hover:border-[hsl(var(--marine-h)_var(--marine-s)_var(--marine-l))]
                     dark:hover:text-[hsl(var(--foreground))]
                     dark:hover:border-[hsl(var(--foreground))]"
        >
          <FiSend className="w-5 h-5 mr-2" />
          {isSubmitting
            ? t("contact.sending", "Wysyłanie...")
            : t("contact.sendMessage", "Wyślij wiadomość")}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
