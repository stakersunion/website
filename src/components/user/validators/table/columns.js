import { createColumnHelper } from '@tanstack/react-table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { EthAddress } from '@/components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleMinus } from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'

const Pending = () => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <FontAwesomeIcon icon={faCircleMinus} />
      </TooltipTrigger>
      <TooltipContent>
        <p>This statistic has not yet been loaded for your validator.</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
)

const columnHelper = createColumnHelper()

const columns = [
  columnHelper.group({
    id: 'info',
    header: 'Validator Information',
    columns: [
      columnHelper.accessor('index', {
        header: 'Index',
      }),
      columnHelper.accessor('publicKey', {
        header: 'Public Key',
        cell: ({ row }) => {
          return <EthAddress address={row.original.publicKey} />
        },
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ row }) => {
          return row.original.status || <Pending />
        },
      }),
      columnHelper.accessor('activationEpoch', {
        header: 'Activation Epoch',
        cell: ({ row }) => {
          return row.original.activationEpoch || <Pending />
        },
      }),
    ],
  }),
  columnHelper.group({
    id: 'performance',
    header: 'Performance',
    columns: [
      columnHelper.accessor('attestations', {
        header: 'Attestations',
        cell: ({ row }) => {
          return row.original.performance.attestations || <Pending />
        },
      }),
      columnHelper.accessor('proposals', {
        header: 'Proposals',
        cell: ({ row }) => {
          return row.original.performance.proposals || <Pending />
        },
      }),
      columnHelper.accessor('sync', {
        header: 'Sync',
        cell: ({ row }) => {
          return row.original.performance.sync || <Pending />
        },
      }),
    ],
  }),
]

export default columns
