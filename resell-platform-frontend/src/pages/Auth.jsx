/* PATH: src/pages/Auth.jsx */

import { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";

export default function Auth() {
  const [mode, setMode] = useState("login");

  return (
    <div className="min-h-screen bg-[#efefe7] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        
        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center bg-linear-to-br from-amber-50 to-orange-50 p-10">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {import.meta.env.VITE_APP_NAME || 'CampusCycle'}
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Connect with your campus community to buy and sell items safely.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">Verified student community</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">Safe and secure transactions</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">Books, gadgets, and more</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="p-8 md:p-10">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 mb-8">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 py-3 px-4 text-center font-medium transition-colors duration-200 ${
                mode === "login"
                  ? "text-amber-600 border-b-2 border-amber-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode("signup")}
              className={`flex-1 py-3 px-4 text-center font-medium transition-colors duration-200 ${
                mode === "signup"
                  ? "text-amber-600 border-b-2 border-amber-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Sign Up
            </button>
          </div>

          {mode === "login" ? <LoginForm /> : <SignupForm />}
        </div>
      </div>
    </div>
  );
}