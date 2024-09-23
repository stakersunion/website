const executionOptions = [
  { value: 'geth', label: 'Geth' },
  { value: 'nethermind', label: 'Nethermind' },
  { value: 'besu', label: 'Besu' },
  { value: 'erigon', label: 'Erigon' },
  { value: 'reth', label: 'Reth' },
]
const consensusOptions = [
  { value: 'lighthouse', label: 'Lighthouse' },
  { value: 'lodestar', label: 'Lodestar' },
  { value: 'nimbus', label: 'Nimbus' },
  { value: 'prysm', label: 'Prysm' },
  { value: 'teku', label: 'Teku' },
]
const regionOptions = ['North America', 'South America', 'Europe', 'Asia', 'Africa', 'Oceania']

export { executionOptions, consensusOptions, regionOptions }
