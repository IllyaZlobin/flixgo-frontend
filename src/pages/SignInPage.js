import React, { useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import * as authService from "../services/AuthService";

const SignIn = ({ authContext }) => {
  let history = useHistory();
  let location = useLocation();
  let auth = useContext(authContext);

  let { from } = location.state || { from: { pathname: "/home" } };
  let login = async (email, password) => {
    const loginResult = await authService.login(email, password);
    if (loginResult) {
      auth.signin(() => {
        history.replace(from);
      });
    }
  };
  return (
    <div className="sign section--bg" data-bg="img/section/section.jpg">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="sign__content">
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={signinSchema}
                onSubmit={async ({ email, password }) => {
                  await login(email, password);
                }}
              >
                {({ errors, touched }) => (
                  <Form className="sign__form">
                    <a href="#" className="sign__logo">
                      <img src="img\logo.svg" alt="" />
                    </a>

                    <div className="sign__group">
                      <Field
                        name="email"
                        type="email"
                        className="sign__input"
                        placeholder="Email"
                      />
                      {errors.email && touched.email ? (
                        <div style={{ color: "red" }}>{errors.email}</div>
                      ) : null}
                    </div>

                    <div className="sign__group">
                      <Field
                        name="password"
                        type="password"
                        className="sign__input"
                        placeholder="Password"
                      />
                      {errors.password && touched.password ? (
                        <div style={{ color: "red" }}>{errors.password}</div>
                      ) : null}
                    </div>

                    <button className="sign__btn" type="submit">
                      Sign in
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const signinSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Invalid password"),
});

export default SignIn;
