import { FetchProducts, UseProductsReturn, UseProductsState } from '~/composables/useProducts/types';
import { sdk } from '~/sdk';
import { FacetSearchCriteria } from '../../../../../plentymarkets-sdk/packages/api-client';

/**
 * @description Composable for managing products.
 * @returns {@link UseProducts}
 * @example
 * const { data, loading, fetchProducts } = useProducts();
 */
export const useProducts: UseProductsReturn = () => {
  const state = useState<UseProductsState>('products', () => ({
    data: null,
    loading: false,
  }));

  /**
   * @description Function for fetching products.
   * @example
   * getFacet(@props: FacetSearchCriteria)
   */
  const fetchProducts: FetchProducts = async (slug: FacetSearchCriteria) => {
    state.value.loading = true;
    const { data, error } = await useAsyncData(() => sdk.commerce.getFacet(slug));
    useHandleError(error.value);
    state.value.data = data.value?.data;
    state.value.loading = false;
    return data;
  };

  return {
    fetchProducts,
    ...toRefs(state.value),
  };
};
