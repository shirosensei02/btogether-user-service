export class User {
  id: number;
  phone: string;
  password: string; // Hashed password
  role: 'user' | 'admin'; // Add role property
}
