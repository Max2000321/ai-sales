'use client'

import { useEffect, useState, forwardRef } from 'react'
import { PHONE_CONFIG, validatePhone, type PhoneLocale } from '@/lib/validation/phone'

interface PhoneInputProps {
  locale: PhoneLocale
  value: string
  onChange: (value: string) => void
  onValidChange?: (isValid: boolean) => void
  className?: string
  id?: string
  required?: boolean
  /** Force the error hint to show (e.g. after an invalid submit attempt). */
  forceError?: boolean
}

const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(function PhoneInput(
  { locale, value, onChange, onValidChange, className = '', id, required, forceError = false },
  ref
) {
  const config = PHONE_CONFIG[locale]
  const [touched, setTouched] = useState(false)

  const isValid = validatePhone(value, locale)
  const showError = !isValid && ((touched && value.trim().length > 0) || forceError)

  // Report validity changes up to the parent (e.g. to gate the submit button).
  useEffect(() => {
    onValidChange?.(isValid)
  }, [isValid, onValidChange])

  function handleFocus() {
    // Auto-insert the dialing prefix for locales that have one.
    if (value.trim() === '' && config.prefix) {
      onChange(config.prefix + ' ')
    }
  }

  function handleBlur() {
    setTouched(true)
  }

  return (
    <div>
      <input
        ref={ref}
        id={id}
        type="tel"
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={config.placeholder}
        aria-invalid={showError}
        className={className}
      />
      {showError && (
        <p className="text-sm text-red-500 mt-1">{config.hint}</p>
      )}
    </div>
  )
})

export default PhoneInput
