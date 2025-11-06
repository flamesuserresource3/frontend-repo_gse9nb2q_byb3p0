import React, { useMemo, useState } from 'react'
import './components/ui-classes.css'
import LanguageSwitcher from './components/LanguageSwitcher'
import ScenarioForm from './components/ScenarioForm'
import NetWorthChart from './components/NetWorthChart'
import SummaryCards from './components/SummaryCards'

function useTexts(lang) {
  return useMemo(() => ({
    en: {
      title: 'Net Worth Simulator',
      subtitle: 'Project your future net worth across scenarios with 70/30 portfolio allocation and growth chart.',
      reset: 'Reset',
      hero: {
        headline: 'Exchange-style UI',
        desc: 'Tweak inputs on the left, visualize growth on the right.'
      }
    },
    id: {
      title: 'Simulasi Kekayaan Bersih',
      subtitle: 'Proyeksikan kekayaan bersih masa depan berdasarkan skenario dengan alokasi 70/30 dan grafik pertumbuhan.',
      reset: 'Atur Ulang',
      hero: {
        headline: 'Tampilan ala Exchange',
        desc: 'Atur parameter di kiri, lihat grafik di kanan.'
      }
    },
  })[lang], [lang])
}

const DEFAULTS = {
  currentNetWorth: 20000,
  salary: 24000,
  salaryGrowth: 5,
  investRate: 20,
  expectedReturn: 8,
  years: 20,
  addInvestment: 1200,
  assetYear: 5,
  assetAmount: 8000,
}

export default function App() {
  const [lang, setLang] = useState('id')
  const [values, setValues] = useState(DEFAULTS)
  const t = useTexts(lang)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <header className="sticky top-0 z-10 backdrop-blur bg-white/60 border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-800">{t.title}</h1>
            <p className="text-slate-600 text-sm md:text-base">{t.subtitle}</p>
          </div>
          <LanguageSwitcher lang={lang} onChange={setLang} />
        </div>
      </header>

      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-lg bg-blue-600/90 text-white grid place-items-center font-bold">70/30</div>
            <div>
              <div className="font-semibold text-slate-800">{t.hero.headline}</div>
              <p className="text-sm text-slate-600">{t.hero.desc}</p>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <SummaryCards lang={lang} values={values} />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2">
            <ScenarioForm lang={lang} values={values} onChange={setValues} />
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setValues(DEFAULTS)}
                className="px-4 py-2 rounded-md bg-slate-800 text-white hover:bg-slate-900"
              >
                {t.reset}
              </button>
            </div>
          </div>
          <div className="lg:col-span-3">
            <NetWorthChart lang={lang} values={values} />
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-xs text-slate-500">
        Built with love • 70/30 portfolio model
      </footer>
    </div>
  )
}
