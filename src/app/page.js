"use client";
import { EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { InputWithLabel } from "@/components/ui/InputWithLabel";
import ButtonWithLoader from "@/components/ui/ButtonWithLoader";

export default function Home() {
  const router = useRouter();

  const handleChange = () => {
    // Handle input changes if needed
  };

  const handleLogin = () => {
    router.push("/user-management");
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center relative">
      <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: `url("/loginbg.jpg")` }}></div>

      <div className="bg-white w-[454px] h-fit  px-8 py-8 pb-10 rounded-[32px] z-10 shadow-xl relative">
        <div className="flex justify-center font-semibold text-lg w-full">BAM fitness</div>
        <div className="flex justify-center font-semibold text-sm w-full">(Admin Panel)</div>


        <form className="flex flex-col gap-4 mt-10">
          <div className="font-semibold text-lg w-full">Sign In</div>
          <InputWithLabel onChange={handleChange} className='w-100' name="email" type="email" placeholder="Enter your email" required />
          <InputWithLabel onChange={handleChange} name="password" type="password" placeholder="Enter your password" iconType="post">
            <EyeOff />
          </InputWithLabel>

          <p className="text-sm text-primary underline text-end cursor-pointer mt-2">Forgot Password?</p>
          <ButtonWithLoader className='rounded-md py-6' loading={false} onClick={handleLogin}>
            Sign In
          </ButtonWithLoader>
        </form>
      </div>
    </div>
  );
}
