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
          enum: ['pending', 'approved', 'rejected'],
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
          enum: ['solo', 'rocketpool', 'dvt'],
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
