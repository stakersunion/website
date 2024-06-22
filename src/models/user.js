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
        require: true,
      },
      name: {
        type: String,
      },
      email: {
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
          enum: ['incomplete', 'pending', 'approved', 'rejected'],
          default: 'incomplete',
        },
      },
      independent: {
        schedule: { type: Date },
        status: {
          type: String,
          enum: ['incomplete', 'pending', 'approved', 'rejected'],
          default: 'incomplete',
        },
      },
      residential: {
        photo: { type: String },
        status: {
          type: String,
          enum: ['incomplete', 'pending', 'approved', 'rejected'],
          default: 'incomplete',
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
          enum: ['withdrawal', 'deposit'],
          required: true,
        },
        validators: [
          {
            index: {
              type: Number,
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
