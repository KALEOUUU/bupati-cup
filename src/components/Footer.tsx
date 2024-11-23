// import logo from "../assets/IMMORTAL CUP.png"; // Make sure this path is correct
import Link from "next/link";
import Image from "next/image";

export function Footer() {

  return (
    <footer className="bg-[#133E87] dark:bg-gray-900 space-y-6">
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

export function Sponsor() {
  return (
    <div className="flex flex-col items-center container py-8 bg-gray-50 w-full ml-24 mb-2">
    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex flex-col items-center">
          <Image
            src="/placeholder.svg?height=60&width=200"
            alt="Sponsor logo"
            width={200}
            height={60}
            className="dark:invert"
          />
          <span className="mt-2 text-sm text-gray-600">Official Partner</span>
        </div>
      ))}
    </div>
  </div>
  )
}

