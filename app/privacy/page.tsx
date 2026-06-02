'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Shield } from 'lucide-react'

type Lang = 'uk' | 'en' | 'cz'

const CONTENT = {
  uk: {
    title: 'Політика конфіденційності',
    updated: 'Остання редакція: 1 червня 2026 року',
    backHome: 'На головну',
    sections: [
      {
        heading: '1. Загальні положення',
        text: `DentAI (далі — «Сервіс», «ми», «нас») — це SaaS-платформа для автоматизації комунікацій стоматологічних клінік. Ця Політика конфіденційності пояснює, які дані ми збираємо, як ми їх використовуємо та які права ви маєте відповідно до Загального регламенту захисту даних ЄС (GDPR).

Контролер даних: DentAI
Email для запитів: privacy@dentai.app`,
      },
      {
        heading: '2. Які дані ми збираємо',
        text: `Ми збираємо наступні категорії даних:

Дані облікового запису: email-адреса та пароль при реєстрації в сервісі.

Дані клініки: назва агента, системний промпт, база знань (тексти, FAQ, прайси), що ви самостійно завантажуєте на платформу.

Дані діалогів: повідомлення між пацієнтами та AI-агентом вашої клініки. Ці дані зберігаються, щоб ви могли переглядати розмови в дашборді.

Технічні дані: IP-адреса, тип браузера, логи помилок — для забезпечення роботи сервісу та усунення несправностей.

Ми НЕ збираємо: паспортні дані, фінансову інформацію пацієнтів, медичні картки.`,
      },
      {
        heading: '3. Для чого ми використовуємо дані',
        text: `Зібрані дані використовуються виключно для:
— надання функціоналу платформи DentAI;
— генерації відповідей AI на основі вашої бази знань;
— відображення аналітики та діалогів у вашому дашборді;
— технічної підтримки та усунення несправностей;
— надсилання важливих сповіщень про роботу сервісу (не реклама).

Ми НЕ продаємо ваші дані та дані ваших пацієнтів третім особам.`,
      },
      {
        heading: '4. Треті сторони та обробники даних',
        text: `Для надання сервісу ми використовуємо наступних субпроцесорів:

Supabase (supabase.com) — зберігання бази даних, авторизація. Сервери розташовані в ЄС. Відповідність GDPR підтверджена.

Anthropic (anthropic.com) — AI-модель Claude для генерації відповідей. Повідомлення обробляються через API. Anthropic не зберігає дані діалогів для навчання моделей без явної згоди.

Vercel (vercel.com) — хостинг та деплой застосунку. Відповідність GDPR підтверджена.

Всі обробники підписали Угоди про обробку даних (DPA) відповідно до вимог GDPR.`,
      },
      {
        heading: '5. Термін зберігання даних',
        text: `Дані облікового запису зберігаються до видалення акаунту.

Дані діалогів зберігаються 12 місяців з дати останнього повідомлення, після чого видаляються автоматично.

При видаленні акаунту всі пов'язані дані видаляються протягом 30 днів.`,
      },
      {
        heading: '6. Ваші права за GDPR',
        text: `Відповідно до GDPR ви маєте наступні права:

Право на доступ — ви можете запросити копію всіх даних, що ми зберігаємо про вас.

Право на виправлення — ви можете виправити неточні дані.

Право на видалення («право бути забутим») — ви можете запросити видалення всіх ваших даних.

Право на обмеження обробки — ви можете попросити нас тимчасово зупинити обробку ваших даних.

Право на перенесення даних — ви можете отримати свої дані в машинозчитуваному форматі.

Право на заперечення — ви можете заперечити проти певних видів обробки даних.

Для реалізації будь-якого з цих прав надішліть запит на: privacy@dentai.app. Ми відповімо протягом 30 днів.`,
      },
      {
        heading: '7. Безпека даних',
        text: `Ми вживаємо наступних заходів для захисту ваших даних:
— Шифрування даних у стані спокою та під час передачі (TLS 1.3);
— Бази даних розташовані на серверах у ЄС;
— Доступ до даних обмежений принципом мінімальних привілеїв;
— Регулярні оновлення безпеки.

Незважаючи на вжиті заходи, жодна система не може гарантувати 100% безпеку. У разі виявлення витоку даних ми повідомимо відповідні органи протягом 72 годин згідно з вимогами GDPR.`,
      },
      {
        heading: '8. Cookie',
        text: `Ми використовуємо лише технічно необхідні cookies для авторизації (сесійний токен Supabase). Ми не використовуємо маркетингові або аналітичні cookie-файли третіх сторін.`,
      },
      {
        heading: '9. Зміни до Політики',
        text: `Ми можемо оновлювати цю Політику конфіденційності. При суттєвих змінах ми повідомимо вас електронною поштою або через дашборд. Продовження використання сервісу після змін означає прийняття нової редакції.`,
      },
      {
        heading: '10. Контакти',
        text: `З питань конфіденційності та захисту даних звертайтесь:

Email: privacy@dentai.app
Загальні питання: hello@dentai.app

Якщо ви вважаєте, що ваші права порушено, ви маєте право подати скаргу до наглядового органу у сфері захисту даних вашої країни.`,
      },
    ],
  },

  en: {
    title: 'Privacy Policy',
    updated: 'Last updated: June 1, 2026',
    backHome: 'Back to home',
    sections: [
      {
        heading: '1. Overview',
        text: `DentAI ("Service", "we", "us") is a SaaS platform for automating communications at dental clinics. This Privacy Policy explains what data we collect, how we use it, and your rights under the EU General Data Protection Regulation (GDPR).

Data Controller: DentAI
Privacy inquiries: privacy@dentai.app`,
      },
      {
        heading: '2. Data We Collect',
        text: `We collect the following categories of data:

Account data: email address and password when you register.

Clinic data: agent name, system prompt, knowledge base content (texts, FAQs, pricing) that you upload to the platform.

Conversation data: messages between patients and your clinic's AI agent. This is stored so you can review conversations in your dashboard.

Technical data: IP address, browser type, error logs — for service operation and troubleshooting.

We do NOT collect: patient passport data, financial information, or medical records.`,
      },
      {
        heading: '3. How We Use Your Data',
        text: `Collected data is used exclusively for:
— Providing DentAI platform functionality;
— Generating AI responses based on your knowledge base;
— Displaying analytics and conversations in your dashboard;
— Technical support and troubleshooting;
— Sending important service notifications (not marketing).

We do NOT sell your data or your patients' data to third parties.`,
      },
      {
        heading: '4. Third Parties & Data Processors',
        text: `We use the following sub-processors:

Supabase (supabase.com) — database storage and authentication. Servers located in the EU. GDPR-compliant.

Anthropic (anthropic.com) — Claude AI model for generating responses. Messages are processed via API. Anthropic does not retain conversation data for model training without explicit consent.

Vercel (vercel.com) — application hosting and deployment. GDPR-compliant.

All processors have signed Data Processing Agreements (DPA) as required by GDPR.`,
      },
      {
        heading: '5. Data Retention',
        text: `Account data is retained until account deletion.

Conversation data is retained for 12 months from the last message, then automatically deleted.

Upon account deletion, all associated data is removed within 30 days.`,
      },
      {
        heading: '6. Your Rights Under GDPR',
        text: `Under GDPR you have the following rights:

Right of access — you may request a copy of all data we hold about you.

Right to rectification — you may correct inaccurate data.

Right to erasure ("right to be forgotten") — you may request deletion of all your data.

Right to restriction — you may ask us to temporarily stop processing your data.

Right to data portability — you may receive your data in a machine-readable format.

Right to object — you may object to certain types of data processing.

To exercise any of these rights, send a request to: privacy@dentai.app. We will respond within 30 days.`,
      },
      {
        heading: '7. Data Security',
        text: `We apply the following security measures:
— Encryption at rest and in transit (TLS 1.3);
— Databases hosted on EU servers;
— Access restricted by least-privilege principle;
— Regular security updates.

In the event of a data breach, we will notify the relevant supervisory authority within 72 hours as required by GDPR.`,
      },
      {
        heading: '8. Cookies',
        text: `We only use technically necessary cookies for authentication (Supabase session token). We do not use third-party marketing or analytics cookies.`,
      },
      {
        heading: '9. Policy Updates',
        text: `We may update this Privacy Policy. For material changes, we will notify you by email or via the dashboard. Continued use of the service after changes constitutes acceptance of the updated policy.`,
      },
      {
        heading: '10. Contact',
        text: `For privacy and data protection inquiries:

Email: privacy@dentai.app
General: hello@dentai.app

If you believe your rights have been violated, you have the right to lodge a complaint with the supervisory authority in your country.`,
      },
    ],
  },

  cz: {
    title: 'Zásady ochrany osobních údajů',
    updated: 'Poslední aktualizace: 1. června 2026',
    backHome: 'Zpět na hlavní stránku',
    sections: [
      {
        heading: '1. Obecná ustanovení',
        text: `DentAI („Služba", „my", „nás") je SaaS platforma pro automatizaci komunikace stomatologických ordinací. Tyto Zásady ochrany osobních údajů vysvětlují, jaké údaje shromažďujeme, jak je používáme a jaká máte práva podle Obecného nařízení o ochraně osobních údajů EU (GDPR).

Správce údajů: DentAI
Kontakt pro dotazy: privacy@dentai.app`,
      },
      {
        heading: '2. Jaké údaje shromažďujeme',
        text: `Shromažďujeme následující kategorie údajů:

Údaje účtu: e-mailová adresa a heslo při registraci.

Údaje ordinace: název agenta, systémový prompt, znalostní báze (texty, FAQ, ceníky), které sami nahráváte na platformu.

Údaje konverzací: zprávy mezi pacienty a AI agentem vaší ordinace. Tyto údaje jsou uloženy, abyste mohli konverzace prohlížet v přehledu.

Technické údaje: IP adresa, typ prohlížeče, záznamy chyb — pro provoz služby a odstraňování problémů.

NESHROMAŽĎUJEME: cestovní doklady pacientů, finanční informace ani zdravotní záznamy.`,
      },
      {
        heading: '3. K čemu údaje používáme',
        text: `Shromážděné údaje používáme výhradně pro:
— poskytování funkcí platformy DentAI;
— generování odpovědí AI na základě vaší znalostní báze;
— zobrazování analytiky a konverzací ve vašem přehledu;
— technickou podporu a odstraňování problémů;
— zasílání důležitých oznámení o provozu služby (nikoliv reklama).

Vaše údaje ani údaje vašich pacientů NEPRODÁVÁME třetím stranám.`,
      },
      {
        heading: '4. Třetí strany a zpracovatelé údajů',
        text: `Pro poskytování služby využíváme následující dílčí zpracovatele:

Supabase (supabase.com) — databázové úložiště a autentizace. Servery v EU. Soulad s GDPR potvrzen.

Anthropic (anthropic.com) — AI model Claude pro generování odpovědí. Zprávy jsou zpracovávány přes API. Anthropic neuchovává data konverzací pro trénování modelů bez výslovného souhlasu.

Vercel (vercel.com) — hosting a nasazení aplikace. Soulad s GDPR potvrzen.

Všichni zpracovatelé podepsali Smlouvy o zpracování údajů (DPA) dle požadavků GDPR.`,
      },
      {
        heading: '5. Doba uchovávání údajů',
        text: `Údaje účtu jsou uchovávány do odstranění účtu.

Údaje konverzací jsou uchovávány 12 měsíců od poslední zprávy, poté automaticky odstraněny.

Po odstranění účtu jsou všechna přidružená data odstraněna do 30 dnů.`,
      },
      {
        heading: '6. Vaše práva podle GDPR',
        text: `Podle GDPR máte tato práva:

Právo na přístup — můžete požádat o kopii všech údajů, které o vás uchováváme.

Právo na opravu — můžete opravit nepřesné údaje.

Právo na výmaz („právo být zapomenut") — můžete požádat o odstranění všech svých údajů.

Právo na omezení zpracování — můžete nás požádat o dočasné zastavení zpracování vašich údajů.

Právo na přenositelnost údajů — můžete obdržet své údaje ve strojově čitelném formátu.

Právo vznést námitku — můžete vznést námitku proti určitým typům zpracování.

Pro uplatnění kteréhokoliv z těchto práv zašlete žádost na: privacy@dentai.app. Odpovíme do 30 dnů.`,
      },
      {
        heading: '7. Zabezpečení údajů',
        text: `Uplatňujeme tato bezpečnostní opatření:
— Šifrování v klidu i při přenosu (TLS 1.3);
— Databáze umístěné na serverech v EU;
— Přístup omezený principem nejmenších oprávnění;
— Pravidelné bezpečnostní aktualizace.

V případě narušení bezpečnosti údajů oznámíme příslušnému dozorovému úřadu do 72 hodin dle GDPR.`,
      },
      {
        heading: '8. Soubory cookie',
        text: `Používáme pouze technicky nezbytné soubory cookie pro autentizaci (Supabase session token). Nepoužíváme marketingové ani analytické cookies třetích stran.`,
      },
      {
        heading: '9. Změny zásad',
        text: `Tyto Zásady ochrany osobních údajů můžeme aktualizovat. O podstatných změnách vás informujeme e-mailem nebo prostřednictvím přehledu. Pokračování v používání služby po změnách znamená přijetí aktualizovaných zásad.`,
      },
      {
        heading: '10. Kontakt',
        text: `Dotazy ohledně ochrany osobních údajů zasílejte na:

E-mail: privacy@dentai.app
Obecné dotazy: hello@dentai.app

Pokud se domníváte, že byla porušena vaše práva, máte právo podat stížnost u dozorového úřadu pro ochranu osobních údajů ve své zemi (v ČR: Úřad pro ochranu osobních údajů, uoou.cz).`,
      },
    ],
  },
}

export default function PrivacyPage() {
  const [lang, setLang] = useState<Lang>('uk')
  const t = CONTENT[lang]

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Nav */}
      <nav className="border-b border-slate-100 sticky top-0 bg-white/95 backdrop-blur-sm z-10">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">D</span>
            </div>
            <span className="font-bold text-slate-900">DentAI</span>
          </Link>
          <div className="flex items-center gap-4">
            {/* Lang switcher */}
            <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden text-xs font-semibold">
              {(['uk', 'en', 'cz'] as Lang[]).map((l, i) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1.5 transition-colors ${l === lang ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-700'} ${i > 0 ? 'border-l border-slate-200' : ''}`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <Link href="/" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              {t.backHome}
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
            <Shield className="w-5 h-5 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">{t.title}</h1>
        </div>
        <p className="text-slate-400 text-sm mb-10 ml-[52px]">{t.updated}</p>

        {/* Sections */}
        <div className="space-y-8">
          {t.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-lg font-bold text-slate-900 mb-3">{section.heading}</h2>
              <div className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                {section.text}
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-12 pt-8 border-t border-slate-100 flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0">
            <Shield className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-sm text-slate-500">
            {lang === 'uk' && 'Сервери в ЄС · GDPR-сумісно · Медичні дані захищені'}
            {lang === 'en' && 'EU servers · GDPR-compliant · Medical data protected'}
            {lang === 'cz' && 'Servery v EU · Soulad s GDPR · Zdravotní data chráněna'}
          </p>
        </div>
      </div>
    </div>
  )
}
