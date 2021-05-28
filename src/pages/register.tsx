import React from "react";
import { Formik, Form } from "formik";
import { FormControl, FormLabel, Box, Button } from "@chakra-ui/react";
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
  const router = useRouter();
  const [register] = useRegisterMutation();
  return (
    <>
      <Wrapper variant="small">
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            if (!values.username.length) {
              setErrors({ username: "username cannot be empty" });
            } else if (!values.email.length) {
              setErrors({ email: "email cannot be empty" });
            } else if (!values.password.length) {
              setErrors({ password: "password cannot be empty" });
            } else {
              const response = await register({
                variables: { options: values },
              });
              if (response.data?.register.errors) {
                setErrors(toErrorMap(response.data?.register.errors));
              } else if (response.data?.register.user) {
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
                  name="username"
                  placeholder="username"
                  label="Username"
                />
                <InputField name="email" placeholder="email" label="Email" />
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
                  Register
                </Button>
              </FormControl>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </>
  );
};

export default Register;
