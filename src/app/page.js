"use client";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { InputWithLabel } from "@/components/ui/InputWithLabel";
import ButtonWithLoader from "@/components/ui/ButtonWithLoader";
import { getToken } from "@/serviceAPI/authService";
import { setToken, setUser } from "@/serviceAPI/cookies";
import { useState } from "react";
import { verifyEmail, verifyPassword } from "@/utils/helpers";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const email = formData.get("email");
    const password = formData.get("password");

    const isEmailValid = verifyEmail(email);
    const isPasswordValid = verifyPassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    setLoading(true);

    try {
      const res = await getToken({ email, password });
      if (res.status === false) {
        return;
      }

      const expiry = new Date().getTime() + 60 * 60 * 1000; // 1 hour expiry
      setToken(res?.data.token, expiry);
      setUser(res?.data, expiry);
      router.push("/user-management");
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
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

        <form className="flex flex-col gap-4 mt-10" onSubmit={handleLogin}>
          <div className="font-semibold text-lg w-full">Sign In</div>
          <InputWithLabel
            name="email"
            type="email"
            placeholder="Enter your email"
            required
          />
          <InputWithLabel
            name="password"
            type={passwordVisible ? "text" : "password"}
            placeholder="Enter your password"
            iconType="post"
          >
            {passwordVisible ? (
              <Eye onClick={togglePasswordVisibility} className="cursor-pointer" />
            ) : (
              <EyeOff onClick={togglePasswordVisibility} className="cursor-pointer" />
            )}
          </InputWithLabel>

          <p className="text-sm text-primary underline text-end cursor-pointer mt-2">
            <Link
              href="/reset-password"
            >
              Forgot Password?
            </Link>
          </p>
          <ButtonWithLoader
            className="rounded-md py-6"
            loading={loading}
            type="submit"
          >
            Sign In
          </ButtonWithLoader>
        </form>
      </div>
    </div>
  );
}
