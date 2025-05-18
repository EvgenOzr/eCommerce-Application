import { SubmitHandler, useForm } from "react-hook-form";
import { Tooltip } from "react-tooltip";
import "./LoginPage.scss";
import { Link, useNavigate } from "react-router";
import { LoginFormData } from "../../types/shopTypes";
import { authRequestResponse } from "../../API/AuthUser";
import { useEffect, useState } from "react";
import { tokenCache } from "../../utils/token";
import { authError } from "../../API/ErrorApi";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({ mode: "all" });

  const navigate = useNavigate();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [apiError, setApiError] = useState<{
    field: "email" | "password" | "general";
    message: string;
  } | null>(null);

  useEffect(() => {
    const token = tokenCache.get();
    if (token) {
      navigate("/");
    }
    setIsCheckingAuth(false);
  }, [navigate]);

  const formSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      await authRequestResponse(data.email, data.password);
      navigate("/");
    } catch (error) {
      const authApiError = authError(error);
      setApiError(authApiError);
      if (authApiError?.field === "email") {
        setError("email", { type: "manual", message: authApiError.message });
      } else if (authApiError?.field === "password") {
        setError("password", { type: "manual", message: authApiError.message });
      } else if (authApiError?.field === "general") {
        setError("email", { type: "manual", message: authApiError.message });
        setError("password", { type: "manual", message: authApiError.message });
      }
    }
  };

  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }

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
                  data-tooltip-id="email-tooltip"
                  data-tooltip-content={
                    errors.email?.message ||
                    (apiError?.field === "email" ? apiError.message : "")
                  }
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                <Tooltip
                  id="email-tooltip"
                  place="top"
                  variant="error"
                  isOpen={!!errors.email || apiError?.field === "email"}
                />
              </div>
              <div className="input-password-container">
                <label className="input-password-title">PASSWORD</label>
                <input
                  className="input-password"
                  type="password"
                  placeholder="******"
                  data-tooltip-id="password-tooltip"
                  data-tooltip-content={
                    errors.password?.message ||
                    (apiError?.field === "password" ? apiError.message : "")
                  }
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />
                <Tooltip
                  id="password-tooltip"
                  place="top"
                  variant="error"
                  isOpen={!!errors.password || apiError?.field === "password"}
                />
              </div>
              <div className="button-login-container">
                <button type="submit" className="login-button">
                  Login
                </button>
              </div>
              <h2 className="register-link">
                Don’t have account?{" "}
                <Link className="link-registration" to={"/registration"}>
                  {" "}
                  Register here{" "}
                </Link>
              </h2>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
