import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = () => {
    setError("");
    setMessage("");

    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      // Token email flow will be implemented with Node.js backend
      console.log("Password reset request", email);
      setMessage("Reset link will be sent to your email");
    } catch (e) {
      setError("Unable to process request");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Reset Password</h2>

      <div className="space-y-3">
        <Input
          type="email"
          placeholder="Registered Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {error && (
          <div className="text-sm text-red-600">
            {error}
          </div>
        )}

        {message && (
          <div className="text-sm text-green-700">
            {message}
          </div>
        )}

        <Button className="w-full" onClick={handleReset}>
          Send Reset Link
        </Button>
      </div>
    </div>
  );
}
