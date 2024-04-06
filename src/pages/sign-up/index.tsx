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
import signupFormSchema from "@/validation/signup.validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import StudentSignup from "@/assets/students-signup.svg";
import { t } from "i18next";
import { useLanguage } from "@/providers/languageProvider";
import axios from "axios";
import { API_ENDPOINT, LocalStorageKeys } from "@/config/constants";
import routes from "@/api/routes";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });
  const { language } = useLanguage();
  const navigate = useNavigate();

  const signUp = async (data: z.infer<typeof signupFormSchema>) => {
    const res = await axios.post(API_ENDPOINT + routes.signup.path, data);
    if (res.status === 201) {
      console.log("User created successfully");
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
      title={t("welcome-to-peer-pulse")}
      subTitle={t("enter-credential-create-account")}
      alternateRoute="/sign-in"
      alternateRouteText={t("sign-in")}
      bgImage={StudentSignup}
      isLoading={false}
      error=""
      clearError={() => {}}
    >
      <div className="w-5/6 md:w-2/3">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => {
              signUp(data);
            })}
            className="flex w-full flex-col gap-5"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("email")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Please enter your college email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("username")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
            <Button type="submit">{t("sign-up")}</Button>
          </form>
        </Form>
      </div>
    </AuthPageLayout>
  );
};

export default SignUp;
