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
        validators: [
          {
            index: {
              type: Number,
            },
            publicKey: {
              type: String,
            },
            valid: {
              type: Boolean,
            },
            performance: [
              {
                proposals: {
                  type: Number,
                },
                attestations: {
                  type: Number,
                },
                sync: {
                  type: Number,
                },
              },
            ],
            commitment: [
              {
                entry: {
                  type: String,
                  enum: ['genesis', 'pre-merge', 'post-merge'],
                },
              },
            ],
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
