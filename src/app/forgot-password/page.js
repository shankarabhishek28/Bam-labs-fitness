"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { InputWithLabel } from "@/components/ui/InputWithLabel";
import ButtonWithLoader from "@/components/ui/ButtonWithLoader";
 // Ensure this helper function exists
import { toast } from "react-toastify"; // Ensure toastify is configured
import { resetPassword } from "@/serviceAPI/tennant";
import { comparePasswords } from "@/utils/helpers";

export default function ForgotPassword() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { token } = router.query;

    if (!token) {
      toast.error("Invalid or missing token.");
      return;
    }

    if (!comparePasswords(newPassword, repeatPassword)) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        token,
        newPassword,
        repeatPassword,
      };

      const response = await resetPassword(payload);

      if (response?.status) {
        toast.success("Password reset successful!");
        setLoading(false);

        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        toast.error(response?.message || "Failed to reset password.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center relative">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url("/loginbg.jpg")` }}
      ></div>

      <div className="bg-white w-[454px] h-fit px-8 py-8 pb-10 rounded-[32px] z-10 shadow-xl relative">
        <div className="flex justify-center font-semibold text-lg w-full">
          BAM fitness
        </div>
        <div className="flex justify-center font-semibold text-sm w-full">
          (Admin Panel)
        </div>

        <form className="flex flex-col gap-4 mt-10" onSubmit={handleSubmit}>
          <div className="font-semibold text-lg w-full">Reset Password</div>
          <InputWithLabel
            name="newPassword"
            type="password"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <InputWithLabel
            name="repeatPassword"
            type="password"
            placeholder="Confirm your new password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            required
          />

          <ButtonWithLoader
            className="rounded-md py-6"
            loading={loading}
            type="submit"
          >
            Reset Password
          </ButtonWithLoader>
        </form>

        <button
          onClick={() => router.push("/")}
          className="text-sm text-primary underline text-center mt-4"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}
