export function computeChance(dropRate: number, nrAttempts: number): number {
  const p = normalizeDropRate(dropRate)
  const n = Math.round(nrAttempts)

  if (n <= 0 || p <= 0) return 0

  return 100 - 100 * Math.pow(1 - p, n)
}

export function computePercentile(
  dropRate: number,
  percentile: number,
): number {
  const p = normalizeDropRate(dropRate)
  const perc = percentile / 100

  let lower = 0
  let upper = Number.MAX_SAFE_INTEGER
  let res

  do {
    res = Math.floor((lower + upper) / 2)
    if (1 - Math.pow(1 - p, res) < perc) {
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
