export interface BlogPost {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
}

export interface ApiResponse {
  posts: BlogPost[];
  total: number;
  skip: number;
  limit: number;
}