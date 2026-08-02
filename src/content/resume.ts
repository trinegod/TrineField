import type { Locale } from "./translations";

type ResumeRole = {
  company: string;
  title: string;
  location: string;
  dates: string;
  bullets: string[];
};

type ResumeProject = {
  title: string;
  meta: string;
  description: string;
  links?: { label: string; href: string }[];
};

type AdditionalRole = {
  company: string;
  title: string;
  location: string;
  dates: string;
  description: string;
};

export type ResumeCopy = {
  pageTitle: string;
  kicker: string;
  headline: string;
  back: string;
  originalPdf: string;
  print: string;
  translationNote: string;
  summaryLabel: string;
  summary: string;
  expertiseLabel: string;
  expertise: string[];
  experienceLabel: string;
  experience: ResumeRole[];
  projectsLabel: string;
  projects: ResumeProject[];
  additionalLabel: string;
  additional: AdditionalRole[];
  technologyLabel: string;
  technology: string;
  educationLabel: string;
  education: string[];
  sourceLabel: string;
};

export const resumeProfile = {
  name: "Steven Adkins",
  location: "Mesa, AZ",
  phoneDisplay: "(916) 287-5897",
  phoneHref: "tel:+19162875897",
  email: "stevenadkins917@gmail.com",
  emailHref: "mailto:stevenadkins917@gmail.com",
  linkedin: "https://www.linkedin.com/in/kidpluto/",
  github: "https://github.com/trinegod",
  portfolio: "https://fvck-art-gallery.vercel.app/",
  originalPdf: "/steven-adkins-master-resume.pdf",
} as const;

export const resumeTranslations: Record<Locale, ResumeCopy> = {
  en: {
    pageTitle: "Steven Adkins - Professional Resume",
    kicker: "Steven Adkins / Master Resume",
    headline: "U.S.-Market Creative & Product Operator / AI-Assisted Product Development / B2B Partnerships / Customer Experience & Operations / International Brand Strategy / English & Spanish",
    back: "Back to Trine",
    originalPdf: "Open original PDF",
    print: "Print / Save translated PDF",
    translationNote: "This page is a translated presentation of Steven Adkins's English master resume. The original PDF remains the authoritative source.",
    summaryLabel: "Professional Summary",
    summary: "Product, operations, customer experience, UX/UI, and B2B partnerships professional with 15+ years of experience across consumer technology, SaaS, live commerce, digital health, knowledge management, quality assurance, and workflow improvement. Combines frontline operational insight with AI-assisted product development, user-centered UX/UI design, B2B partner communication, process improvement, and U.S.-market/customer understanding. Bilingual English/Spanish with hands-on experience designing, building, and deploying digital products and creative AI workflows.",
    expertiseLabel: "Core Expertise",
    expertise: ["Product Operations", "UX/UI Design & Prototyping", "AI-Assisted Product Development", "Customer Experience Strategy", "B2B Partnerships & Partner Communication", "Workflow & Process Design", "Knowledge Management", "Quality Assurance & Coaching", "Cross-Functional Operations", "U.S. Market Strategy", "Generative AI & Prompting", "Technical Troubleshooting", "Operational Reporting", "Brand & Product Education"],
    experienceLabel: "Professional Experience",
    experience: [
      {
        company: "Neura Health",
        title: "Activation Specialist / B2B Partnerships & CX Operations",
        location: "Tempe, AZ",
        dates: "Sep 2025 - Present",
        bullets: [
          "Manage high-volume, multi-channel patient activation workflows across phone, SMS, and email, guiding patients from referral and intake through benefits review and first-visit scheduling.",
          "Manage day-to-day B2B partner relationships and cross-organizational communication across health systems, employer partners, concussion/brain injury programs, and PI/legal referral channels, resolving workflow issues and coordinating eligibility, clinical routing, licensure, scheduling, and handoffs.",
          "Provide bilingual English/Spanish support across onboarding, appointment logistics, insurance expectations, self-pay options, superbill guidance, and other activation barriers.",
          "Maintain accurate EHR, referral-platform, tracker, and shared-workflow documentation to strengthen handoffs, follow-up ownership, and operational visibility.",
          "Identify recurring friction across referral intake, scheduling, cancellations, patient communication, and cross-functional ownership; surface process improvements that reduce manual back-and-forth and strengthen continuity.",
        ],
      },
      {
        company: "Ro",
        title: "Tier 2 Customer Support Agent",
        location: "Mesa, AZ",
        dates: "Jun 2024 - Sep 2025",
        bullets: [
          "Managed high-volume Tier 2 cases through Zendesk, phone, and digital support channels across account, subscription, medication, billing, delivery, and platform issues.",
          "Troubleshot product and app issues, documenting recurring bugs, user friction, and product feedback for escalation to technical and development teams.",
          "Coordinated clinical and non-clinical routing, insurance and benefits questions, verification workflows, and external prior-authorization support.",
          "Resolved complex billing, subscription, and fulfillment cases while balancing customer experience, care continuity, and operational requirements.",
          "Identified recurring pain points across product usability, billing, fulfillment, subscriptions, and care coordination to support stronger workflows and service delivery.",
        ],
      },
      {
        company: "Whatnot",
        title: "Customer Experience Agent",
        location: "Mesa, AZ",
        dates: "Jun 2023 - Jul 2024",
        bullets: [
          "Resolved complex buyer and seller marketplace issues and technical anomalies, escalating reproducible bugs and user-impacting problems to internal development teams.",
          "Used AI prompting and generative AI tools to support research, drafting, problem-solving, and workflow efficiency while applying independent judgment to customer-facing decisions.",
          "Conducted QA reviews, coaching, and performance monitoring across CSAT, resolution quality, productivity, time adherence, and other KPIs; mentored and trained agents.",
          "Analyzed operational reporting and partnered with outsourced Tier 1 and Trust & Safety teams to reinforce SOP compliance, escalation quality, platform policy, and service performance.",
        ],
      },
      {
        company: "Wix.com",
        title: "Knowledge Base Writer / Customer Support Specialist",
        location: "Miami Beach, FL",
        dates: "Jan 2018 - Sep 2022",
        bullets: [
          "Researched new Wix products and features and wrote, published, and maintained customer-facing Knowledge Base content, using performance data and product changes to revise or retire outdated articles.",
          "Provided advanced technical support across websites, domains, billing, payments, email services, SEO, and digital commerce, resolving complex issues or escalating defects to development and Quality Assurance teams.",
          "Managed escalations and supported agents with difficult technical, billing, verification, and account cases; communicated product updates and operational changes across the team.",
          "Helped scale outsourced support operations and identified recurring product/customer friction to improve documentation, workflows, and customer experience.",
        ],
      },
    ],
    projectsLabel: "Selected Product & AI Projects",
    projects: [
      {
        title: "NODEINE - Founder, Product Designer & Full-Stack Developer",
        meta: "UX/UI Design, Next.js, TypeScript, Supabase, Vercel",
        description: "Designed the end-to-end UX/UI and developed an interactive archive for AI-generated visual worlds and characters, including information architecture, responsive collection browsing, creator profiles, artwork discussions, and administrative publishing workflows.",
        links: [{ label: "Live portfolio", href: "https://fvck-art-gallery.vercel.app/" }, { label: "Source code", href: "https://github.com/trinegod/Fvck-Art-Gallery" }],
      },
      {
        title: "Patient Recovery OS - Independent Product Prototype",
        meta: "AI-Assisted Product & UX/UI Design",
        description: "Designed an interactive care-operations dashboard and guided product walkthrough, organizing patient progress, surfacing actionable information, and translating complex workflows into clear, user-centered UX/UI concepts.",
      },
      {
        title: "AI Film Direction & Creative Production - Higgsfield / Independent Projects",
        meta: "Narrative, Storyboards, Cinematic Direction",
        description: "Directed Black Moon and Of The Streets from original illustrations, developing narrative structure, storyboards, cinematic shot direction, character continuity, image-to-video prompts, dialogue planning, and vertical social-media deliverables.",
      },
    ],
    additionalLabel: "Additional Experience",
    additional: [
      { company: "Sony", title: "Photographer / Digital Imaging Specialist", location: "Miami, FL", dates: "Oct 2015 - Dec 2017", description: "Led photography workshops and consumer-electronics demonstrations; trained Best Buy teams, supported sales enablement and in-store brand execution, and reported competitive intelligence." },
      { company: "Tabas, Freedman, P.A.", title: "Paralegal / Office Assistant", location: "Miami, FL", dates: "Feb 2012 - Sep 2015", description: "Supported legal research and document workflows using Westlaw and TCMS; prepared e-files, petitions, amended schedules, asset valuations, case records, and deadline-driven administrative operations." },
      { company: "Best Buy", title: "Geek Squad", location: "Miami, FL", dates: "Nov 2010 - Feb 2012", description: "Diagnosed and repaired computer hardware and provided consultative technology sales, product education, service/protection recommendations, and merchandising support." },
    ],
    technologyLabel: "Technology & Tools",
    technology: "UX/UI design and prototyping, Generative AI, prompt engineering, Next.js, React, TypeScript, Tailwind CSS, Supabase, GitHub, Vercel, Zendesk, Slack, Google Workspace, CRM/EHR and referral platforms, knowledge bases, Westlaw, TCMS",
    educationLabel: "Education, Credentials & Languages",
    education: ["Florida International University - BA, Computer and Information Sciences and Support Services", "Google Cybersecurity Certificate", "Languages: English (bilingual/native), Spanish (bilingual/native), Japanese (elementary)"],
    sourceLabel: "Source: Steven Adkins Master Resume / Updated August 2026",
  },
  es: {
    pageTitle: "Steven Adkins - Currículum profesional",
    kicker: "Steven Adkins / Currículum maestro",
    headline: "Operador creativo y de producto para el mercado estadounidense / Desarrollo de producto asistido por IA / Alianzas B2B / Experiencia del cliente y operaciones / Estrategia internacional de marca / Inglés y español",
    back: "Volver a Trine",
    originalPdf: "Abrir PDF original",
    print: "Imprimir / Guardar PDF traducido",
    translationNote: "Esta página es una presentación traducida del currículum maestro en inglés de Steven Adkins. El PDF original sigue siendo la fuente oficial.",
    summaryLabel: "Resumen profesional",
    summary: "Profesional de producto, operaciones, experiencia del cliente, UX/UI y alianzas B2B con más de 15 años de experiencia en tecnología de consumo, SaaS, comercio en vivo, salud digital, gestión del conocimiento, control de calidad y mejora de flujos de trabajo. Combina experiencia operativa de primera línea con desarrollo de producto asistido por IA, diseño UX/UI centrado en el usuario, comunicación con socios B2B, mejora de procesos y conocimiento del mercado y cliente estadounidense. Bilingüe en inglés y español, con experiencia práctica diseñando, construyendo e implementando productos digitales y flujos creativos de IA.",
    expertiseLabel: "Áreas principales",
    expertise: ["Operaciones de producto", "Diseño y prototipado UX/UI", "Desarrollo de producto asistido por IA", "Estrategia de experiencia del cliente", "Alianzas B2B y comunicación con socios", "Diseño de flujos y procesos", "Gestión del conocimiento", "Control de calidad y coaching", "Operaciones multifuncionales", "Estrategia para el mercado estadounidense", "IA generativa y prompting", "Diagnóstico técnico", "Informes operativos", "Educación de marca y producto"],
    experienceLabel: "Experiencia profesional",
    experience: [
      {
        company: "Neura Health",
        title: "Especialista de activación / Alianzas B2B y operaciones de CX",
        location: "Tempe, AZ",
        dates: "sep 2025 - actualidad",
        bullets: [
          "Gestiona flujos de activación de pacientes de alto volumen por teléfono, SMS y correo, guiándolos desde la referencia y admisión hasta la revisión de beneficios y programación de la primera visita.",
          "Gestiona relaciones diarias con socios B2B y comunicación entre organizaciones, incluidos sistemas de salud, empleadores, programas de conmoción cerebral o lesión cerebral y canales de referencia legal, resolviendo problemas de flujo y coordinando elegibilidad, derivación clínica, licencias, programación y transferencias.",
          "Ofrece atención bilingüe en inglés y español para incorporación, logística de citas, expectativas de seguro, opciones de pago directo, orientación sobre superbills y otras barreras de activación.",
          "Mantiene documentación precisa en EHR, plataformas de referencia, registros de seguimiento y flujos compartidos para fortalecer las transferencias, la responsabilidad de seguimiento y la visibilidad operativa.",
          "Identifica fricciones recurrentes en admisión, programación, cancelaciones, comunicación con pacientes y responsabilidad multifuncional; propone mejoras que reducen tareas manuales y fortalecen la continuidad.",
        ],
      },
      {
        company: "Ro",
        title: "Agente de atención al cliente Nivel 2",
        location: "Mesa, AZ",
        dates: "jun 2024 - sep 2025",
        bullets: [
          "Gestionó casos de Nivel 2 de alto volumen mediante Zendesk, teléfono y canales digitales sobre cuentas, suscripciones, medicamentos, facturación, entregas y problemas de plataforma.",
          "Diagnosticó problemas de producto y aplicación, documentando errores recurrentes, fricción de usuario y comentarios para escalar a equipos técnicos y de desarrollo.",
          "Coordinó derivaciones clínicas y no clínicas, preguntas sobre seguros y beneficios, flujos de verificación y apoyo externo para autorizaciones previas.",
          "Resolvió casos complejos de facturación, suscripciones y cumplimiento equilibrando experiencia del cliente, continuidad de atención y requisitos operativos.",
          "Identificó problemas recurrentes de usabilidad, facturación, cumplimiento, suscripciones y coordinación de atención para mejorar flujos y servicio.",
        ],
      },
      {
        company: "Whatnot",
        title: "Agente de experiencia del cliente",
        location: "Mesa, AZ",
        dates: "jun 2023 - jul 2024",
        bullets: [
          "Resolvió problemas complejos de compradores y vendedores y anomalías técnicas, escalando errores reproducibles y problemas con impacto en usuarios a equipos internos de desarrollo.",
          "Utilizó prompting y herramientas de IA generativa para investigación, redacción, resolución de problemas y eficiencia de flujos, aplicando criterio independiente en decisiones de cara al cliente.",
          "Realizó revisiones de calidad, coaching y monitoreo de CSAT, calidad de resolución, productividad, adherencia de tiempo y otros KPI; orientó y capacitó a agentes.",
          "Analizó informes operativos y colaboró con equipos externos de Nivel 1 y Trust & Safety para reforzar SOP, calidad de escalaciones, políticas de plataforma y desempeño del servicio.",
        ],
      },
      {
        company: "Wix.com",
        title: "Redactor de base de conocimiento / Especialista de atención al cliente",
        location: "Miami Beach, FL",
        dates: "ene 2018 - sep 2022",
        bullets: [
          "Investigó nuevos productos y funciones de Wix y redactó, publicó y mantuvo contenido de la base de conocimiento, usando datos de rendimiento y cambios del producto para actualizar o retirar artículos.",
          "Brindó soporte técnico avanzado para sitios web, dominios, facturación, pagos, correo, SEO y comercio digital, resolviendo problemas complejos o escalando defectos a desarrollo y control de calidad.",
          "Gestionó escalaciones y apoyó a agentes con casos técnicos, de facturación, verificación y cuentas; comunicó novedades de producto y cambios operativos al equipo.",
          "Ayudó a ampliar operaciones externas de soporte e identificó fricciones recurrentes para mejorar documentación, flujos de trabajo y experiencia del cliente.",
        ],
      },
    ],
    projectsLabel: "Proyectos seleccionados de producto e IA",
    projects: [
      { title: "NODEINE - Fundador, diseñador de producto y desarrollador full-stack", meta: "Diseño UX/UI, Next.js, TypeScript, Supabase, Vercel", description: "Diseñó la UX/UI integral y desarrolló un archivo interactivo de mundos visuales y personajes generados con IA, incluyendo arquitectura de información, exploración adaptable de colecciones, perfiles de creadores, conversaciones sobre obras y flujos administrativos de publicación.", links: [{ label: "Portafolio en vivo", href: "https://fvck-art-gallery.vercel.app/" }, { label: "Código fuente", href: "https://github.com/trinegod/Fvck-Art-Gallery" }] },
      { title: "Patient Recovery OS - Prototipo independiente", meta: "Producto y diseño UX/UI asistidos por IA", description: "Diseñó un panel interactivo de operaciones de atención y una demostración guiada, organizando el progreso del paciente, mostrando información accionable y convirtiendo flujos complejos en conceptos UX/UI claros y centrados en el usuario." },
      { title: "Dirección cinematográfica y producción creativa con IA - Higgsfield / Proyectos independientes", meta: "Narrativa, storyboards y dirección cinematográfica", description: "Dirigió Black Moon y Of The Streets a partir de ilustraciones originales, desarrollando estructura narrativa, storyboards, dirección de planos, continuidad de personajes, prompts de imagen a video, planificación de diálogos y piezas verticales para redes sociales." },
    ],
    additionalLabel: "Experiencia adicional",
    additional: [
      { company: "Sony", title: "Fotógrafo / Especialista en imagen digital", location: "Miami, FL", dates: "oct 2015 - dic 2017", description: "Dirigió talleres de fotografía y demostraciones de electrónica de consumo; capacitó equipos de Best Buy, apoyó ventas y ejecución de marca en tiendas e informó inteligencia competitiva." },
      { company: "Tabas, Freedman, P.A.", title: "Paralegal / Asistente de oficina", location: "Miami, FL", dates: "feb 2012 - sep 2015", description: "Apoyó investigación legal y flujos documentales con Westlaw y TCMS; preparó expedientes electrónicos, peticiones, anexos modificados, valoraciones de activos, registros de casos y operaciones administrativas con plazos estrictos." },
      { company: "Best Buy", title: "Geek Squad", location: "Miami, FL", dates: "nov 2010 - feb 2012", description: "Diagnosticó y reparó hardware informático y ofreció venta consultiva de tecnología, educación de producto, recomendaciones de servicio y protección, y apoyo de merchandising." },
    ],
    technologyLabel: "Tecnología y herramientas",
    technology: "Diseño y prototipado UX/UI, IA generativa, ingeniería de prompts, Next.js, React, TypeScript, Tailwind CSS, Supabase, GitHub, Vercel, Zendesk, Slack, Google Workspace, plataformas CRM/EHR y de referencias, bases de conocimiento, Westlaw, TCMS",
    educationLabel: "Educación, credenciales e idiomas",
    education: ["Florida International University - Licenciatura en Ciencias de la Computación, Información y Servicios de Soporte", "Certificado de Ciberseguridad de Google", "Idiomas: inglés (bilingüe/nativo), español (bilingüe/nativo), japonés (elemental)"],
    sourceLabel: "Fuente: currículum maestro de Steven Adkins / Actualizado en agosto de 2026",
  },
  "zh-CN": {
    pageTitle: "Steven Adkins - 专业履历",
    kicker: "Steven Adkins / 完整履历",
    headline: "美国市场创意与产品运营 / AI 辅助产品开发 / B2B 合作伙伴关系 / 客户体验与运营 / 国际品牌战略 / 英语与西班牙语",
    back: "返回 Trine",
    originalPdf: "打开英文原版 PDF",
    print: "打印 / 保存中文 PDF",
    translationNote: "本页面是 Steven Adkins 英文完整履历的中文呈现。英文原版 PDF 为权威来源。",
    summaryLabel: "职业概述",
    summary: "拥有 15 年以上产品、运营、客户体验、UX/UI 与 B2B 合作经验，涉及消费科技、SaaS、直播电商、数字健康、知识管理、质量保证和工作流程改进。将一线运营洞察与 AI 辅助产品开发、以用户为中心的 UX/UI 设计、B2B 合作伙伴沟通、流程优化以及美国市场与客户理解相结合。能以英语和西班牙语双语工作，并具备设计、构建和部署数字产品与创意 AI 工作流程的实践经验。",
    expertiseLabel: "核心专长",
    expertise: ["产品运营", "UX/UI 设计与原型", "AI 辅助产品开发", "客户体验战略", "B2B 合作与伙伴沟通", "工作流程与流程设计", "知识管理", "质量保证与辅导", "跨职能运营", "美国市场战略", "生成式 AI 与提示词设计", "技术故障排查", "运营报告", "品牌与产品教育"],
    experienceLabel: "职业经历",
    experience: [
      {
        company: "Neura Health",
        title: "患者激活专员 / B2B 合作与客户体验运营",
        location: "亚利桑那州坦佩",
        dates: "2025 年 9 月 - 至今",
        bullets: [
          "通过电话、短信和电子邮件管理高容量、多渠道患者激活流程，引导患者完成转诊、登记、福利审核和首次就诊预约。",
          "负责医疗系统、雇主合作伙伴、脑震荡或脑损伤项目以及人身伤害和法律转诊渠道的日常 B2B 关系与跨组织沟通，解决流程问题并协调资格、临床分流、执照要求、预约和交接。",
          "以英语和西班牙语提供入门、预约安排、保险预期、自费方案、费用报销单指导及其他激活障碍方面的双语支持。",
          "维护准确的电子健康记录、转诊平台、跟踪表和共享流程文档，强化交接、后续责任和运营可见性。",
          "识别转诊登记、预约、取消、患者沟通和跨职能责任中的重复摩擦，提出减少人工往返并提高连续性的流程改进。",
        ],
      },
      {
        company: "Ro",
        title: "二级客户支持专员",
        location: "亚利桑那州梅萨",
        dates: "2024 年 6 月 - 2025 年 9 月",
        bullets: [
          "通过 Zendesk、电话和数字支持渠道处理大量二级支持案例，覆盖账户、订阅、药物、账单、配送和平台问题。",
          "排查产品和应用问题，记录重复缺陷、用户摩擦和产品反馈，并升级至技术与开发团队。",
          "协调临床与非临床分流、保险和福利问题、验证流程以及外部事前授权支持。",
          "在兼顾客户体验、护理连续性和运营要求的同时，解决复杂账单、订阅和履约问题。",
          "识别产品可用性、账单、履约、订阅和护理协调中的重复痛点，支持更有效的工作流程与服务交付。",
        ],
      },
      {
        company: "Whatnot",
        title: "客户体验专员",
        location: "亚利桑那州梅萨",
        dates: "2023 年 6 月 - 2024 年 7 月",
        bullets: [
          "解决复杂的买卖双方市场问题和技术异常，将可复现缺陷及影响用户的问题升级至内部开发团队。",
          "运用 AI 提示词和生成式 AI 工具支持研究、写作、问题解决与流程效率，同时在面向客户的决策中保持独立判断。",
          "开展质量审核、辅导和绩效监控，涵盖 CSAT、解决质量、生产率、时间遵守情况及其他 KPI，并指导和培训员工。",
          "分析运营报告，并与外包一级支持和 Trust & Safety 团队合作，加强标准流程合规、升级质量、平台政策和服务表现。",
        ],
      },
      {
        company: "Wix.com",
        title: "知识库撰稿人 / 客户支持专员",
        location: "佛罗里达州迈阿密海滩",
        dates: "2018 年 1 月 - 2022 年 9 月",
        bullets: [
          "研究 Wix 新产品与功能，撰写、发布和维护面向客户的知识库内容，并根据表现数据和产品变化更新或下线旧文章。",
          "为网站、域名、账单、支付、电子邮件服务、SEO 和数字商务提供高级技术支持，解决复杂问题或将缺陷升级至开发与质量保证团队。",
          "管理升级案例并协助员工处理复杂技术、账单、验证和账户问题；向团队传达产品更新与运营变化。",
          "协助扩展外包支持运营，识别重复的产品和客户摩擦，以改进文档、工作流程和客户体验。",
        ],
      },
    ],
    projectsLabel: "精选产品与 AI 项目",
    projects: [
      { title: "NODEINE - 创始人、产品设计师与全栈开发者", meta: "UX/UI 设计、Next.js、TypeScript、Supabase、Vercel", description: "完成端到端 UX/UI 设计，并开发 AI 生成视觉世界与角色的互动档案，包括信息架构、响应式作品浏览、创作者主页、作品讨论和后台发布流程。", links: [{ label: "在线作品集", href: "https://fvck-art-gallery.vercel.app/" }, { label: "源代码", href: "https://github.com/trinegod/Fvck-Art-Gallery" }] },
      { title: "Patient Recovery OS - 独立产品原型", meta: "AI 辅助产品与 UX/UI 设计", description: "设计互动式护理运营仪表板和产品引导演示，组织患者进展、呈现可执行信息，并将复杂工作流程转化为清晰、以用户为中心的 UX/UI 概念。" },
      { title: "AI 电影导演与创意制作 - Higgsfield / 独立项目", meta: "叙事、故事板与电影化指导", description: "以原创插画为基础执导 Black Moon 和 Of The Streets，完成叙事结构、故事板、电影镜头指导、角色连续性、图生视频提示词、对白规划和竖屏社交媒体内容。" },
    ],
    additionalLabel: "其他经历",
    additional: [
      { company: "Sony", title: "摄影师 / 数字影像专家", location: "佛罗里达州迈阿密", dates: "2015 年 10 月 - 2017 年 12 月", description: "主持摄影工作坊和消费电子演示；培训 Best Buy 团队，支持销售赋能与店内品牌执行，并报告竞争情报。" },
      { company: "Tabas, Freedman, P.A.", title: "律师助理 / 办公室助理", location: "佛罗里达州迈阿密", dates: "2012 年 2 月 - 2015 年 9 月", description: "使用 Westlaw 和 TCMS 支持法律研究与文档流程；准备电子归档、申请、修订表格、资产估值、案件记录以及有严格期限的行政工作。" },
      { company: "Best Buy", title: "Geek Squad", location: "佛罗里达州迈阿密", dates: "2010 年 11 月 - 2012 年 2 月", description: "诊断和维修计算机硬件，并提供顾问式科技销售、产品教育、服务与保障建议以及陈列支持。" },
    ],
    technologyLabel: "技术与工具",
    technology: "UX/UI 设计与原型、生成式 AI、提示词工程、Next.js、React、TypeScript、Tailwind CSS、Supabase、GitHub、Vercel、Zendesk、Slack、Google Workspace、CRM/EHR 与转诊平台、知识库、Westlaw、TCMS",
    educationLabel: "教育、证书与语言",
    education: ["Florida International University - 计算机与信息科学及支持服务学士", "Google 网络安全证书", "语言：英语（双语/母语水平）、西班牙语（双语/母语水平）、日语（初级）"],
    sourceLabel: "来源：Steven Adkins 完整履历 / 2026 年 8 月更新",
  },
};
