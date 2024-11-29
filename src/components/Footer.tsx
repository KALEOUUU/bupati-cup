// import logo from "../assets/IMMORTAL CUP.png"; // Make sure this path is correct
import Link from "next/link";
import Image from "next/image";

export function Footer() {

  return (
    <footer className="bg-primaryRed dark:bg-gray-900 space-y-6">
    <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
      <div className="md:flex md:justify-between">
        {/* Logo Section */}
        <div className="mb-6 md:mb-0">
          <Link href="/" className="">
            <div className="h-8 mr-3" ></div>
            <span className="text-2xl font-semibold text-white justify-start">
              SportTechnology <br />
              Moklet
            </span>
          </Link>
        </div>

        {/* Information Section */}
        <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
          {/* FAQ Section */}
          <div>
            <h2 className="mb-6 text-sm font-semibold text-white uppercase dark:text-white">
              FAQ
            </h2>
            <ul className="text-white dark:text-gray-400 font-medium">
              <li className="mb-4">
                <p className="hover:underline">
                  sporttechnologyMoklet@gmail.com
                </p>
              </li>
            </ul>
          </div>

          {/* Contact Us Section */}
          <div>
            <h2 className="mb-6 text-sm font-semibold text-white uppercase dark:text-white">
              Contact Us
            </h2>
            <ul className="text-white dark:text-gray-400 font-medium">
              <li className="mb-4">
                <p className="hover:underline">+62 812-9693-9020</p>
              </li>
            </ul>
          </div>

          {/* Our Team Section */}
          <div>
            <h2 className="mb-6 text-sm font-semibold text-white uppercase dark:text-white">
              Our Team
            </h2>
            <ul className="text-white dark:text-gray-400 font-medium">
              <li>
                <a href="#" className="hover:underline">
                  Yahya Rahman
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Shofiyulloh Kamil
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Luky Abdillah
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
  );
};



