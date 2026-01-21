
import { Course, Student, Payment, BlogPost } from './types';

export const INITIAL_COURSES: Course[] = [
  {
    id: '1',
    title: 'UI/UX Design Masterclass 2024',
    instructor: 'Alex Rivera',
    price: 49.99,
    discountPrice: 39.99,
    rating: 4.8,
    students: 1250,
    category: 'Design',
    level: 'Beginner',
    status: 'Published',
    updatedAt: '2024-03-15',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=400',
    description: 'Master the art of user interface and experience design from scratch.'
  },
  {
    id: '2',
    title: 'Advanced React & TypeScript Patterns',
    instructor: 'Sarah Chen',
    price: 89.99,
    rating: 4.9,
    students: 840,
    category: 'Development',
    level: 'Advanced',
    status: 'Published',
    updatedAt: '2024-03-10',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=400',
    description: 'Deep dive into advanced React concepts and TypeScript integration.'
  }
];

export const MOCK_STUDENTS: Student[] = [
  { id: 's1', name: 'John Doe', email: 'john@example.com', enrolledCourses: ['1', '2'], joinDate: '2024-01-12', status: 'Active' },
  { id: 's2', name: 'Jane Smith', email: 'jane@example.com', enrolledCourses: ['1'], joinDate: '2024-02-05', status: 'Active' },
  { id: 's3', name: 'Mike Ross', email: 'mike@pearson.com', enrolledCourses: ['2'], joinDate: '2024-03-01', status: 'Suspended' }
];

export const MOCK_PAYMENTS: Payment[] = [
  { id: 'p1', studentId: 's1', studentName: 'John Doe', amount: 39.99, status: 'Success', method: 'Card', date: '2024-03-14', transactionId: 'TXN_9823472' },
  { id: 'p2', studentId: 's2', studentName: 'Jane Smith', amount: 49.99, status: 'Success', method: 'UPI', date: '2024-03-12', transactionId: 'TXN_1209384' },
  { id: 'p3', studentId: 's3', studentName: 'Mike Ross', amount: 89.99, status: 'Failed', method: 'Wallet', date: '2024-03-11', transactionId: 'TXN_4455210' }
];

export const BLOG_POSTS: BlogPost[] = [
  { 
    id: 'b1',
    title: "The Future of AI in Creative Design", 
    excerpt: "Exploring how generative AI is transforming the landscape for UI/UX designers and creative professionals in 2024.",
    content: "The landscape of design is shifting rapidly with the introduction of generative AI tools. These technologies are not replacing designers but augmenting their capabilities, allowing for faster prototyping, personalized user experiences, and unprecedented creative exploration. In this article, we dive deep into the tools that are defining the next era of digital creation...",
    date: "OCT 12, 2024", 
    author: "Alex Rivera",
    category: "Design",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800" 
  },
  { 
    id: 'b2',
    title: "10 Steps to Landing Your First Dev Job", 
    excerpt: "A comprehensive guide for bootcamp graduates and self-taught developers to navigate the current tech market.",
    content: "Landing that first role in tech requires more than just knowing how to code. It's about networking, building a brand, and understanding how to solve business problems with technical solutions. We outline the 10 most effective strategies used by successful junior developers to break into the industry during a competitive year...",
    date: "SEP 28, 2024", 
    author: "Sarah Chen",
    category: "Career",
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800" 
  },
  { 
    id: 'b3',
    title: "Mastering Color Theory in Web Apps", 
    excerpt: "How to use psychology and accessibility standards to create stunning, functional color palettes for digital products.",
    content: "Color is one of the most powerful tools in a designer's arsenal. It influences mood, directs attention, and communicates brand values without a single word. However, many developers struggle with creating cohesive palettes that are also WCAG compliant. This guide breaks down the science of color and how to apply it practically...",
    date: "SEP 15, 2024", 
    author: "Marcus Thorne",
    category: "Design",
    img: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=800" 
  },
  {
    id: 'b4',
    title: "The Rise of No-Code Tools in Enterprise",
    excerpt: "Why large corporations are adopting no-code and low-code solutions to speed up internal development cycles.",
    content: "Enterprise software development is traditionally slow and expensive. No-code and low-code platforms are changing the game by empowering non-technical staff to build functional prototypes and internal tools. We explore how major firms are leveraging these technologies to stay agile and reduce the burden on their IT departments...",
    date: "AUG 22, 2024",
    author: "Emily Watson",
    category: "Tech",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
  }
];
