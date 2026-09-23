import React, { useState } from "react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!email.includes("@")) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Login form submitted");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-purple-950 bg-center flex items-center justify-center px-4 py-12">

      {/* Background Glow */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/10 rounded-full blur-3xl"></div>

      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>

      {/* Login Box */}
      <div className="relative w-full max-w-lg">

        <div className="bg-gray-900/90 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl p-10 sm:p-12">

          {/* Heading */}
          <div className="text-center mb-8">

            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 mb-5">
              <span className="text-3xl">
                🎬
              </span>
            </div>

            <h1 className="text-3xl font-bold text-red-500">
              MOVIES
            </h1>

            <h2 className="text-2xl font-bold text-white mt-5">
              Welcome Back 👋
            </h2>

            <p className="text-gray-400 mt-2 text-sm">
              Sign in to continue exploring your favorite shows.
            </p>

          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit}>

            {/* Email */}
            <div className="mb-5">

              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3.5 rounded-xl bg-gray-800/80 border ${
                  errors.email
                    ? "border-red-500"
                    : "border-gray-700"
                } text-white placeholder-gray-500 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition`}
              />

              {errors.email && (
                <p className="text-red-400 text-sm mt-2">
                  {errors.email}
                </p>
              )}

            </div>

            {/* Password */}
            <div className="mb-5">

              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>

              <div className="relative">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  autoComplete="new-password"
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  className={`w-full px-4 py-3.5 pr-12 rounded-xl bg-gray-800/80 border ${
                    errors.password
                      ? "border-red-500"
                      : "border-gray-700"
                  } text-white placeholder-gray-500 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition`}
                />

                {/* Eye Button */}
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center text-gray-400 hover:text-white transition"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >

                  {showPassword ? (

                    /* Eye */
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.8}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.644C3.423 7.51 7.36 4.5 12 4.5c4.64 0 8.577 3.01 9.964 7.178.07.21.07.434 0 .644C20.577 16.49 16.64 19.5 12 19.5c-4.64 0-8.577-3.01-9.964-7.178z"
                      />

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>

                  ) : (

                    /* Eye Slash */
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.8}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 002.036 12c1.387 4.168 5.324 7.178 9.964 7.178 1.507 0 2.94-.327 4.229-.914"
                      />

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.228 6.228A10.451 10.451 0 0112 4.5c4.64 0 8.577 3.01 9.964 7.178a1.012 1.012 0 010 .644 10.52 10.52 0 01-4.132 5.411"
                      />

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.228 6.228L3 3m3.228 3.228l12.544 12.544M9.88 9.88a3 3 0 104.24 4.24"
                      />
                    </svg>

                  )}

                </button>

              </div>

              {errors.password && (
                <p className="text-red-400 text-sm mt-2">
                  {errors.password}
                </p>
              )}

            </div>

            {/* Remember + Forgot Password */}
            <div className="flex items-center justify-between mb-7 text-sm">

              <label className="flex items-center gap-2 text-gray-400 cursor-pointer">

                <input
                  type="checkbox"
                  className="w-4 h-4 accent-red-500"
                />

                <span>
                  Remember me
                </span>

              </label>

              <button
                type="button"
                className="text-red-400 hover:text-red-300 transition"
              >
                Forgot Password?
              </button>

            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition duration-200 shadow-lg shadow-red-500/20"
            >
              Login
            </button>

          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-7">

            <div className="flex-1 h-px bg-gray-800"></div>

            <span className="text-gray-600 text-xs">
              MOVIE APP
            </span>

            <div className="flex-1 h-px bg-gray-800"></div>

          </div>

          {/* Bottom Text */}
          <p className="text-center text-gray-500 text-sm leading-relaxed">
            Enjoy movies, series and your favorite shows
            all in one place.
          </p>

        </div>
      </div>

    </main>
  );
};