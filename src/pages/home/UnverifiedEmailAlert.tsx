import routes from "@/api/routes";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { API_ENDPOINT, LocalStorageKeys } from "@/config/constants";
import axios from "axios";
import { useState } from "react";

const UnverifiedEmailAlert = () => {
  const [emailSent, setEmailSent] = useState(false);
  const sendVerificationEmail = async () => {
    try {
      await axios.post(API_ENDPOINT + routes.sendVerificationEmail.path, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            LocalStorageKeys.accessToken,
          )}`,
        },
      });
      setEmailSent(true);
    } catch (error) {
      setEmailSent(false);
    }
  };
  return (
    <Alert variant="default">
      <AlertTitle>Email not verified</AlertTitle>
      <AlertDescription>
        Please verify your college email to access your peer group
      </AlertDescription>
      {emailSent ? (
        <AlertDescription className="text-green-500">
          Verification email sent successfully
        </AlertDescription>
      ) : (
        <AlertDescription
          className="cursor-pointer text-blue-500 underline"
          onClick={sendVerificationEmail}
        >
          Click here to send the verification email
        </AlertDescription>
      )}
    </Alert>
  );
};

export default UnverifiedEmailAlert;
