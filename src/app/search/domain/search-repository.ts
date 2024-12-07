import { SearchResponse } from '../../../share/api/model/search-response'
import { SearchParam } from '../model/search-parameter'

export type SearchRepository = {
  getRepositoryList: (param: SearchParam) => Promise<SearchResponse>
}
