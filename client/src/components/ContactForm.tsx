import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FiSend } from "react-icons/fi";
import { useToast } from "@/hooks/use-toast";

// Form schema with validation
const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name must be at most 50 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(500, { message: "Message must be at most 500 characters" }),
  terms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms" }),
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactForm = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
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

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real implementation, we would send the form data to a backend or email service
      // For demo purposes, we'll just simulate a successful submission after a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: t('contact.successTitle'),
        description: t('contact.successMessage'),
        variant: "default",
      });
      
      reset();
    } catch (error) {
      toast({
        title: t('contact.errorTitle'),
        description: t('contact.errorMessage'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {t('contact.nameLabel')} *
        </label>
        <input
          type="text"
          id="name"
          className={`w-full px-4 py-2 border ${
            errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
          } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-slate-800 dark:text-white`}
          {...register("name")}
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {t('contact.emailLabel')} *
        </label>
        <input
          type="email"
          id="email"
          className={`w-full px-4 py-2 border ${
            errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
          } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-slate-800 dark:text-white`}
          {...register("email")}
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {t('contact.phoneLabel')}
        </label>
        <input
          type="tel"
          id="phone"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-slate-800 dark:text-white"
          {...register("phone")}
        />
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {t('contact.serviceLabel')}
        </label>
        <select
          id="service"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-slate-800 dark:text-white"
          {...register("service")}
        >
          <option value="">{t('contact.selectService')}</option>
          <option value="dywany">{t('services.carpetCleaning')}</option>
          <option value="meble">{t('services.furnitureCleaning')}</option>
          <option value="kostka">{t('services.paverCleaning')}</option>
          <option value="inne">{t('contact.other')}</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {t('contact.messageLabel')} *
        </label>
        <textarea
          id="message"
          rows={4}
          className={`w-full px-4 py-2 border ${
            errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
          } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-slate-800 dark:text-white`}
          {...register("message")}
        ></textarea>
        {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
      </div>

      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            id="terms"
            className={`focus:ring-primary h-4 w-4 text-primary border ${
              errors.terms ? 'border-red-500' : 'border-gray-300'
            } rounded`}
            {...register("terms")}
          />
        </div>
        <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
          {t('contact.termsLabel')} *
        </label>
      </div>
      {errors.terms && <p className="mt-1 text-sm text-red-500">{errors.terms.message}</p>}

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-accent hover:bg-accent-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center disabled:opacity-70"
        >
          <FiSend className="w-5 h-5 mr-2" />
          {isSubmitting ? t('contact.sending') : t('contact.sendMessage')}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
