import { Link } from "wouter"
import { forwardRef, ImgHTMLAttributes } from "react"

interface LogoProps extends Omit<ImgHTMLAttributes<HTMLDivElement>, 'ref'> {
  size?: 'small' | 'medium' | 'large'
  href?: string
  showTagline?: boolean
  variant?: 'card' | 'circular'
  className?: string
}

const sizeConfig = {
  small: {
    container: 'p-2',
    image: 'w-12',
    tagline: 'text-xs'
  },
  medium: {
    container: 'p-3',
    image: 'w-16',
    tagline: 'text-xs'
  },
  large: {
    container: 'p-6',
    image: 'w-32',
    tagline: 'text-base'
  }
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  (
    {
      size = 'medium',
      href,
      showTagline = true,
      variant = 'card',
      className = '',
      ...props
    },
    ref
  ) => {
    const config = sizeConfig[size]

    const logoContent = variant === 'circular' ? (
      <div
        ref={ref}
        className={`flex items-center justify-center bg-white dark:bg-slate-800 rounded-full shadow-lg dark:shadow-slate-900 ${className}`}
        style={{ width: '140px', height: '140px' }}
        {...props}
      >
        <img
          src="/images/Logo.png"
          alt="Zaron - Build Wealth Investment Platform"
          className="w-24 h-auto object-contain"
        />
      </div>
    ) : (
      <div
        ref={ref}
        className={`flex flex-col items-center justify-center bg-white dark:bg-slate-800 rounded-2xl shadow-lg dark:shadow-slate-900 border border-gray-100 dark:border-slate-700 ${config.container} ${className}`}
        {...props}
      >
        <img
          src="/images/Logo.png"
          alt="Zaron - Build Wealth Investment Platform"
          className={`${config.image} h-auto object-contain`}
        />
        {showTagline && (
          <p className={`${config.tagline} text-gray-600 dark:text-gray-300 font-medium mt-2 text-center leading-tight`}>
            Build Wealth.<br/>One Tag at a Time.
          </p>
        )}
      </div>
    )

    if (href) {
      return (
        <Link href={href} className="inline-flex">
          {logoContent}
        </Link>
      )
    }

    return logoContent
  }
)

Logo.displayName = 'Logo'

export default Logo
