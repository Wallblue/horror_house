export interface Room{
  id: number;
  name: string;
  description: string;
};

export interface RoomPost{
  id?: number;
  name: string;
  description: string;
};

export interface RoomPatch{
  id?: number;
  name? :string;
  description?: string;
};