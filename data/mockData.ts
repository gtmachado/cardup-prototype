export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  available: boolean;
}

export interface MenuSection {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  email: string;
  logo: string;
  banner: string;
  active: boolean;
  sections: MenuSection[];
}

const pizzaImages = [
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
];

const burgerImages = [
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop",
];

const drinkImages = [
  "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&h=300&fit=crop",
];

const dessertImages = [
  "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop",
];

export const mockRestaurants: Restaurant[] = [
  {
    id: "1",
    name: "La Brasa Gourmet",
    slug: "la-brasa-gourmet",
    email: "brasagourmet@gmail.com",
    logo: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop&crop=center",
    banner: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=1200&h=400&fit=crop",
    active: true,
    sections: [
      {
        id: "s1",
        name: "Pizzas Salgadas",
        items: [
          {
            id: "i1",
            name: "Pizza de Frango com Catupiry",
            description: "Frango desfiado temperado na brasa, coberto com catupiry cremoso e orégano fresco.",
            price: 46.90,
            image: pizzaImages[0],
            available: true,
          },
          {
            id: "i2",
            name: "Pizza Margherita Gourmet",
            description: "Molho de tomate italiano, muçarela de búfala e manjericão.",
            price: 42.90,
            image: pizzaImages[1],
            available: true,
          },
          {
            id: "i3",
            name: "Pizza Quatro Queijos",
            description: "Muçarela, gorgonzola, parmesão e provolone.",
            price: 49.90,
            image: pizzaImages[2],
            available: true,
          },
          {
            id: "i4",
            name: "Pizza La Brasa Especial",
            description: "Picanha desfiada, barbecue artesanal e cebola caramelizada.",
            price: 54.90,
            image: pizzaImages[3],
            available: true,
          },
        ],
      },
      {
        id: "s2",
        name: "Hambúrgueres",
        items: [
          {
            id: "i5",
            name: "Smash Burger Clássico",
            description: "Dois smash de blend bovino, queijo cheddar, cebola caramelizada e molho especial.",
            price: 38.90,
            image: burgerImages[0],
            available: true,
          },
          {
            id: "i6",
            name: "Burger Bacon Supreme",
            description: "Blend 180g, bacon crocante, queijo prato, alface, tomate e maionese da casa.",
            price: 42.90,
            image: burgerImages[1],
            available: true,
          },
          {
            id: "i7",
            name: "Chicken Crispy Burger",
            description: "Frango empanado crocante, coleslaw, picles e molho ranch.",
            price: 36.90,
            image: burgerImages[2],
            available: true,
          },
        ],
      },
      {
        id: "s3",
        name: "Bebidas",
        items: [
          {
            id: "i8",
            name: "Suco Natural",
            description: "Laranja, limão, maracujá ou abacaxi - 500ml.",
            price: 14.90,
            image: drinkImages[0],
            available: true,
          },
          {
            id: "i9",
            name: "Milkshake",
            description: "Chocolate, morango ou baunilha - 400ml.",
            price: 22.90,
            image: drinkImages[1],
            available: true,
          },
          {
            id: "i10",
            name: "Refrigerante",
            description: "Coca-Cola, Guaraná, Sprite - lata 350ml.",
            price: 8.90,
            image: drinkImages[2],
            available: true,
          },
        ],
      },
      {
        id: "s4",
        name: "Sobremesas",
        items: [
          {
            id: "i11",
            name: "Petit Gâteau",
            description: "Bolo quente de chocolate com sorvete de baunilha.",
            price: 32.90,
            image: dessertImages[0],
            available: true,
          },
          {
            id: "i12",
            name: "Cheesecake de Frutas Vermelhas",
            description: "Cheesecake cremoso com calda de frutas vermelhas frescas.",
            price: 28.90,
            image: dessertImages[1],
            available: true,
          },
          {
            id: "i13",
            name: "Brownie com Sorvete",
            description: "Brownie de chocolate belga com sorvete e calda quente.",
            price: 26.90,
            image: dessertImages[2],
            available: true,
          },
        ],
      },
    ],
  },
];

export const mockAdmin = {
  email: "admin@cardup.com",
  password: "123456",
};
