import { updateLocationWithQuery } from '@/utils/utils';
import { useCallback } from 'react';
import { useRequest } from '@umijs/hooks';
import useInitialState from '@/hoocks/useInitialState';
import { QueryParamsDebtListTypes } from '@/pages/Table';

export interface QueryParamsType extends QueryParamsDebtListTypes {
  num_page?: number | string;
  page_size?: number | string;
  currentPage?: number | string;
  filters?: any;
}

interface ActionsType {
  fetchData: (
    token: string,
    queryPrams: QueryParamsType,
  ) => Promise<{ list: any[]; total: number }>;
  createItem?: (token: string, params: Object) => Promise<{ status: string; description: string }>;
  updateItem?: (token: string, params: Object) => Promise<{ status: string; description: string }>;
  removeItem?: (token: string, params: Object) => Promise<{ status: string; description: string }>;
}

interface ConfigTypes {
  query?: QueryParamsType;
  setQueryParams?: <T extends object>(value: T) => void;
  history?: unknown;
  refreshDeps?: string[];
}

const useHandleTableData = (
  { fetchData, createItem, updateItem, removeItem }: ActionsType,
  config: ConfigTypes = {},
) => {
  const { token } = useInitialState();
  const { query = {}, setQueryParams, history, refreshDeps } = config;

  const handleRequestFetchTableData = useCallback(
    ({ current, pageSize, sorter: s }) => {
      const queryPrams = {
        ...query,
        current: current || query.current,
        pageSize: pageSize || query.pageSize,
      };
      if (setQueryParams) {
        setQueryParams({
          ...query,
          current: current || query.current,
          pageSize: pageSize || query.pageSize,
        });
      }

      if (s?.order && setQueryParams) {
        setQueryParams({
          ...query,
          sorter: `${s.field} ${s.order}`,
        });
        queryPrams.sorter = `${s.field} ${s.order}`;
      }

      return fetchData(token as string, queryPrams);
    },
    [query],
  );

  const { tableProps, run, refresh, data, loading } = useRequest(handleRequestFetchTableData, {
    paginated: true,
    refreshDeps,
    onSuccess: () => {
      if (history) {
        updateLocationWithQuery(history, query as QueryParamsType);
      }
    },
  });

  const create = useRequest((params: Object) => createItem && createItem(token as string, params), {
    manual: true,
    onSuccess: (result) => {
      if (result.status === 'ok') {
        refresh();
      }
    },
  });

  const update = useRequest((params: Object) => updateItem && updateItem(token as string, params), {
    manual: true,
    onSuccess: (result) => {
      if (result.status === 'ok') {
        refresh();
      }
    },
  });

  const remove = useRequest((params: Object) => removeItem && removeItem(token as string, params), {
    manual: true,
    onSuccess: (result) => {
      if (result.status === 'ok') {
        refresh();
      }
    },
  });

  const handleFilterTable = (key: string) => (result: string | any) => {
    if (setQueryParams) {
      setQueryParams({
        ...query,
        [key]: typeof result !== 'string' ? result.target.value : result,
      });
    }
  };

  return {
    tableProps,
    fetchData: run,
    fetchLoading: loading,
    handleFilterTable,
    refresh,
    data,
    handleCreateItem: create.run,
    createLoading: create.loading,
    handleUpdateItem: update.run,
    updateLoading: update.loading,
    handleRemoveItem: remove.run,
    removeLoading: remove.loading,
  };
};

export default useHandleTableData;
