export function computeChance(dropRate: number | null, nrAttempts: number | null): number | null {
  if (dropRate === null || nrAttempts === null) {
    return null
  }

  const p = normalizeDropRate(dropRate)
  const n = Math.round(nrAttempts)

  if (n <= 0 || p <= 0) {
    return 0
  }

  return 100 - 100 * Math.pow(1 - p, n)
}

export function computePercentiles(dropRate: number | null): {
  p95: number | null
  p99: number | null
} {
  if (dropRate === null) {
    return { p95: null, p99: null }
  }

  if (dropRate <= 0) {
    return { p95: Infinity, p99: Infinity }
  }

  return {
    p95: computePercentile(dropRate, 0.95),
    p99: computePercentile(dropRate, 0.99),
  }
}

function computePercentile(dropRate: number, percentile: number): number {
  const p = normalizeDropRate(dropRate)

  let lower = 0
  let upper = Number.MAX_SAFE_INTEGER
  let res

  do {
    res = Math.floor((lower + upper) / 2)
    if (1 - Math.pow(1 - p, res) < percentile) {
      lower = res
    } else {
      upper = res
    }
  } while (lower < upper - 1)

  return res
}

function normalizeDropRate(dropRate: number): number {
  return (dropRate <= 0 ? 0 : dropRate >= 100 ? 100 : dropRate) / 100
}
