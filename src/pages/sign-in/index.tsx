import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AuthPageLayout from "@/layouts/authentication/AuthPageLayout";
import loginFormSchema from "@/validation/login.validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { t } from "i18next";
import { useLanguage } from "@/providers/languageProvider";
import axios from "axios";
import routes from "@/api/routes";
import { API_ENDPOINT, LocalStorageKeys } from "@/config/constants";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { language } = useLanguage();
  const navigate = useNavigate();

  const login = async (data: z.infer<typeof loginFormSchema>) => {
    const res = await axios.post(API_ENDPOINT + routes.login.path, data);
    if (res.status === 200) {
      localStorage.setItem(
        LocalStorageKeys.accessToken,
        res.data.tokens.access.token,
      );
      localStorage.setItem(
        LocalStorageKeys.refreshToken,
        res.data.tokens.refresh.token,
      );
      navigate("/");
    }
  };

  return (
    <AuthPageLayout
      key={language}
      title={t("welcome-back")}
      subTitle={t("enter-credential-access-account")}
      alternateRoute="/sign-up"
      alternateRouteText={t("sign-up")}
      isLoading={false}
      error=""
      clearError={() => {}}
    >
      <div className="w-5/6 md:w-2/3">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(login)}
            className="flex w-full flex-col gap-5"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("email")}</FormLabel>
                  <FormControl>
                    <Input placeholder="abc@iit.edu.in" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("password")}</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">{t("sign-in")}</Button>
          </form>
        </Form>
      </div>
    </AuthPageLayout>
  );
};

export default SignIn;
