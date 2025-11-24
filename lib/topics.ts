export type Contact = {
  title: string;
  lines: string[];
};

export type Complaint = {
  author: string;
  time: string;
  text: string;
};

export type Comment = {
  id: string;
  author: {
    id: string;
    name: string;
  };
  text: string;
  accent?: string;
  createdAt: string;
};

export type Topic = {
  id: string;
  title: string;
  summary: string;
  priority: "Alta" | "Média" | "Baixa";
  status: string;
  statusKind: "progress" | "politician" | "unresolved";
  category: string;
  tags: string[];
  complaintsTotal: number;
  supportCount: number;
  rejectCount: number;
  scope: "NEIGHBORHOOD" | "CITY" | "STATE" | "COUNTRY";
  location: {
    state: string;
    city?: string;
    neighborhood?: string;
  };
  createdAt: string;
  lastComplaintAt: string;
  exampleComplaints?: Complaint[];
  contacts?: Contact[];
  comments: Comment[];
  peopleAffected: number;
  socialImpact: "Baixo" | "Médio" | "Alto";
  detailedDescription: string[];
  impactMetric?: {
    label: string;
    value: number;
    description: string;
  };
};

export type TopicsFilters = {
  category: string;
  state: string;
  city: string;
  search: string;
};

export const topicSeed: Topic[] = [
  {
    id: "lighting",
    title: "Falta de iluminação pública no Bairro Imperial",
    summary:
      "Moradores relatam aumento da insegurança com postes apagados e ruas completamente escuras durante a noite, dificultando deslocamentos e aumentando furtos.",
    priority: "Alta",
    status: "Em andamento",
    statusKind: "progress",
    category: "Segurança",
    tags: ["iluminação", "segurança", "infraestrutura"],
    complaintsTotal: 763,
    supportCount: 2140,
    rejectCount: 68,
    scope: "NEIGHBORHOOD",
    location: { state: "CE", city: "Itapipoca", neighborhood: "Imperial" },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 120).toISOString(),
    lastComplaintAt: new Date(
      Date.now() - 1000 * 60 * 60 * 24 * 2
    ).toISOString(),
    exampleComplaints: [
      {
        author: "Cidadão 224",
        time: "há 2 dias",
        text: "A rua principal do Bairro Imperial está um breu total. Já liguei para a prefeitura e nada.",
      },
      {
        author: "Cidadão 512",
        time: "há 5 dias",
        text: "Poste em frente à minha casa queimado há mais de um mês. Crianças com medo de brincar na rua.",
      },
      {
        author: "Cidadão 931",
        time: "há 1 semana",
        text: "Pagamos iluminação pública e seguimos no escuro. Precisamos de solução urgente.",
      },
    ],
    contacts: [
      {
        title: "Secretaria de Infraestrutura",
        lines: ["Responsável: Carlos Alberto", "Email: infra@itapipoca.gov.br"],
      },
      {
        title: "Vereadora Maria Lúcia",
        lines: [
          "Gabinete: (88) 1234-5678",
          "Email: maria.lucia@camara.itapipoca.gov.br",
        ],
      },
    ],
    comments: [
      {
        id: "c1",
        author: { id: "u1", name: "Cidadão 778" },
        text: "Já fiz várias reclamações e nada de manutenção.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
      },
      {
        id: "c2",
        author: { id: "org1", name: "Equipe da Prefeitura" },
        text: "Equipe técnica programada para inspeção em até 5 dias úteis.",
        accent: "bg-purple-500/10 text-purple-500",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
      },
    ],
    peopleAffected: 1800,
    socialImpact: "Alto",
    detailedDescription: [
      "Moradores do Bairro Imperial relatam ruas às escuras há mais de três meses, o que aumenta riscos de assaltos, quedas e acidentes de trânsito. A falta de iluminação também dificulta o trabalho de empreendedores locais que dependem do fluxo noturno.",
      "Com a proximidade de escolas e postos de saúde, mães e idosos evitam circular após o pôr do sol, prejudicando o acesso a serviços básicos. A cada semana, novas reclamações chegam à plataforma, indicando que o problema está se agravando.",
    ],
    impactMetric: {
      label: "Vias sem iluminação adequada",
      value: 0.82,
      description:
        "82% das ruas do bairro relatadas pela comunidade continuam sem manutenção.",
    },
  },
  {
    id: "potholes",
    title: "Buracos e má conservação do asfalto na Avenida Central",
    summary:
      "Motoristas relatam danos mecânicos e riscos de acidente pela quantidade de crateras sem sinalização na principal via da cidade.",
    priority: "Média",
    status: "Político respondeu",
    statusKind: "politician",
    category: "Infraestrutura",
    tags: ["pavimentação", "trânsito", "obras"],
    complaintsTotal: 842,
    supportCount: 1550,
    rejectCount: 140,
    scope: "CITY",
    location: { state: "CE", city: "Itapipoca" },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 80).toISOString(),
    lastComplaintAt: new Date(
      Date.now() - 1000 * 60 * 60 * 24 * 5
    ).toISOString(),
    contacts: [
      {
        title: "Secretaria de Obras",
        lines: ["Responsável: Equipe técnica", "Email: obras@itapipoca.gov.br"],
      },
      {
        title: "Ouvidoria Municipal",
        lines: ["Telefone: 0800-000-0000", "Email: ouvidoria@itapipoca.gov.br"],
      },
    ],
    comments: [
      {
        id: "c3",
        author: { id: "org2", name: "Canal Oficial" },
        text: "Solicitação enviada, licitação do recapeamento em análise.",
        accent: "bg-blue-500/10 text-blue-500",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
      },
    ],
    peopleAffected: 2400,
    socialImpact: "Médio",
    detailedDescription: [
      "A Avenida Central é a principal ligação entre bairros residenciais e o centro comercial de Itapipoca. Buracos e remendos irregulares criam pontos perigosos que provocam danos em veículos e colocam pedestres em risco.",
      "O fluxo de ônibus escolares e ambulâncias também passa pela avenida. Moradores relatam atrasos em serviços essenciais e aumento de acidentes leves registrados pela guarda municipal.",
    ],
    impactMetric: {
      label: "Trechos críticos identificados",
      value: 0.64,
      description:
        "64% da avenida foi classificada como crítica pela comunidade.",
    },
  },
  {
    id: "transport",
    title: "Superlotação e atrasos no transporte público",
    summary:
      "Usuários enfrentam ônibus lotados acima da capacidade e atrasos médios de 25 minutos nos horários de pico, afetando trabalho e escolas.",
    priority: "Alta",
    status: "Não resolvido",
    statusKind: "unresolved",
    category: "Transporte",
    tags: ["ônibus", "pontualidade", "mobilidade"],
    complaintsTotal: 789,
    supportCount: 1240,
    rejectCount: 95,
    scope: "CITY",
    location: { state: "CE", city: "Itapipoca" },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(),
    lastComplaintAt: new Date(
      Date.now() - 1000 * 60 * 60 * 24 * 1
    ).toISOString(),
    contacts: [
      {
        title: "Secretaria de Transporte",
        lines: [
          "Responsável: Equipe de mobilidade",
          "Email: transporte@itapipoca.gov.br",
        ],
      },
    ],
    comments: [],
    peopleAffected: 5200,
    socialImpact: "Alto",
    detailedDescription: [
      "Usuários de todas as linhas urbanas relatam veículos operando lotados durante todo o dia. A falta de ônibus extras nos horários de pico gera atrasos médios de 25 minutos e torna o deslocamento inseguro.",
      "As principais reclamações vêm de trabalhadores da saúde e estudantes que dependem do transporte coletivo. Há relatos de pessoas desistindo de consultas e aulas devido à imprevisibilidade do serviço.",
    ],
    impactMetric: {
      label: "Linhas com superlotação",
      value: 0.75,
      description:
        "75% das linhas atendidas pela plataforma foram classificadas como superlotadas.",
    },
  },
  {
    id: "nursery",
    title: "Falta de vagas em creches municipais",
    summary:
      "Pais relatam fila de espera superior a 6 meses e ausência de previsão de ampliação das unidades da região central.",
    priority: "Baixa",
    status: "Não resolvido",
    statusKind: "unresolved",
    category: "Educação",
    tags: ["primeira infância", "assistência", "educação"],
    complaintsTotal: 214,
    supportCount: 320,
    rejectCount: 41,
    scope: "CITY",
    location: { state: "CE", city: "Itapipoca" },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    lastComplaintAt: new Date(
      Date.now() - 1000 * 60 * 60 * 24 * 7
    ).toISOString(),
    comments: [],
    peopleAffected: 960,
    socialImpact: "Médio",
    detailedDescription: [
      "As creches municipais do centro de Itapipoca operam com lotação máxima desde o início do ano letivo. Famílias aguardam mais de seis meses por vagas e precisam pagar instituições privadas ou improvisar cuidados.",
      "A ausência de novas unidades afeta principalmente responsáveis que precisam trabalhar durante o dia. O problema pressiona a rede de assistência social e reduz a renda média das famílias afetadas.",
    ],
    impactMetric: {
      label: "Famílias na fila de espera",
      value: 0.6,
      description:
        "60% das famílias cadastradas ainda aguardam uma vaga disponível.",
    },
  },
];

export function formatLocation(location: Topic["location"]) {
  const { neighborhood, city, state } = location;
  if (neighborhood && city) return `${neighborhood}, ${city} - ${state}`;
  if (city) return `${city} - ${state}`;
  return state;
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("pt-BR").format(value);
}

export function formatOpenDuration(dateString: string) {
  const created = new Date(dateString);
  const diffMs = Date.now() - created.getTime();
  const diffDays = Math.max(1, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
  if (diffDays < 30) {
    return `Em aberto há ${diffDays} dia${diffDays > 1 ? "s" : ""}`;
  }
  const months = Math.floor(diffDays / 30);
  if (months < 12) {
    return `Em aberto há ${months} mês${months > 1 ? "es" : ""}`;
  }
  const years = Math.floor(months / 12);
  return `Em aberto há ${years} ano${years > 1 ? "s" : ""}`;
}

export function formatRelativeDay(dateString: string) {
  const date = new Date(dateString);
  const diffMs = Date.now() - date.getTime();
  const diffDays = Math.max(0, Math.round(diffMs / (1000 * 60 * 60 * 24)));
  if (diffDays === 0) return "hoje";
  if (diffDays === 1) return "há 1 dia";
  if (diffDays < 30) return `há ${diffDays} dias`;
  const months = Math.floor(diffDays / 30);
  return `há ${months} mês${months > 1 ? "es" : ""}`;
}
