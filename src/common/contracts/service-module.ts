export interface ServiceModule<T> {
  create: (data: any) => Promise<T>;
  update: (data: any) => Promise<T>;
  delete: (id: string) => Promise<void>;
  list: () => Promise<T[]>;
  get: (id: string) => Promise<T>;
}
