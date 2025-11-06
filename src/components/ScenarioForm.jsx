import React, { useMemo } from 'react'

export default function ScenarioForm({ lang, values, onChange }) {
  const t = useMemo(() => ({
    en: {
      title: 'Scenario Inputs',
      currentNetWorth: 'Current Net Worth',
      salary: 'Annual Salary',
      salaryGrowth: 'Salary Growth % / year',
      investRate: 'Invested % of salary',
      expectedReturn: 'Expected Return % / year',
      years: 'Projection Years',
      addInvestment: 'New Investment per year',
      assetPurchase: 'Asset Purchase (one-time, year)',
      assetYear: 'Year',
      amount: 'Amount',
      allocation: 'Portfolio Allocation',
      allocateNote: '70% invested • 30% cash',
    },
    id: {
      title: 'Input Skenario',
      currentNetWorth: 'Kekayaan Bersih Saat Ini',
      salary: 'Gaji Tahunan',
      salaryGrowth: 'Kenaikan Gaji % / tahun',
      investRate: 'Persentase Gaji Diinvestasikan',
      expectedReturn: 'Return Diharapkan % / tahun',
      years: 'Horizon Proyeksi',
      addInvestment: 'Investasi Baru per tahun',
      assetPurchase: 'Pembelian Aset (sekali, tahun)',
      assetYear: 'Tahun',
      amount: 'Jumlah',
      allocation: 'Alokasi Portofolio',
      allocateNote: '70% investasi • 30% kas',
    },
  })[lang], [lang])

  const input = (name, label, type = 'number', step = 'any') => (
    <label className="flex flex-col gap-1">
      <span className="text-sm text-gray-600">{label}</span>
      <input
        type={type}
        step={step}
        className="input"
        value={values[name] ?? ''}
        onChange={(e) => onChange({ ...values, [name]: parseFloat(e.target.value || '0') })}
      />
    </label>
  )

  return (
    <div className="card">
      <h3 className="card-title">{t.title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {input('currentNetWorth', t.currentNetWorth)}
        {input('salary', t.salary)}
        {input('salaryGrowth', t.salaryGrowth)}
        {input('investRate', t.investRate)}
        {input('expectedReturn', t.expectedReturn)}
        {input('years', t.years)}
        {input('addInvestment', t.addInvestment)}
        <div className="grid grid-cols-2 gap-3">
          {input('assetYear', t.assetYear)}
          {input('assetAmount', t.amount)}
        </div>
      </div>
      <div className="mt-4">
        <h4 className="font-medium text-gray-800 mb-1">{t.allocation}</h4>
        <p className="text-sm text-gray-500">{t.allocateNote}</p>
        <div className="mt-2 grid grid-cols-2 gap-3">
          <div className="p-3 rounded-md bg-blue-50 text-blue-700">70%</div>
          <div className="p-3 rounded-md bg-amber-50 text-amber-700">30%</div>
        </div>
      </div>
    </div>
  )
}
