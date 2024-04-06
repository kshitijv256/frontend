import { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINT } from "@/config/constants";
import routes from "@/api/routes";
import { Mail } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const VerifyEmail = () => {
  const [text, setText] = useState("" as string);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await axios.post(
          API_ENDPOINT + routes.verifyEmail.path,
          null,
          {
            params: { token },
          },
        );
        setText(res.data);
      } catch (error) {
        setText("Error verifying email");
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <Mail className="h-16 w-16" />
      <h1 className="mb-4 text-3xl font-bold">Email Verification</h1>
      <p className="text-lg">{text}</p>
      {text !== "Error verifying email" && (
        <p className="text-lg">You can now close this tab</p>
      )}
    </div>
  );
};

export default VerifyEmail;
