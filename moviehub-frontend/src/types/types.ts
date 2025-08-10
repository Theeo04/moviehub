export interface Post {
    title?: string; // dacă vrei să fie opțional
    content: string;
    image?: File | null;
    date: string;
  }