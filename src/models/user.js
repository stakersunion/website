import mongoose from 'mongoose'
import toJSON from '@/models/plugins/toJSON'

const userSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      require: true,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    multipliers: [
      {
        location: {
          type: String,
          enum: ['home', 'remote'],
        },
      },
    ],
    addresses: [
      {
        address: {
          type: String,
        },
        type: {
          type: String,
          enum: ['withdrawal', 'deposit'],
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
              {
                kzg: {
                  type: Boolean,
                },
              },
            ],
          },
        ],
        status: {
          type: String,
          enum: ['pending', 'approved', 'rejected'],
          default: 'pending',
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
