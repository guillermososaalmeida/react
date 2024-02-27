import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { checkCodeConfirmationUser } from "../service/API_user/user.service";
import { useAuth } from "../context/authContext";
import "./CheckCode.css";
import { useCheckCodeError } from "../hooks/useCheckCodeError";
import { Navigate } from "react-router-dom";

export const CheckCode = () => {
  const [confirmationCodeResponse, setConfirmationCodeResponse] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [redirection, setRedirection] = useState();
  const { allUser, userLogin, setUser } = useAuth();
  const { register, handleSubmit } = useForm();
  const handleReSend = () => {};

  console.log(allUser);

  const formSubmit = async ({ confirmationCode }) => {
    const userLocal = localStorage.getItem("user");

    if (userLocal === null) {
      const customFormData = {
        confirmationCode: parseInt(confirmationCode),
        email: allUser.data.user.email,
      };
      setIsLoading(true);
      setConfirmationCodeResponse(
        await checkCodeConfirmationUser(customFormData)
      );
      setIsLoading(false);
    } else {
      const parseUser = JSON.parse(userLocal);
      const custFormData = {
        confirmationCode: parseInt(confirmationCode),
        email: parseUser.email,
      };
      setIsLoading(true);
      setConfirmationCodeResponse(
        await checkCodeConfirmationUser(custFormData)
      );
      setIsLoading(false);
    }
  };

  useEffect(() => {
    useCheckCodeError(confirmationCodeResponse, setRedirection, userLogin);
  }, [confirmationCodeResponse]);

  const redirectionTarget = () => {
    switch (redirection) {
      case "deletedUser":
        return "/register";

      case "userNotFound":
        return "/login";

      case "correctCode":
        return "/dashboard";
      default:
        break;
    }
  };

  return redirection ? (
    <Navigate to={redirectionTarget()} />
  ) : (
    <>
      <Heading>Verify your code 👌</Heading>

      <form onSubmit={handleSubmit(formSubmit)}>
        <FormControl>
          <FormLabel>Registration code</FormLabel>
          <Input
            type="text"
            {...register("confirmationCode", { required: false })}
          />
          <FormHelperText>Write the code sent to your email</FormHelperText>
          <Button type="submit" isLoading={isLoading}>
            Verify Code
          </Button>
          <Button onClick={() => handleReSend()} isLoading={isLoading}>
            Resend Code
          </Button>
          {/*    <HStack m="2">
        
          </HStack> */}
          <FormHelperText>
            If the code is not correct ❌, your user will be deleted from the
            database and you will need to register again.
          </FormHelperText>
        </FormControl>
      </form>
    </>
  );
};
