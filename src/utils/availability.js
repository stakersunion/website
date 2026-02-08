const availabilityOptions = [
  {
    key: 'dvt',
    title: 'DVT Clustering',
    description: 'Available for distributed validator technology (Obol/SSV).',
    dashboardDescription: 'Obol/SSV participation',
  },
  {
    key: 'avs',
    title: 'AVS Operation',
    description: 'Available to operate AVSs (EigenLayer).',
    dashboardDescription: 'EigenLayer operators',
  },
  {
    key: 'clientTesting',
    title: 'Client Testing',
    description: 'Willing to test minority or new clients.',
    dashboardDescription: 'Minority and new clients',
  },
  {
    key: 'preconf',
    title: 'Preconfirmation',
    description: 'Available to participate in preconfirmation networks.',
    dashboardDescription: 'Preconf participation',
  },
  {
    key: 'testnet',
    title: 'Testnet Operations',
    description: 'Available to run validators and node infra on testnets.',
    dashboardDescription: 'Testnet validator operations',
  },
  {
    key: 'mevRelay',
    title: 'MEV / Relay Testing',
    description: 'Available to test MEV-Boost relay and builder integrations.',
    dashboardDescription: 'MEV and relay integrations',
  },
  {
    key: 'incidentResponse',
    title: 'Incident Response',
    description: 'Available for coordinated troubleshooting during outages.',
    dashboardDescription: 'Emergency troubleshooting',
  },
  {
    key: 'mentorship',
    title: 'Mentorship',
    description: 'Available to mentor newer operators in the union.',
    dashboardDescription: 'Operator onboarding support',
  },
]

const availabilityKeys = availabilityOptions.map((option) => option.key)

const defaultAvailability = availabilityKeys.reduce((acc, key) => {
  acc[key] = false
  return acc
}, {})

export { availabilityOptions, availabilityKeys, defaultAvailability }
