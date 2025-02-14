export interface Scene {
    id: number;
    name: string;
    duration: number;
  }
  
  export interface Transition {
    from: number;
    to: number;
    duration: number;
    name: string;
  }
  