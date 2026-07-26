import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold whitespace-nowrap',
  {
    variants: {
      variant: {
        default: 'bg-slate-100 text-slate-700 border-slate-200',
        hot_lead: 'bg-red-50 text-red-700 border-red-200',
        price_checking: 'bg-amber-50 text-amber-700 border-amber-200',
        booked: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        follow_up: 'bg-sky-50 text-sky-700 border-sky-200',
        escalated: 'bg-rose-100 text-rose-800 border-rose-300',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

export interface BadgeProps extends React.ComponentProps<'span'>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}
