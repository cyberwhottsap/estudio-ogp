interface Props {
  children: React.ReactNode;
}

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import { Dialog } from "@headlessui/react";
import Link from "next/link";
import { useState } from "react";

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "¿Quienes somos?", href: "/quienes-somos" },
  { name: "Encuesta", href: "/encuesta" },
  { name: "Resultados", href: "/resultados" },
];

const companyName = "Estudio OGP";
const companyImageURL = "https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600";

export const Layout = (props: Props) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a
              href="#"
              className="-m-1.5 flex items-center justify-center gap-4 p-1.5"
            >
              <span className="sr-only">{companyName}</span>
              <img
                className="h-8 w-auto"
                src={companyImageURL}
                alt=""
              />
              <p className="font-bold">{companyName}</p>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-8 w-8" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end"></div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="-m-1.5 flex items-center justify-center gap-4 p-1.5"
              >
                <span className="sr-only">{companyName}</span>
                <img
                  className="h-8 w-auto"
                  src={companyImageURL}
                  alt=""
                />
                <p className="font-bold">{companyName}</p>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-8 w-8" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6"></div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
      <main>{props.children}</main>
    </div>
  );
};
