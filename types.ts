export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  isInitial?: boolean; // For special styling of the first greeting
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
}
