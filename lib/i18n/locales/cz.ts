import { LandingDict } from '../types'

export const cz: LandingDict = {
  locale: 'cz',
  currency: { symbol: 'Kč', code: 'CZK', position: 'after' },

  nav: {
    tagline: 'pro stomatologické ordinace',
    howItWorks: 'Jak to funguje',
    demo: 'Demo',
    signIn: 'Přihlásit se',
    bookDemo: 'Rezervovat demo',
    bookDemoShort: 'Demo',
  },

  hero: {
    badge: 'AI administrátor pro stomatologické ordinace',
    headlineLead: ['Když je vaše ordinace', 'zavřená — pacienti'],
    headlineHighlight: 'jdou ke konkurenci',
    subtitle:
      'DentAI odpovídá pacientům na webu, Instagramu, Telegramu a WhatsApp 24 hodin denně — a automaticky je objednává na termín.',
    pills: ['Nahradí recepční', 'Odpověď za 2 sekundy', 'Objednávání 24/7'],
    ctaPrimary: 'Získat bezplatné demo',
    ctaSecondary: 'Jak to funguje ↓',
    disclaimer: 'Prvních 14 dní zdarma · Bez vazby na kartu · Zrušení kdykoli',
    trust: ['Spuštění do 24 hodin', 'Bez technických znalostí', 'V souladu s GDPR'],
    chat: {
      name: 'Ivory Dental',
      status: 'odpovídá okamžitě',
      bubbles: [
        { role: 'ai', text: 'Dobrý den! Jak vám mohu pomoci?' },
        { role: 'user', text: 'Chtěl bych se objednat na čištění zubů. Máte volno tento týden?' },
        { role: 'ai', text: 'Samozřejmě! Je čtvrtek v 10:00 nebo pátek ve 14:30. Čištění 45 min, 1 500 Kč. Co vám vyhovuje?' },
        { role: 'user', text: 'Čtvrtek v 10:00' },
        { role: 'ai', text: 'Skvěle! Termín je zarezervován. Uveďte prosím své jméno a telefon.' },
      ],
      placeholder: 'Napište zprávu...',
      footer: '23:47 · odpověď za 2 sekundy',
    },
  },

  stats: [
    { stat: '73 %', text: 'pacientů si vybere ordinaci, která odpoví jako první', sub: 'Výzkum Harvard Medical School, 2023' },
    { stat: '4+ hod', text: 'průměrná doba odpovědi recepční na zprávu', sub: 'Do té doby si pacient objedná ke konkurenci' },
    { stat: '15–20', text: 'dotazů týdně se ztratí po zavírací době', sub: 'To je 60–80 potenciálních pacientů za měsíc' },
  ],

  problem: {
    title: 'Kolik pacientů vaše ordinace každý týden ztrácí?',
    subtitle: 'Většina majitelů stomatologií toto číslo nezná. Přitom existuje.',
    cards: [
      { label: 'Typická situace každý večer', title: 'Po 18. hodině', body: 'Pacient napsal na Instagram v 21:00. Recepční to uvidí až ráno. Do té doby se objednala ke konkurenci, která odepsala za 30 sekund.' },
      { label: 'Každodenní realita', title: 'Pomalá odpověď', body: 'I přes den je recepční zaneprázdněna — v čekárně fronta, telefon zvoní. Zpráva na Telegramu čeká 2–4 hodiny. Pacient nečeká.' },
      { label: 'Přímé finanční ztráty', title: 'Cena jednoho dotazu', body: 'Jeden ztracený pacient je 1 500–15 000 Kč podle procedury. 15 ztracených týdně = až 225 000 Kč přímých ztrát měsíčně.' },
    ],
  },

  lostTimeline: {
    title: 'Jak vaše ordinace ztrácí pacienta',
    subtitle: 'Stává se to každý večer. A vy o tom nevíte.',
    steps: [
      { time: '20:47', day: 'Pondělí', title: 'Pacient píše na WhatsApp', text: '"Dobrý večer! Chtěl bych se objednat na čištění zubů. Máte volno tento týden?"' },
      { time: '20:47', day: 'Pondělí', title: 'Recepční neodpovídá', text: 'Pracovní doba skončila v 18:00. Zpráva zůstala nepřečtena.' },
      { time: '20:51', day: 'Pondělí', title: 'Pacient hledá jinou ordinaci', text: 'Po 4 minutách bez odpovědi otevírá Google a najde konkurenci.' },
      { time: '20:55', day: 'Pondělí', title: 'Pacient se objednal ke konkurenci', text: 'Konkurence odepsala za 30 sekund. Pacient je objednán. Už se k vám nevrátí.' },
      { time: '09:12', day: 'Úterý', title: 'Vaše recepční vidí zprávu', text: 'Příliš pozdě. Pacient je u konkurence. Přišlo vás to na 1 500–15 000 Kč.' },
    ],
    lossTitle: '15–20 takových situací týdně.',
    lossText: 'To je 22 500–225 000 Kč přímých ztrát měsíčně — podle vašich cen a výkonů.',
  },

  calculator: {
    badge: 'Kalkulačka ztrát',
    title: 'Kolik peněz vaše ordinace ztrácí?',
    subtitle: 'Posuňte posuvníky a uvidíte, kolik vaše ordinace každý měsíc ztrácí kvůli nezodpovězeným dotazům.',
    callsLabel: 'Zmeškaných dotazů denně',
    callsHint: 'po zavírací době a o víkendech',
    checkLabel: 'Průměrná hodnota pacienta',
    checkHint: 'cena typické návštěvy',
    conversionNote: 'Předpokládáme, že 30 % dotazů by se objednalo, kdyby ordinace odpověděla okamžitě.',
    resultLabel: 'Každý měsíc ztrácíte',
    resultSuffix: 'ušlého příjmu',
    cta: 'Zastavit ztráty — rezervovat demo',
    callsMin: 1, callsMax: 50, callsDefault: 5, callsStep: 1,
    checkMin: 1000, checkMax: 15000, checkDefault: 4000, checkStep: 500,
  },

  flow: {
    title: 'Jak to funguje s DentAI',
    subtitle: 'Stejný pacient. Jiný výsledek.',
    steps: [
      { title: 'Pacient píše', sub: 'WhatsApp / Instagram / Web', time: null },
      { title: 'AI odpovídá', sub: 'okamžitě, 24/7', time: '2 s' },
      { title: 'Upřesní potřebu', sub: 'výkon, datum, čas', time: '30 s' },
      { title: 'Objedná pacienta', sub: 'vybere vhodný termín', time: '1 min' },
      { title: 'Termín potvrzen', sub: 'pacient dostane potvrzení', time: null },
    ],
    benefits: ['Bez zapojení recepční', 'Kdykoli — i ve 3 v noci', 'Pacient objednán, ne ztracen'],
  },

  howItWorks: {
    title: 'Jak to funguje',
    subtitle: 'Tři kroky a vaše ordinace nezmešká žádný dotaz',
    steps: [
      { title: 'Připojíme kanály', body: 'Instagram, Telegram, WhatsApp, Viber, Facebook a chat na webu — vše připojíme za vás. Trvá to 1 den.' },
      { title: 'Natrénujeme na datech ordinace', body: 'Nahrajete ceník, rozvrh a popis služeb. AI se naučí odpovídat jako vaše nejlepší recepční.' },
      { title: 'Ordinace funguje 24/7', body: 'AI odpovídá pacientům, objednává na termíny, přeobjednává. Všechny dialogy vidíte v přehledu.' },
    ],
  },

  dashboard: {
    title: 'Jeden přehled — plná kontrola',
    subtitle: 'Všechny dialogy, objednávky a analytika — na jednom místě.',
    nav: ['Dialogy', 'Analytika', 'Znalostní báze', 'Nastavení'],
    stats: [
      { label: 'Dialogů dnes', value: '24', delta: '+6' },
      { label: 'Nových objednání', value: '11', delta: '+3' },
      { label: 'Zpracováno AI', value: '22', delta: '92 %' },
      { label: 'Zmeškáno', value: '0', delta: '—' },
    ],
    dialogsTitle: 'Poslední dialogy',
    dialogsTime: 'dnes, 14:32',
    dialogs: [
      { name: 'Marina K.', preview: 'Chtěla bych se objednat na čištění...', status: 'Objednána' },
      { name: 'Andrij P.', preview: 'Kolik stojí implantát?', status: 'Zodpovězeno' },
      { name: 'Olena V.', preview: 'Dobrý den! Chci přesunout termín...', status: 'Nový' },
      { name: 'Dmytro L.', preview: 'Děkuji, vše jasné!', status: 'Objednán' },
      { name: 'Martin N.', preview: 'Dobrý den, mám dotaz na cenu...', status: 'Zodpovězeno' },
    ],
    ctaTitle: 'Chcete to vidět ve své ordinaci?',
    ctaText: 'Spustíme demo s vašimi službami a cenami.',
    ctaButton: 'Rezervovat demo',
  },

  channels: {
    title: 'Všechny kanály, kde píší pacienti',
    subtitle: 'Instagram, Telegram, WhatsApp, Viber, Facebook a chat na webu — připojíme je všechny.',
    names: ['Instagram', 'Facebook', 'Telegram', 'WhatsApp', 'Viber', 'Web'],
    ctaTitle: 'Vaši pacienti jsou tam.',
    ctaText: '67 % dotazů do ordinací přichází přes messengery a sociální sítě — ne telefonem.',
    ctaButton: 'Připojit ordinaci',
  },

  demo: {
    badge: 'Vyzkoušejte hned teď',
    title: 'Živé demo AI administrátora',
    subtitle: 'Toto je skutečné AI — stejné, které nainstalujete ve své ordinaci. Napište mu jako pacient: zeptejte se na ceny, objednejte se nebo přesuňte termín.',
    bullets: ['Odpovídá za 2–3 sekundy', 'Mluví česky, ukrajinsky, anglicky', 'Nabízí konkrétní termíny', 'Nikdy neodmítne a je vždy zdvořilé'],
  },

  scenarios: {
    title: 'Reálné scénáře',
    subtitle: 'Co AI dělá každý den ve vaší ordinaci',
    items: [
      { tag: 'Objednání na čištění', patient: 'Dobrý den! Chtěl(a) bych se objednat na profesionální čištění zubů. Máte volné termíny tento týden?', ai: 'Samozřejmě! Nejbližší volné termíny jsou zítra v 10:00 nebo ve čtvrtek ve 14:30. Čištění trvá 45 minut, cena 1 500 Kč. Který termín vám vyhovuje?' },
      { tag: 'Cena implantátů', patient: 'Zajímám se o zubní implantát. Kolik to u vás stojí?', ai: 'Implantát včetně korunky začíná od 20 000 Kč. Přesná cena závisí na klinickém stavu. Objednejte se na bezplatnou konzultaci — lékař posoudí situaci a sdělí vám přesnou cenu.' },
      { tag: 'Přeobjednání', patient: 'Mám termín v pátek ve 15:00. Mohu ho přesunout na příští týden?', ai: 'Samozřejmě! Pátek v 15:00 jsem zrušila. Příští týden mám úterý v 11:00 nebo středu ve 16:30. Co vám vyhovuje?' },
      { tag: 'Noční dotaz', patient: 'Bolí mě zub, je 23:00. Co mám dělat? Máte pohotovostní termíny?', ai: 'Rozumím, to musí být nepříjemné. Na zítra je k dispozici pohotovostní termín v 9:00. Pokud je bolest velmi silná — vezměte analgetikum a zavolejte na pohotovostní linku: +420 XXX XXX XXX.' },
    ],
  },

  results: {
    title: 'Co vaše ordinace získá',
    subtitle: 'Konkrétní výsledky, ne abstraktní sliby',
    items: [
      { value: '+38 %', label: 'více objednání za měsíc' },
      { value: '< 3 s', label: 'doba odpovědi pacientovi' },
      { value: '0', label: 'zmeškaných dotazů' },
      { value: '24/7', label: 'bez dovolených a svátků' },
    ],
  },

  testimonials: {
    title: 'Co říkají ordinace',
    subtitle: 'Skutečné reference od majitelů stomatologií',
    items: [
      { name: 'Martin Novák', role: 'Hlavní lékař', clinic: 'DentalCare Praha', text: 'Naše recepční zpracovávaly 80+ zpráv denně. Nyní AI zvládá 90 % dotazů automaticky. Obsazenost ordinace vzrostla o 35 % za 6 týdnů. Nejlepší investice za poslední rok.', initials: 'MN' },
      { name: 'Petra Horáková', role: 'Majitelka ordinace', clinic: 'Smile Studio Brno', text: 'Ztratit pacienta jen proto, že nepřijmeme zprávu po 18. hodině, je frustrující. DentAI to vyřešil okamžitě. Nyní dostávám ráno hotový seznam objednaných pacientů z večera.', initials: 'PH' },
      { name: 'Tomáš Dvořák', role: 'Ředitel sítě', clinic: 'DentalGroup — 4 ordinace', text: 'Nasadili jsme DentAI do všech čtyř ordinací najednou. Integrace s naším rezervačním systémem trvala jeden den. Konverze z Instagramu se zvýšila dvojnásobně.', initials: 'TD' },
    ],
  },

  pricing: {
    title: 'Přehledný ceník',
    subtitle: 'Recepční stojí 35 000–60 000 Kč/měsíc. My stojíme 10–30× méně.',
    footnote: 'Nejste si jistí, který plán je pro vás? Kontaktujte nás — vybereme společně.',
    plans: [
      { name: 'Start', price: '1 990 Kč', period: '/měs', desc: 'Pro jednu ordinaci', features: ['1 AI administrátor', '2 kanály (web + 1 messenger)', '500 dialogů/měs', 'Objednávání na termíny', 'Podpora 9–18'], highlight: false, cta: 'Rezervovat demo', ctaHref: '/register', trialNote: '14 dní zdarma — bez karty' },
      { name: 'Ordinace', price: '4 490 Kč', period: '/měs', desc: 'Nejoblíbenější volba', features: ['1 AI administrátor', 'Všech 6 kanálů', '3 000 dialogů/měs', 'Objednání + přeobjednání + zrušení', 'Analytika a reporty', 'Podpora 24/7'], highlight: true, cta: 'Rezervovat demo', ctaHref: '/register', popularBadge: 'Nejoblíbenější', trialNote: '14 dní zdarma — bez karty' },
      { name: 'Síť', price: 'od 8 990 Kč', period: '/měs', desc: 'Pro sítě ordinací', features: ['Až 5 ordinací', 'Všechny kanály', 'Neomezené dialogy', 'Osobní manažer', 'Vlastní integrace', 'SLA'], highlight: false, cta: 'Kontaktovat nás', ctaHref: '/contact' },
    ],
  },

  trust: [
    { title: 'V souladu s GDPR', body: 'Data pacientů jsou uložena na šifrovaných serverech v EU. Plný soulad s legislativou o zdravotní dokumentaci v ČR i EU.' },
    { title: 'Bezpečnost dat', body: 'Data vaší ordinace a pacientů nejsou nikdy sdílena s třetími stranami ani používána k trénování modelů.' },
    { title: 'Plná kontrola', body: 'Vždy vidíte všechny dialogy. Můžete kdykoli zasáhnout, opravit nebo změnit nastavení.' },
  ],

  faq: {
    title: 'Časté otázky',
    subtitle: 'Odpovědi na otázky, které kladou majitelé ordinací',
    items: [
      { q: 'Odpovídá AI česky a ukrajinsky?', a: 'Ano. AI automaticky rozpozná jazyk pacienta a odpovídá česky, ukrajinsky, anglicky nebo v jiném jazyce. Pro svoji ordinaci si také můžete nastavit výchozí jazyk komunikace.' },
      { q: 'Jak dlouho trvá nastavení systému?', a: 'Většina ordinací zahájí provoz do 24 hodin. Náš tým se postará o vše — poskytnete informace o ordinaci, službách a cenách, my uděláme zbytek.' },
      { q: 'Může AI skutečně objednávat pacienty?', a: 'Ano. AI se integruje s vaším rezervačním systémem a dokáže samostatně objednávat, přeobjednávat nebo rušit schůzky bez zapojení recepční.' },
      { q: 'Co se stane, když má pacient naléhavý problém?', a: 'V urgentních situacích AI okamžitě sdělí číslo pohotovostního lékaře a adresu ordinace. Vy sami nastavujete pravidla eskalace — například přeposílání zpráv recepční nebo lékaři.' },
      { q: 'Je systém v souladu s GDPR?', a: 'Ano. Všechna data pacientů jsou uložena na šifrovaných serverech v EU a zpracována v plném souladu s GDPR. Nikdy nepředáváme zdravotní data třetím stranám ani je nepoužíváme k trénování modelů.' },
      { q: 'S jakými kanály systém pracuje?', a: 'Chat widget na webu, Instagram Direct, Facebook Messenger, Telegram, WhatsApp a Viber — vše ovládáte z jednoho přehledu. Pacient píše, kde mu to vyhovuje, vy vidíte vše na jednom místě.' },
      { q: 'Mohu kontrolovat, co AI říká?', a: 'Plně. Nahrajete znalostní databázi — služby, ceny, podmínky, rozvrh. AI odpovídá pouze na základě vašich informací. Pokud něco neví, zdvořile odkáže pacienta na recepci.' },
    ],
  },

  finalCta: {
    eyebrow: 'Připraveni zastavit ztráty pacientů?',
    title: ['Objednejte bezplatné demo', 'pro vaši ordinaci'],
    subtitle: '15minutový hovor. Ukážeme, jak to bude vypadat ve vaší ordinaci — s vašimi kanály, vašimi cenami a rozvrhem.',
    ctaPrimary: 'Objednat demo zdarma',
    ctaSecondary: 'Vyzkoušet demo ↑',
    disclaimer: 'Bez vazby na kartu · Spuštění do 24 hodin · Zrušení kdykoli',
  },

  footer: {
    tagline: 'AI administrátor pro stomatologické ordinace na Ukrajině a v České republice.',
    howItWorks: 'Jak to funguje',
    demo: 'Demo',
    signIn: 'Přihlásit se',
    bookDemo: 'Rezervovat demo',
    email: 'hello@dentai.app',
    privacy: 'Ochrana osobních údajů',
    copyright: '© 2026 DentAI. Všechna práva vyhrazena.',
    badges: 'Servery EU · GDPR · Zdravotní data chráněna',
  },

  demoChat: {
    initial: 'Dobrý den! Jsem AI administrátor ordinace Ivory Dental. Mohu vám zarezervovat schůzku a odpovědět na otázky o našich službách a cenách. Jak vám mohu pomoci?',
    quickActions: [
      { label: 'Objednat se', message: 'Chci si objednat termín' },
      { label: 'Zjistit ceny', message: 'Jaké jsou vaše ceny za služby?' },
      { label: 'Přeobjednat', message: 'Chci přesunout svůj termín' },
    ],
    placeholder: 'Napište zprávu...',
    online: 'odpovídá okamžitě',
    error: 'Něco se pokazilo. Zkuste to prosím znovu.',
    tooltip: 'Vyzkoušejte AI administrátora 👋',
  },
}
