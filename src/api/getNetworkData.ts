import { NetworkData } from '../types/NetworkData'
import { Transaction } from '../types/Transactions'

export const getNetworkData = async <T extends Transaction>(
  url: string,
): Promise<{ data: NetworkData<T> | null; error: Error | null }> => {
  const res = await fetch(url)

  if (res.status === 200) {
    const data: NetworkData<T> = await res.json()
    return { data, error: null }
  }

  const error = Error('Cannot get Network Data: Unexpected response status')
  return { data: null, error }
}
