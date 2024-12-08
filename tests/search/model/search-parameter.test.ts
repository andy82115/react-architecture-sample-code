import { describe, it, expect } from 'vitest'
import { combineQueryString, QueryFilter, InWhere } from '../../../src/app/search/model/search-parameter'

describe('combineQueryString', () => {
  it('should generate query string with keyword', () => {
    const filter: QueryFilter = {
      keyword: 'ret',
      inWhere: InWhere.all,
      followers: 0,
      forks: 0,
      stars: 0,
      language: '',
    }

    const result = combineQueryString(filter)
    expect(result).toBe('ret')
  })

  it('should include "in:name" when inWhere is "name"', () => {
    const filter: QueryFilter = {
      keyword: 'ret',
      inWhere: InWhere.name,
      followers: 0,
      forks: 0,
      stars: 0,
      language: '',
    }

    const result = combineQueryString(filter)
    expect(result).toBe('ret+in:name')
  })

  it('should include "followers:>=10" when followers > 0', () => {
    const filter: QueryFilter = {
      keyword: 'ret',
      inWhere: InWhere.all,
      followers: 10,
      forks: 0,
      stars: 0,
      language: '',
    }

    const result = combineQueryString(filter)
    expect(result).toBe('ret+followers:>=10')
  })

  it('should include "forks:>=5" when forks > 0', () => {
    const filter: QueryFilter = {
      keyword: 'ret',
      inWhere: InWhere.all,
      followers: 0,
      forks: 5,
      stars: 0,
      language: '',
    }

    const result = combineQueryString(filter)
    expect(result).toBe('ret+forks:>=5')
  })

  it('should include "stars:>=10" when stars > 0', () => {
    const filter: QueryFilter = {
      keyword: 'ret',
      inWhere: InWhere.all,
      followers: 0,
      forks: 0,
      stars: 10,
      language: '',
    }

    const result = combineQueryString(filter)
    expect(result).toBe('ret+stars:>=10')
  })

  it('should include "language:js" when language is specified', () => {
    const filter: QueryFilter = {
      keyword: 'ret',
      inWhere: InWhere.all,
      followers: 0,
      forks: 0,
      stars: 0,
      language: 'js',
    }

    const result = combineQueryString(filter)
    expect(result).toBe('ret+language:js')
  })

  it('should combine all filters', () => {
    const filter: QueryFilter = {
      keyword: 'ret',
      inWhere: InWhere.name,
      followers: 10,
      forks: 5,
      stars: 10,
      language: 'js',
    }

    const result = combineQueryString(filter)
    expect(result).toBe('ret+in:name+followers:>=10+forks:>=5+stars:>=10+language:js')
  })

  it('should return an empty string if no filters are set', () => {
    const filter: QueryFilter = {
      keyword: '',
      inWhere: InWhere.all,
      followers: 0,
      forks: 0,
      stars: 0,
      language: '',
    }

    const result = combineQueryString(filter)
    expect(result).toBe('')
  })
})
