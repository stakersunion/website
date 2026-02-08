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
const languageOptions = [
  { value: 'english', label: 'English' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'portuguese', label: 'Portuguese' },
  { value: 'french', label: 'French' },
  { value: 'german', label: 'German' },
  { value: 'italian', label: 'Italian' },
  { value: 'mandarin', label: 'Mandarin' },
  { value: 'hindi', label: 'Hindi' },
  { value: 'japanese', label: 'Japanese' },
  { value: 'korean', label: 'Korean' },
  { value: 'arabic', label: 'Arabic' },
  { value: 'russian', label: 'Russian' },
  { value: 'other', label: 'Other' },
]
const contactMethodOptions = [
  { value: 'email', label: 'Email' },
  { value: 'discord', label: 'Discord' },
  { value: 'telegram', label: 'Telegram' },
  { value: 'signal', label: 'Signal' },
  { value: 'whatsapp', label: 'WhatsApp' },
]
const osOptions = [
  { value: 'linux', label: 'Linux' },
  { value: 'macos', label: 'macOS' },
  { value: 'windows', label: 'Windows' },
  { value: 'bsd', label: 'BSD' },
  { value: 'other', label: 'Other' },
]
const toolingOptions = [
  { value: 'dappnode', label: 'Dappnode' },
  { value: 'avado', label: 'Avado' },
  { value: 'eth-docker', label: 'eth-docker' },
  { value: 'stereum', label: 'Stereum' },
  { value: 'rocketpool-smartnode', label: 'Rocket Pool Smartnode' },
  { value: 'docker-compose', label: 'Docker Compose' },
  { value: 'ansible', label: 'Ansible' },
  { value: 'kubernetes', label: 'Kubernetes' },
  { value: 'homebrew', label: 'Homebrew' },
  { value: 'other', label: 'Other' },
]

export {
  executionOptions,
  consensusOptions,
  regionOptions,
  languageOptions,
  contactMethodOptions,
  osOptions,
  toolingOptions,
}
