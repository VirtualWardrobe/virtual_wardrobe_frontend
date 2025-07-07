"use client";

import Link from "next/link";
import React, {
  useRef,
  useState,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
  ClipboardEvent,
  JSX,
} from "react";

export default function VerifyOtp(): JSX.Element {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  const handleChange = (element: HTMLInputElement, index: number): void => {
    if (isNaN(Number(element.value))) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value !== "" && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    element: HTMLInputElement,
    event: KeyboardEvent<HTMLInputElement>,
    index: number
  ): void => {
    if (event.key === "Backspace" && element.value === "" && index > 0) {
      if (inputRefs.current[index - 1]) {
        inputRefs.current[index - 1]?.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>): void => {
    const pasteData = e.clipboardData.getData("text").trim();
    if (!/^\d{1,6}$/.test(pasteData)) {
      e.preventDefault();
      return;
    }

    const newOtp: string[] = new Array(6).fill("");
    for (let i = 0; i < pasteData.length && i < 6; i++) {
      newOtp[i] = pasteData[i];
    }
    setOtp(newOtp);

    const lastFilledIndex = Math.min(pasteData.length - 1, 5);
    if (inputRefs.current[lastFilledIndex]) {
      inputRefs.current[lastFilledIndex]?.focus();
    }
    e.preventDefault();
  };

  const handleVerify = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const fullOtp = otp.join("");
    console.log("Verifying OTP:", fullOtp);
    if (fullOtp.length === 6) {
      window.alert("OTP Verified! (This is a placeholder action)");
    } else {
      window.alert("Please enter a 6-digit OTP.");
    }
  };

  const handleResendOtp = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    console.log("Resending OTP...");
    window.alert("OTP has been resent! (This is a placeholder action)");
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Verify OTP
        </h2>
        <p className="mt-2 text-center text-sm/6 text-gray-500">
          Enter the 6-digit code sent to your email.
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-8" onSubmit={handleVerify}>
          <label htmlFor="otp-input" className="sr-only">
            OTP Input
          </label>
          <div className="flex justify-center space-x-2">
            {otp.map((data, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                inputMode="numeric"
                pattern="[0-9]"
                maxLength={1}
                value={data}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(e.target as HTMLInputElement, index)
                }
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                  handleKeyDown(e.target as HTMLInputElement, e, index)
                }
                onPaste={handlePaste}
                ref={(el: HTMLInputElement | null) => {
                  inputRefs.current[index] = el;
                }}
                className="w-12 h-12 text-center text-2xl font-bold text-gray-900 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 outline-none transition-all duration-200 ease-in-out focus:ring-2 focus:ring-offset-2"
                autoComplete="off"
              />
            ))}
          </div>

          <div>
            <Link href="/">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
              >
                Verify
              </button>
            </Link>
          </div>

          <p className="text-center text-sm/6 text-gray-500">
            Didn&apos;t receive the code?{" "}
            <a
              href="#"
              onClick={handleResendOtp}
              className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer"
            >
              Resend OTP
            </a>
          </p>
        </form>
      </div>
    </>
  );
}
