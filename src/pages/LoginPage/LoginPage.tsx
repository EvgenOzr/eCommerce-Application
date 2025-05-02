import "./LoginPage.scss";

export default function LoginPage() {
  return (
    <>
      <div className="login-wrapper">
        <div className="login-image"></div>
        <div className="login-container">
          <div className="form-container">
            <h2 className="form-title">Sign In</h2>
            <form className="form-submit" action="submit">
              <div className="input-name-container">
                <label className="input-name-title">EMAIL</label>
                <input
                  className="input-name"
                  type="text"
                  placeholder="example@mail.com"
                />
              </div>
              <div className="input-password-container">
                <label className="input-password-title">PASSWORD</label>
                <input
                  className="input-password"
                  type="password"
                  placeholder="******"
                  autoComplete=""
                />
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
