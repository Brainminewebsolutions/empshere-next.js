import Link from "next/link";
import { Instrument_Sans, Inter } from "next/font/google";
import PhosphorIconTile from "@/components/PhosphorIconTile";
import { ForkKnife, HardHat, IdentificationBadge, UserList, UsersFour, UsersThree, Wallet } from "@phosphor-icons/react/ssr";


const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const fontInstrument = "font-[family-name:var(--font-instrument-sans)]";
const fontInter = "font-[family-name:var(--font-inter)]";

const ease = "ease-[cubic-bezier(0.16,1,0.3,1)]";
const revealUp = "reveal-on-scroll reveal-fade-up";
const stagger = (index, step = 120) => ({ transitionDelay: `${index * step}ms` });

// Warm orange/gold inner glow on hover, with a soft lift and warm tint
const productCardGlow = [
  "shadow-[inset_0_0_0_0.868px_#a2a2a2,inset_0_0_0_0_rgba(248,187,24,0),0_4px_16px_-4px_rgba(0,0,0,0.08)]",
  "hover:shadow-[inset_0_0_0_1px_rgba(239,176,0,0.55),inset_0_0_34px_2px_rgba(248,187,24,0.22),0_22px_40px_-16px_rgba(239,176,0,0.45)]",
  "hover:-translate-y-2 hover:bg-[#FFFDF6]",
  "will-change-transform",
  `transition-[translate,box-shadow,background-color] duration-500 ${ease}`,
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
].join(" ");

const iconPop = `transition-[scale,rotate] duration-500 ${ease} group-hover/card:scale-110 group-hover/card:-rotate-6 motion-reduce:transition-none`;
const titleShift = `transition-colors duration-300 ${ease} group-hover/card:text-[#C98F00]`;
const arrowNudge = `transition-[translate] duration-300 ${ease} group-hover/card:translate-x-[3px] group-hover/btn:translate-x-[5px]`;

function ArrowCircleIcon({ className = "h-5 w-5", fill = "#ffffff" }) {
  return (
    <svg viewBox="0 0 21 21" aria-hidden="true" className={`-scale-x-100 ${arrowNudge} ${className}`}>
      <path
        fill={fill}
        d="M10.5 0C8.423 0 6.393 0.616 4.667 1.77C2.94 2.923 1.594 4.563 0.799 6.482C0.005 8.4 -0.203 10.512 0.202 12.548C0.607 14.585 1.607 16.456 3.075 17.925C4.544 19.393 6.415 20.393 8.452 20.798C10.488 21.203 12.6 20.995 14.518 20.201C16.437 19.406 18.077 18.06 19.23 16.333C20.384 14.607 21 12.577 21 10.5C20.997 7.716 19.89 5.047 17.921 3.079C15.953 1.11 13.284 0.003 10.5 0ZM14.538 11.308L8.411 11.308L10.264 13.159C10.339 13.234 10.398 13.323 10.439 13.422C10.48 13.52 10.5 13.625 10.5 13.731C10.5 13.837 10.48 13.942 10.439 14.04C10.398 14.138 10.339 14.227 10.264 14.302C10.189 14.377 10.1 14.437 10.002 14.477C9.904 14.518 9.798 14.539 9.692 14.539C9.586 14.539 9.481 14.518 9.383 14.477C9.285 14.437 9.196 14.377 9.121 14.302L5.89 11.071C5.815 10.996 5.755 10.907 5.715 10.809C5.674 10.711 5.653 10.606 5.653 10.5C5.653 10.394 5.674 10.289 5.715 10.191C5.755 10.093 5.815 10.004 5.89 9.929L9.121 6.698C9.272 6.546 9.478 6.461 9.692 6.461C9.907 6.461 10.112 6.546 10.264 6.698C10.415 6.849 10.5 7.055 10.5 7.269C10.5 7.484 10.415 7.689 10.264 7.841L8.411 9.692L14.538 9.692C14.753 9.692 14.958 9.777 15.11 9.929C15.261 10.08 15.346 10.286 15.346 10.5C15.346 10.714 15.261 10.92 15.11 11.071C14.958 11.223 14.753 11.308 14.538 11.308Z"
      />
    </svg>
  );
}

export const DEFAULT_PRODUCTS = [
  {
    name: "emHRMS",
    text: "emHRMS can manage a life cycle of an employee and helps to automate all the HR Process in the company. It can reduce the day to day work effort by 40%.",
    icon: UsersThree,
    href: "/human-resource-management-system",
    font: fontInstrument,
  },
  {
    name: "emCLMS",
    text: "emContract Labour management software is an end to end system covering all aspects of labour management.",
    icon: HardHat,
    href: "/contract-labour-management-system-software",
    font: fontInstrument,
  },
  {
    name: "emPay",
    text: "emPay helps organizations to manage their complete salary activities.",
    icon: Wallet,
    href: "/payroll-management-solution",
    font: `${fontInter} tracking-[-0.416px]`,
  },
  {
    name: "emWorkForce",
    text: "Manage your employee life cycle from onboarding to exit, publish letters and more.",
    icon: UsersFour,
    href: "/workforce-management-system",
    font: fontInstrument,
  },
  {
    name: "emVisit",
    text: "emVisit is a fully automated and comprehensive cloud based visitor management system software.",
    icon: IdentificationBadge,
    href: "/visitor-management-system",
    font: fontInstrument,
  },
  {
    name: "emMeal",
    text: "emMeal helps you orchestrate a quick and efficient operation to cover a large section of employees in a systematic and hassle-free manner.",
    icon: ForkKnife,
    href: "/canteen-management-system",
    font: `${fontInter} tracking-[-0.416px]`,
  },
];

export const ALL_FLAGSHIP_PRODUCTS = [
  ...DEFAULT_PRODUCTS,
  {
    name: "emCount",
    text: "We provide effective integration of technologies to simplify our customer’s workflow and boost efficiency.",
    icon: UserList,
    href: "/headcount-management-software",
    font: fontInstrument,
  },
];

export default function FlagshipProducts({
  title = "Our Flagship Products",
  subtitle = "We have developed HR solutions based on our user feedbacks and they seamlessly satisfy your HR needs.",
  description,
  products,
  exclude,
  className = "bg-[#FFFFFA]",
  id = "products-heading",
  accentColor = "#EFB000",
}) {
  const displaySubtitle = description !== undefined ? description : subtitle;
  const excludeList = Array.isArray(exclude) ? exclude : exclude ? [exclude] : [];

  const productList = (products || DEFAULT_PRODUCTS).filter(
    (product) => !excludeList.includes(product.name) && !excludeList.includes(product.href)
  );

  return (
    <section
      aria-labelledby={id}
      className={`${instrumentSans.variable} ${inter.variable} px-4 py-10 md:px-12 md:py-16 ${className}`.trim()}
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <header className={`${revealUp} mx-auto flex max-w-xl flex-col gap-3 text-center`}>
          <h2 id={id} className="text-[26px] font-semibold leading-tight sm:text-3xl md:text-[2.375rem] md:leading-[49px]">
            {title}
          </h2>
          {displaySubtitle && (
            <p className="text-base font-medium leading-[25px] sm:text-lg sm:leading-[27px]">
              {displaySubtitle}
            </p>
          )}
        </header>

        {/* Phones: compact rows (icon left, copy right). sm and up: centred cards. */}
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {productList.map((product, index) => (
            <li
              key={product.name}
              style={stagger(index % 3)}
              className={`${revealUp} flex`}
            >
              {/* Hover styles live on this inner card so the scroll-reveal transition on the li doesn't override them */}
              <div className={`${productCardGlow} group/card flex w-full flex-row items-start gap-4 rounded-[17px] bg-white px-5 py-5 text-left text-black sm:flex-col sm:items-center sm:gap-3 sm:px-6 sm:text-center`}>
                <PhosphorIconTile icon={product.icon} className={`h-14 w-14 shrink-0 rounded-[9px] sm:h-16 sm:w-16 ${iconPop}`} iconClassName="h-8 w-8 sm:h-10 sm:w-10" />
                <div className="flex min-w-0 flex-1 flex-col items-start gap-1.5 sm:w-full sm:items-center sm:gap-3">
                  <h3 className={`text-[17px] font-bold leading-[23px] ${titleShift} ${product.font || fontInstrument}`}>
                    <Link href={product.href} tabIndex={-1}>
                      {product.name}
                    </Link>
                  </h3>
                  <p className={`${fontInstrument} text-[13.5px] leading-[21px] text-black/70 sm:text-xs sm:leading-[19px] sm:text-black`}>
                    {product.text}
                  </p>
                  <Link
                    href={product.href}
                    className={`group/btn -ml-2 mt-auto inline-flex min-h-11 items-center gap-2 px-2 sm:ml-0 ${fontInter} text-[13px] font-semibold leading-6 hover:underline`}
                    style={{ color: accentColor }}
                  >
                    {product.ctaText || "Know More"}
                    <ArrowCircleIcon className="size-4.5" fill={accentColor} />
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
