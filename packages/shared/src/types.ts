/** Generic API response wrapper */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/** Paginated API response */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  pageSize: number;
}

/** Example entity — rename/replace for your prototype */
export interface Item {
  id: string;
  name: string;
  description: string | null;
  status: "active" | "archived";
  createdAt: string;
  updatedAt: string;
}

export type CreateItemInput = Pick<Item, "name"> & {
  description?: string;
};

export type UpdateItemInput = Partial<CreateItemInput> & {
  status?: Item["status"];
};
