/* PATH: src/components/auth/LoginForm.jsx */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateEmail, validateRequired } from "../../utils/validators";
import api from "../../services/api";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    identifier: "",
    password: ""
  });
  const navigate = useNavigate();

  const updateField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear messages when user starts typing
    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validate form
    const identifierValidation = validateRequired(formData.identifier, "Email/Phone");
    if (!identifierValidation.isValid) {
      setError(identifierValidation.message);
      setLoading(false);
      return;
    }

    const passwordValidation = validateRequired(formData.password, "Password");
    if (!passwordValidation.isValid) {
      setError(passwordValidation.message);
      setLoading(false);
      return;
    }

    try {
      const response = await api.login({
        identifier: formData.identifier,
        password: formData.password
      });

      setSuccess("Login successful! Redirecting...");

      // Redirect after short delay to show success message
      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold">Welcome Back</h2>

      <p className="text-gray-500 mt-2">
        Login to buy & sell with your campus community.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
            <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
            <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {success}
          </div>
        )}

        <input
          type="text"
          placeholder="College Email / Email / Phone"
          value={formData.identifier}
          onChange={(e) => updateField("identifier", e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#d29b00] focus:border-transparent"
          required
          disabled={loading}
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={formData.password}
            onChange={(e) => updateField("password", e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-20 outline-none focus:ring-2 focus:ring-[#d29b00] focus:border-transparent"
            required
            disabled={loading}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-3 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50"
            disabled={loading}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-[#d29b00] focus:ring-[#d29b00]"
              disabled={loading}
            />
            <span className={loading ? "text-gray-400" : "text-gray-700"}>Remember me</span>
          </label>

          <button
            type="button"
            className={`hover:underline ${loading ? "text-gray-400 cursor-not-allowed" : "text-[#d29b00]"}`}
            disabled={loading}
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#d29b00] hover:bg-[#b88600] disabled:bg-gray-400 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>

        <div className="relative text-center text-sm text-gray-400">
          <span className="bg-white px-3 relative z-10">OR</span>
          <div className="absolute top-1/2 left-0 right-0 border-t"></div>
        </div>

        <button
          type="button"
          className="w-full border border-gray-300 py-3 rounded-xl hover:bg-gray-50 transition"
        >
          Continue with Google
        </button>
      </form>

      <p className="text-xs text-gray-400 mt-6 leading-5">
        Backend later: hashed passwords, JWT auth, OTP verification,
        CAPTCHA after failed attempts, secure cookies.
      </p>
    </div>
  );
}