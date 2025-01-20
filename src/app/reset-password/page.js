"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { InputWithLabel } from "@/components/ui/InputWithLabel";
import ButtonWithLoader from "@/components/ui/ButtonWithLoader";
import { forgotPassword } from "@/serviceAPI/tennant";
import { toast } from "react-toastify";

export default function ResetPassword() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const email = formData.get("email");

        // Validate email
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        setLoading(true);

        const payload = { email: email };
        const res = await forgotPassword(payload);

        if (res?.status) {
            setLoading(false);
        } else {
            toast.error(
                res?.message || "Failed to send reset link. Please try again."
            );
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

                <form className="flex flex-col gap-4 mt-10" onSubmit={handleResetPassword}>
                    <div className="font-semibold text-lg w-full">Reset Password</div>
                    <InputWithLabel
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                    />

                    <ButtonWithLoader
                        className="rounded-md py-6"
                        loading={loading}
                        type="submit"
                    >
                        Get Verification Link
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
