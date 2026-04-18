/* PATH: src/components/auth/SignupForm.jsx */

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validatePassword, validateConfirmPassword, validateSignupForm } from "../../utils/validators";
import api from "../../services/api";

export default function SignupForm() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    collegeName: "",
    studentId: "",
    rollNumber: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",

    department: "",
    year: "",
    semester: "",
    gender: "",

    residence: "",
    budget: "",
    semesterMonth: "",

    interestTech: false,
    interestFashion: false,
  });

  const passwordStrength = useMemo(() => {
    const value = form.password;
    if (value.length >= 12) return "Strong";
    if (value.length >= 8) return "Medium";
    return "Weak";
  }, [form.password]);

  const updateField = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

    // Clear field-specific errors when user types
    if (fieldErrors[key]) {
      setFieldErrors(prev => ({
        ...prev,
        [key]: ""
      }));
    }

    // Clear general messages
    if (error) setError("");
    if (success) setSuccess("");
  };

  const nextStep = () => {
    // Validate current step before proceeding
    if (step === 1) {
      const requiredFields = ['fullName', 'collegeName', 'email', 'phone'];
      const stepErrors = {};

      requiredFields.forEach(field => {
        if (!form[field] || form[field].trim() === '') {
          stepErrors[field] = `${field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} is required`;
        }
      });

      if (Object.keys(stepErrors).length > 0) {
        setFieldErrors(stepErrors);
        return;
      }
    }

    setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    setFieldErrors({});

    // Validate entire form
    const validation = validateSignupForm(form);
    if (!validation.isValid) {
      setFieldErrors(validation.errors);
      setLoading(false);
      return;
    }

    try {
      const response = await api.signup(form);

      setSuccess("Account created successfully! Redirecting...");

      // Redirect after short delay to show success message
      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold">Create Account</h2>

      <p className="text-gray-500 mt-2">
        Join your college marketplace today.
      </p>

      <div className="mt-4 text-sm text-gray-400">
        Step {step} of 3
      </div>

      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
          <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      {success && (
        <div className="mt-4 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
          <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {success}
        </div>
      )}

      {/* STEP 1 */}
      {step === 1 && (
        <div className="mt-6 space-y-4">
          <div>
            <input
              placeholder="Full Name"
              className={`w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#d29b00] focus:border-[#d29b00] ${fieldErrors.fullName ? 'border-red-300 focus:ring-red-500' : ''}`}
              value={form.fullName}
              onChange={(e) => updateField("fullName", e.target.value)}
              disabled={loading}
            />
            {fieldErrors.fullName && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.fullName}</p>
            )}
          </div>

          <div>
            <input
              placeholder="College Name"
              className={`w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#d29b00] focus:border-[#d29b00] ${fieldErrors.collegeName ? 'border-red-300 focus:ring-red-500' : ''}`}
              value={form.collegeName}
              onChange={(e) => updateField("collegeName", e.target.value)}
              disabled={loading}
            />
            {fieldErrors.collegeName && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.collegeName}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="Student ID"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#d29b00] focus:border-[#d29b00]"
              value={form.studentId}
              onChange={(e) => updateField("studentId", e.target.value)}
              disabled={loading}
            />

            <input
              placeholder="Roll Number"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#d29b00] focus:border-[#d29b00]"
              value={form.rollNumber}
              onChange={(e) => updateField("rollNumber", e.target.value)}
              disabled={loading}
            />
          </div>

          <div>
            <input
              placeholder="College Email"
              type="email"
              className={`w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#d29b00] focus:border-[#d29b00] ${fieldErrors.email ? 'border-red-300 focus:ring-red-500' : ''}`}
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              disabled={loading}
            />
            {fieldErrors.email && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
            )}
          </div>

          <div>
            <input
              placeholder="Phone Number"
              className={`w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#d29b00] focus:border-[#d29b00] ${fieldErrors.phone ? 'border-red-300 focus:ring-red-500' : ''}`}
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              disabled={loading}
            />
            {fieldErrors.phone && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.phone}</p>
            )}
          </div>

          <button
            onClick={nextStep}
            className="w-full bg-[#d29b00] hover:bg-[#b88600] disabled:bg-gray-400 text-white py-3 px-4 rounded-xl font-semibold transition"
            disabled={loading}
          >
            Continue
          </button>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="mt-6 space-y-4">
          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={`w-full border border-gray-300 rounded-xl px-4 py-3 pr-20 outline-none focus:ring-2 focus:ring-[#d29b00] focus:border-[#d29b00] ${fieldErrors.password ? 'border-red-300 focus:ring-red-500' : ''}`}
                value={form.password}
                onChange={(e) => updateField("password", e.target.value)}
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
            {fieldErrors.password && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.password}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              className={`w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#d29b00] focus:border-[#d29b00] ${fieldErrors.confirmPassword ? 'border-red-300 focus:ring-red-500' : ''}`}
              value={form.confirmPassword}
              onChange={(e) => updateField("confirmPassword", e.target.value)}
              disabled={loading}
            />
            {fieldErrors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.confirmPassword}</p>
            )}
          </div>

          <p className="text-sm text-gray-500">
            Strength:{" "}
            <span className={`font-semibold ${
              passwordStrength === 'Strong' ? 'text-green-600' :
              passwordStrength === 'Medium' ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {passwordStrength}
            </span>{" "}
            (8+ chars, uppercase, lowercase, number, special char required)
          </p>

          <input
            placeholder="Department"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#d29b00] focus:border-[#d29b00]"
            value={form.department}
            onChange={(e) => updateField("department", e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="Year"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#d29b00] focus:border-[#d29b00]"
              value={form.year}
              onChange={(e) => updateField("year", e.target.value)}
            />

            <input
              placeholder="Semester"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#d29b00] focus:border-[#d29b00]"
              value={form.semester}
              onChange={(e) => updateField("semester", e.target.value)}
            />
          </div>

          <select
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#d29b00] focus:border-[#d29b00]"
            value={form.gender}
            onChange={(e) => updateField("gender", e.target.value)}
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <div className="flex gap-3">
            <button
              onClick={prevStep}
              className="w-full border border-gray-300 py-3 px-4 rounded-xl font-semibold transition hover:bg-gray-50"
            >
              Back
            </button>

            <button
              onClick={nextStep}
              className="w-full bg-[#d29b00] hover:bg-[#b88600] text-white py-3 px-4 rounded-xl font-semibold transition"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4"
        >
          <select
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#d29b00] focus:border-[#d29b00]"
            value={form.residence}
            onChange={(e) => updateField("residence", e.target.value)}
          >
            <option value="">Hostel / PG / Day Scholar</option>
            <option>Hostel</option>
            <option>PG</option>
            <option>Day Scholar</option>
          </select>

          <input
            placeholder="Usual Budget (₹)"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#d29b00] focus:border-[#d29b00]"
            value={form.budget}
            onChange={(e) => updateField("budget", e.target.value)}
          />

          <input
            placeholder="Current Semester Month"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#d29b00] focus:border-[#d29b00]"
            value={form.semesterMonth}
            onChange={(e) =>
              updateField("semesterMonth", e.target.value)
            }
          />

          <label className="flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={form.interestTech}
              onChange={(e) =>
                updateField("interestTech", e.target.checked)
              }
            />
            Interest in Tech
          </label>

          <label className="flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={form.interestFashion}
              onChange={(e) =>
                updateField(
                  "interestFashion",
                  e.target.checked
                )
              }
            />
            Interest in Fashion
          </label>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={prevStep}
              className="w-full border border-gray-300 py-3 px-4 rounded-xl font-semibold transition hover:bg-gray-50 disabled:bg-gray-200 disabled:text-gray-400"
              disabled={loading}
            >
              Back
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#d29b00] hover:bg-[#b88600] disabled:bg-gray-400 text-white py-3 px-4 rounded-xl font-semibold transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </div>
        </form>
      )}

    </div>
  );
}