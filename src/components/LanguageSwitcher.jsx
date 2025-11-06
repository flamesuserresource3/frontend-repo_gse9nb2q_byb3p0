import React from 'react'

const LANGS = {
  en: { code: 'en', label: 'English' },
  id: { code: 'id', label: 'Bahasa Indonesia' },
}

export default function LanguageSwitcher({ lang, onChange }) {
  return (
    <div className="flex items-center gap-2">
      {Object.values(LANGS).map((l) => (
        <button
          key={l.code}
          onClick={() => onChange(l.code)}
          className={
            'px-3 py-1 rounded-md text-sm font-medium transition ' +
            (lang === l.code
              ? 'bg-blue-600 text-white shadow'
              : 'bg-white/60 hover:bg-white text-gray-700')
          }
          aria-pressed={lang === l.code}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}
