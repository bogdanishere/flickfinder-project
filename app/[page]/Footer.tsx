import Image from "next/image";
import imageIcon from "@/public/icon.png";

export default function Footer() {
  return (
    <footer className="bg-background pb-8 w-full">
      <div className="footer custom-bg">
        <div className="text-center mb-30 w-full flex justify-center">
          <Image
            src={imageIcon || "/placeholder.svg"}
            alt="Full logo"
            className="w-80 h-80 max-sm:w-60 max-sm:h-60"
            priority
          />
        </div>

        <div className="flex flex-col items-center w-full px-4 sm:w-4/5 mx-auto">
          <div className="border-t border-gray-400 w-full" />
          <div className="flex justify-around items-center pt-8 max-[600px]:flex-col w-full gap-4">
            <span className="text-center sm:text-left">
              Build by
              <a
                href="https://github.com/bogdanishere"
                className="animation-hyperlink"
              >
                {" "}
                Bogdan Vasilescu
              </a>
            </span>
            <span className="text-center sm:text-right text-sm sm:text-base">
              Copyright &copy; by Bogdan Vasilescu. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
