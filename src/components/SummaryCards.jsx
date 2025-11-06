import React, { useMemo } from 'react'
import { Wallet, TrendingUp, PiggyBank } from 'lucide-react'

function formatUSD(v, locale) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(v || 0)
}

export default function SummaryCards({ lang, values }) {
  const locale = lang === 'id' ? 'id-ID' : 'en-US'
  const t = useMemo(() => ({
    en: {
      current: 'Current Net Worth',
      invested: 'Invested (70%)',
      cash: 'Cash (30%)',
    },
    id: {
      current: 'Kekayaan Saat Ini',
      invested: 'Diinvestasikan (70%)',
      cash: 'Kas (30%)',
    },
  })[lang], [lang])

  const current = values.currentNetWorth || 0
  const invested = current * 0.7
  const cash = current * 0.3

  const items = [
    { icon: Wallet, label: t.current, value: formatUSD(current, locale), color: 'bg-blue-50 text-blue-700' },
    { icon: TrendingUp, label: t.invested, value: formatUSD(invested, locale), color: 'bg-emerald-50 text-emerald-700' },
    { icon: PiggyBank, label: t.cash, value: formatUSD(cash, locale), color: 'bg-amber-50 text-amber-700' },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map(({ icon: Icon, label, value, color }) => (
        <div key={label} className={`card ${color}`}>
          <div className="flex items-center gap-3">
            <Icon className="w-5 h-5" />
            <div>
              <div className="text-sm opacity-80">{label}</div>
              <div className="text-lg font-semibold">{value}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
