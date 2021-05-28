import React from "react";
import { Formik, Form } from "formik";
import { FormControl, FormLabel, Box, Button } from "@chakra-ui/react";
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { useLoginUserMutation } from "../generated/graphql";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const [login] = useLoginUserMutation();
  const router = useRouter();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          if (!values.usernameOrEmail.length) {
            setErrors({ usernameOrEmail: "username cannot be empty" });
          } else if (!values.password.length) {
            setErrors({ password: "password cannot be empty" });
          } else {
            const response = await login({ variables: values });
            if (response.data?.login.errors) {
              setErrors(toErrorMap(response.data?.login.errors));
            } else if (response.data?.login.user) {
              router.push("/");
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <InputField
                name="usernameOrEmail"
                placeholder="Username or Email"
                label="Username or Email"
              />
              <Box mt={4}>
                <InputField
                  name="password"
                  placeholder="password"
                  label="Password"
                  type="password"
                />
              </Box>
              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                color="teal"
              >
                Login
              </Button>
            </FormControl>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;
