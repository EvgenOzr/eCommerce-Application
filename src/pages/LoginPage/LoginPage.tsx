import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import "./LoginPage.scss";

interface LoginFormData extends FieldValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const formSubmit: SubmitHandler<LoginFormData> = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="login-wrapper">
        <div className="login-image"></div>
        <div className="login-container">
          <div className="form-container">
            <h2 className="form-title">Sign In</h2>
            <form
              className="form-submit"
              action="submit"
              onSubmit={handleSubmit(formSubmit)}
            >
              <div className="input-name-container">
                <label className="input-name-title">EMAIL</label>
                <input
                  className="input-name"
                  type="text"
                  placeholder="example@mail.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <span className="error-message">{errors.email.message}</span>
                )}
              </div>
              <div className="input-password-container">
                <label className="input-password-title">PASSWORD</label>
                <input
                  className="input-password"
                  type="password"
                  placeholder="******"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errors.password && (
                  <span className="error-message">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className="button-login-container">
                <button type="submit" className="login-button">
                  Login
                </button>
              </div>

              <h2 className="register-link">
                Don’t have account? Register here
              </h2>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
