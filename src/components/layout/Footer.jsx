function Footer() {
  return (
    <footer className="py-4 bg-[#1F2A30]">
      <div className="mx-auto px-5  md:px-10 xl:px-32">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="#" className="flex items-center">
              <span className="self-center text-2xl font-bold maven whitespace-nowrap dark:text-white">
                🌙 DeepIslam
              </span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-md font-semibold text-gray-900 maven dark:text-white">
                Navigation
              </h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-4">
                  <a href="/" className="hover:underline">
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="https://tailwindcss.com/"
                    className="hover:underline"
                  >
                    Help
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-md font-semibold text-gray-900 maven dark:text-white">
                Follow us
              </h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-4">
                  <a
                    href="https://github.com/themesberg/flowbite"
                    className="hover:underline "
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.gg/4eeurUVvTy"
                    className="hover:underline"
                  >
                    Discord
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-md font-semibold text-gray-900 maven dark:text-white">
                Popular Links
              </h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2022
            <a href="/" className="hover:underline ml-1">
              🌙 DeepIslam.com
            </a>
            <span> All Rights Reserved.</span>
          </span>
          <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <a href="#" className="text-gray-500 hover:text-[#0766FF]">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-[#FE0164]">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-[#2BA4F2]">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-black">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 448 512"
                aria-hidden="true"
              >
                <path d="M448 209.8v-61.4a176.5 176.5 0 0 1-90.7-24.8 93.4 93.4 0 0 1-23.8-22.2 90.2 90.2 0 0 1-16-32.7 87.1 87.1 0 0 1-2.4-20.8h-66.2v329a57.7 57.7 0 0 1-9.5 31.6 59.3 59.3 0 0 1-25.4 22.2c-6.7 3.1-14.3 5.4-23.1 5.4a63.5 63.5 0 0 1-32.5-8.7 65.1 65.1 0 0 1-23.4-23.8 64.8 64.8 0 0 1-8.7-32.7 62.8 62.8 0 0 1 8.7-32.2 65.8 65.8 0 0 1 23.4-23.8 61.7 61.7 0 0 1 32.5-8.7 68.5 68.5 0 0 1 10.3.8V163a142.6 142.6 0 0 0-40.3-5.5 156 156 0 0 0-31.8 3.1 147.6 147.6 0 0 0-28.3 8.7 143.6 143.6 0 0 0-25.9 14.3 145.2 145.2 0 0 0-43.1 50 141.3 141.3 0 0 0-16.7 65.4 148.7 148.7 0 0 0 4.7 38.1 143.4 143.4 0 0 0 13.5 34.1 144.3 144.3 0 0 0 21.5 29 147.7 147.7 0 0 0 25.9 22.7 156.2 156.2 0 0 0 30.2 16.7 160.1 160.1 0 0 0 36.1 9.5 183 183 0 0 0 20.7 1h11.1a142.2 142.2 0 0 0 46.8-7.1 127.6 127.6 0 0 0 41.6-21.1c12.4-9.5 23-20.6 32.2-32.2V211.3a177.2 177.2 0 0 0 50 7.1z" />
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-[red]">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 576 512"
                aria-hidden="true"
              >
                <path d="M549.655 124.083c-6.281-23.625-24.764-42.312-48.044-48.68C457.52 64 288 64 288 64s-169.52 0-213.611 11.403c-23.28 6.368-41.763 25.055-48.044 48.68C16 167.611 16 256 16 256s0 88.389 10.345 131.917c6.281 23.625 24.764 42.312 48.044 48.68C118.48 448 288 448 288 448s169.52 0 213.611-11.403c23.28-6.368 41.763-25.055 48.044-48.68C560 344.389 560 256 560 256s0-88.389-10.345-131.917zM232 338.5v-165l142 82.5-142 82.5z" />
              </svg>
            </a>

            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                aria-hidden="true"
                fill="currentColor"
                className="w-5 h-5 text-green-400"
              >
                <path d="M448 209.8v-61.4a176.5 176.5 0 0 1-90.7-24.8 93.4 93.4 0 0 1-23.8-22.2 90.2 90.2 0 0 1-16-32.7 87.1 87.1 0 0 1-2.4-20.8h-66.2v329a57.7 57.7 0 0 1-9.5 31.6 59.3 59.3 0 0 1-25.4 22.2c-6.7 3.1-14.3 5.4-23.1 5.4a63.5 63.5 0 0 1-32.5-8.7 65.1 65.1 0 0 1-23.4-23.8 64.8 64.8 0 0 1-8.7-32.7 62.8 62.8 0 0 1 8.7-32.2 65.8 65.8 0 0 1 23.4-23.8 61.7 61.7 0 0 1 32.5-8.7 68.5 68.5 0 0 1 10.3.8V163a142.6 142.6 0 0 0-40.3-5.5 156 156 0 0 0-31.8 3.1 147.6 147.6 0 0 0-28.3 8.7 143.6 143.6 0 0 0-25.9 14.3 145.2 145.2 0 0 0-43.1 50 141.3 141.3 0 0 0-16.7 65.4 148.7 148.7 0 0 0 4.7 38.1 143.4 143.4 0 0 0 13.5 34.1 144.3 144.3 0 0 0 21.5 29 147.7 147.7 0 0 0 25.9 22.7 156.2 156.2 0 0 0 30.2 16.7 160.1 160.1 0 0 0 36.1 9.5 183 183 0 0 0 20.7 1h11.1a142.2 142.2 0 0 0 46.8-7.1 127.6 127.6 0 0 0 41.6-21.1c12.4-9.5 23-20.6 32.2-32.2V211.3a177.2 177.2 0 0 0 50 7.1z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
