import { useApi } from '~/core/api/useApi';

import type { ExampleItem } from '../types/example.types';

const POSTS_ENDPOINT = 'https://jsonplaceholder.typicode.com/posts';

export const useExampleService = () => {
  const api = useApi();

  const getItems = async () => {
    return api.get<ExampleItem[]>(POSTS_ENDPOINT, {
      key: POSTS_ENDPOINT,
      server: true,
      dedupe: 'cancel',
      default: () => [],
    });
  };

  const getItemById = async (id: number) => {
    return api.get<ExampleItem>(`${POSTS_ENDPOINT}/${id}`, {
      key: `${POSTS_ENDPOINT}/${id}`,
      server: true,
      dedupe: 'cancel',
    });
  };

  const createItem = () => {
    return api.post<ExampleItem>(POSTS_ENDPOINT);
  };

  const updateItem = (id: number) => {
    return api.put<ExampleItem>(`${POSTS_ENDPOINT}/${id}`);
  };

  const deleteItem = (id: number) => {
    return api.delete<Record<string, never>>(`${POSTS_ENDPOINT}/${id}`);
  };

  return {
    getItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem,
  };
};
