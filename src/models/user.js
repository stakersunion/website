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
      signature: {
        value: { type: String },
        status: {
          type: String,
          enum: ['pending', 'approved', 'rejected'],
          default: 'pending',
        },
      },
      schedule: {
        value: { type: Date },
        status: {
          type: String,
          enum: ['pending', 'approved', 'rejected'],
          default: 'pending',
        },
      },
      photo: {
        value: { type: String },
        status: {
          type: String,
          enum: ['pending', 'approved', 'rejected'],
          default: 'pending',
        },
      },
      default: {},
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
        signature: {
          type: String,
          required: true,
        },
        schedule: {
          type: Date,
        },
        residential: {
          type: String,
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
        status: {
          type: String,
          enum: ['submitted', 'pending', 'approved', 'rejected'],
          default: 'submitted',
        },
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
