import { Category } from '../types/task';

export interface Quote {
  content: string;
  author: string;
}

interface QuotableResponse {
  content: string;
  author: string;
}



const FALLBACK_QUOTES: Quote[] = [
  { content: 'A disciplina é a ponte entre metas e realizações.', author: 'Jim Rohn' },
  { content: 'O sucesso é a soma de pequenos esforços repetidos dia após dia.', author: 'Robert Collier' },
  { content: 'Acredite que você pode e você já está na metade do caminho.', author: 'Theodore Roosevelt' },
  { content: 'A única maneira de fazer um ótimo trabalho é amar o que você faz.', author: 'Steve Jobs' },
  { content: 'Não importa o quão devagar você vá, desde que não pare.', author: 'Confúcio' },
];

/* ================= CATEGORIES ================= */

const DEFAULT_CATEGORIES: Category[] = [
  { name: 'Trabalho', icon: '💼' },
  { name: 'Estudos', icon: '📚' },
  { name: 'Projetos', icon: '🚀' },
  { name: 'Saúde', icon: '🏃‍♂️' },
  { name: 'Financeiro', icon: '💰' },
  { name: 'Casa', icon: '🏠' },
  { name: 'Compras', icon: '🛒' },
  { name: 'Social', icon: '🎉' },
  { name: 'Pessoal', icon: '🧠' },
];

/* ================= API ================= */

export const api = {

  async getMotivationalQuote(): Promise<Quote> {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);

      const response = await fetch('https://api.quotable.io/random?maxLength=120', {
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!response.ok) throw new Error('API error');

      const data = (await response.json()) as QuotableResponse;

      return {
        content: data.content,
        author: data.author,
      };

    } catch {
      return FALLBACK_QUOTES[
        Math.floor(Math.random() * FALLBACK_QUOTES.length)
      ];
    }
  },

  async getCategories(): Promise<Category[]> {
    return DEFAULT_CATEGORIES;
  },

};