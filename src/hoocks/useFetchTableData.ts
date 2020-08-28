import { updateLocationWithQuery } from '@/utils/utils';
import { useEffect } from 'react';
import { useRequest } from '@umijs/hooks';
import useInitialState from '@/hoocks/useInitialState';
import { QueryParamsDebtListTypes } from '@/pages/Accounting';

export interface QueryParamsType extends QueryParamsDebtListTypes {
  num_page?: number | string;
  page_size?: number | string;
  filters?: any;
}

type FetchDataType = (
  token: string,
  queryPrams: QueryParamsType,
) => Promise<{ list: any[]; total: number }>;

interface ConfigTypes {
  query?: QueryParamsType;
  setQueryParams?: any;
  manual?: boolean;
  history?: any;
}

const useFormTable = (
  fetchData: FetchDataType,
  { query, setQueryParams, manual, history }: ConfigTypes,
) => {
  const { token } = useInitialState();
  const { tableProps, params, run, refresh, data, loading } = useRequest(
    ({ current, pageSize, sorter: s }: any) => {
      const queryPrams: QueryParamsType = { ...query, current, pageSize };
      setQueryParams({ ...query, current, pageSize });
      if (s?.order) {
        setQueryParams({
          ...query,
          sorter: `${s.field} ${s.order}`,
        });
        queryPrams.sorter = `${s.field} ${s.order}`;
      }
      return fetchData(token as string, queryPrams).then((res: any) => ({
        list: res.data.list,
        total: res.data.pagination.total,
      }));
    },
    { manual, paginated: true },
  );

  useEffect(() => {
    if (history && !tableProps?.loading) {
      updateLocationWithQuery(history, query as QueryParamsType);
    }
  }, [tableProps?.loading]);

  const handleFilterTable = (key: string) => (result: string | any) => {
    setQueryParams({
      ...query,
      [key]: typeof result !== 'string' ? result.target.value : result,
    });
  };

  return {
    tableProps,
    fetchData: run,
    params,
    handleFilterTable,
    refresh,
    data,
    loading,
  };
};

export default useFormTable;
