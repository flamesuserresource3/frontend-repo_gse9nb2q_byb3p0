import React, { useMemo } from 'react'

function simulate(values) {
  const years = Math.max(1, Math.min(30, Math.floor(values.years || 10)))
  const salaryGrowth = (values.salaryGrowth || 0) / 100
  const investRate = (values.investRate || 0) / 100
  const expectedReturn = (values.expectedReturn || 0) / 100

  let net = values.currentNetWorth || 0
  const points = []

  for (let y = 1; y <= years; y++) {
    const salary = (values.salary || 0) * Math.pow(1 + salaryGrowth, y - 1)
    const invest = salary * investRate + (values.addInvestment || 0)

    // 70/30 allocation model
    const investPortion = (net + invest) * 0.7
    const cashPortion = (net + invest) * 0.3

    const growth = investPortion * expectedReturn
    net = investPortion + growth + cashPortion

    if (values.assetYear && values.assetAmount && y === Math.floor(values.assetYear)) {
      net -= values.assetAmount
    }

    points.push({ year: y, value: Math.max(0, net) })
  }
  return points
}

export default function NetWorthChart({ lang, values }) {
  const points = useMemo(() => simulate(values), [values])
  const t = useMemo(() => ({
    en: { title: 'Net Worth Projection', year: 'Year', value: 'Net Worth' },
    id: { title: 'Proyeksi Kekayaan Bersih', year: 'Tahun', value: 'Nilai Kekayaan' },
  })[lang], [lang])

  const width = 800
  const height = 320
  const padding = 40

  const maxValue = Math.max(...points.map((p) => p.value), 1)
  const minValue = 0
  const x = (i) => padding + (i * (width - padding * 2)) / Math.max(1, points.length - 1)
  const y = (v) => height - padding - ((v - minValue) * (height - padding * 2)) / (maxValue - minValue || 1)

  const pathD = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(p.value)}`)
    .join(' ')

  const areaD = `${points.length ? `M ${x(0)} ${y(0)} ` : ''}` +
    points.map((p, i) => `L ${x(i)} ${y(p.value)}`).join(' ') +
    (points.length ? ` L ${x(points.length - 1)} ${y(0)} Z` : '')

  const yTicks = 4
  const tickValues = Array.from({ length: yTicks + 1 }, (_, i) => Math.round((i * maxValue) / yTicks))

  const format = (v) => new Intl.NumberFormat(lang === 'id' ? 'id-ID' : 'en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(v)

  return (
    <div className="card">
      <h3 className="card-title">{t.title}</h3>
      <div className="w-full overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-72">
          {/* grid & axes */}
          <rect x="0" y="0" width={width} height={height} fill="white" />
          {tickValues.map((tv, idx) => (
            <g key={idx}>
              <line x1={padding} x2={width - padding} y1={y(tv)} y2={y(tv)} stroke="#e5e7eb" />
              <text x={8} y={y(tv)} alignmentBaseline="middle" className="fill-slate-500 text-xs">
                {format(tv)}
              </text>
            </g>
          ))}
          {/* x labels */}
          {points.map((p, i) => (
            <text key={i} x={x(i)} y={height - 10} textAnchor="middle" className="fill-slate-500 text-xs">
              {p.year}
            </text>
          ))}

          {/* area */}
          <path d={areaD} fill="#93c5fd55" />
          {/* line */}
          <path d={pathD} fill="none" stroke="#2563eb" strokeWidth="2" />
          {/* points */}
          {points.map((p, i) => (
            <circle key={i} cx={x(i)} cy={y(p.value)} r="3" fill="#2563eb" />
          ))}
        </svg>
      </div>
    </div>
  )
}
