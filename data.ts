const complaints = [
  {
    id: 1,
    title: "Falta de iluminação pública no Bairro Imperial",
    category: "Iluminação",
    priority: "Alta",
    description:
      "Moradores relatam aumento da insegurança devido a postes de luz queimados e ruas completamente escuras durante a noite, dificultando a locomoção.",
    votes: 2100,
    comments: 3,
    status: "resolved",
  },
  {
    id: 2,
    title: "Buracos e má conservação do asfalto na Avenida Central",
    category: "Infraestrutura",
    priority: "Média",
    description:
      "Condutores enfrentam riscos de acidentes e danos aos veículos devido a grande quantidade de buracos não sinalizados na principal avenida da cidade.",
    votes: 1500,
    comments: 1,
    status: "inProgress",
  },
  {
    id: 3,
    title: "Superlotação e atrasos no transporte público",
    category: "Transporte",
    priority: "Alta",
    description:
      "Usuários do sistema de ônibus relatam atrasos constantes e superlotação nos horários de pico, comprometendo a qualidade e segurança do serviço.",
    votes: 1200,
    comments: 0,
    status: "pending",
  },
  {
    id: 4,
    title: "Falta de vagas em creches municipais",
    category: "Educação",
    priority: "Baixa",
    description:
      "Pais relatam dificuldade em conseguir vagas em creches municipais para seus filhos, especialmente nas regiões periféricas da cidade.",
    votes: 890,
    comments: 0,
    status: "pending",
  },
];

const categories = [
  "Todos",
  "Saúde",
  "Segurança",
  "Transporte",
  "Infraestrutura",
  "Educação",
];

export { complaints, categories };
