import mongoose from 'mongoose'
import toJSON from '@/models/plugins/toJSON'

const userSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    profile: {
      address: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      discord: {
        type: String,
      },
      withdrawalAddress: {
        type: String,
      },
      poapAssigned: {
        type: Boolean,
        default: false,
      },
      discordRole: {
        type: Boolean,
        default: false,
      },
      clients: {
        type: [
          {
            execution: {
              type: String,
              enum: ['geth', 'nethermind', 'besu', 'erigon', 'reth', ''],
              default: '',
            },
            consensus: {
              type: String,
              enum: ['lighthouse', 'lodestar', 'nimbus', 'prysm', 'teku', ''],
              default: '',
            },
          },
        ],
        default: [
          {
            execution: '',
            consensus: '',
          },
        ],
      },
      region: {
        type: String,
        enum: ['North America', 'South America', 'Europe', 'Asia', 'Africa', 'Oceania'],
      },
      availability: {
        dvt: {
          type: Boolean,
          default: false,
        },
        avs: {
          type: Boolean,
          default: false,
        },
        clientTesting: {
          type: Boolean,
          default: false,
        },
        preconf: {
          type: Boolean,
          default: false,
        },
      },
    },
    appeal: {
      address: {
        type: String,
      },
      type: {
        type: String,
        enum: ['deposit', 'withdrawal', 'fee-recipient'],
      },
      method: {
        type: String,
        enum: [
          'home',
          'rocketpool',
          'allnodes',
          'ssv',
          'stakefish',
          'abyss',
          'sensei',
          'chainlabo',
          'squid',
          'other',
        ],
      },
      rationale: {
        type: String,
      },
      status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
      },
    },
    multipliers: [
      {
        location: {
          type: String,
          enum: ['home', 'remote'],
        },
      },
    ],
    verification: {
      eligibility: {
        signature: { type: String },
        status: {
          type: String,
          enum: ['pending', 'approved', 'rejected'],
        },
      },
      independent: {
        schedule: { type: Date },
        status: {
          type: String,
          enum: ['pending', 'approved', 'rejected'],
        },
      },
      residential: {
        photo: { type: String },
        status: {
          type: String,
          enum: ['pending', 'approved', 'rejected', 'ineligible'],
        },
      },
    },
    addresses: [
      {
        address: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          enum: ['deposit', 'withdrawal', 'fee-recipient'],
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        validators: [
          {
            index: {
              type: Number,
              required: true,
            },
            publicKey: {
              type: String,
              required: true,
            },
            type: {
              type: String,
              enum: ['solo', 'rocketpool', 'dvt'],
            },
            status: {
              type: String,
            },
            activationEpoch: {
              type: Number,
            },
            performance: {
              attestations: {
                type: Number,
              },
              proposals: {
                type: Number,
              },
              sync: {
                type: Number,
              },
            },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)

userSchema.plugin(toJSON)
export default mongoose.models.User || mongoose.model('User', userSchema)
