import mongoose from 'mongoose'
import toJSON from '@/models/plugins/toJSON'

const queueSchema = mongoose.Schema(
  {
    recipient: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    subject: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      default: '',
    },
    linkTitle: {
      type: String,
      default: 'Read More',
    },
    status: {
      type: String,
      enum: ['pending', 'sent', 'failed'],
      default: 'pending',
    },
    sentAt: {
      type: Date,
      default: null,
    },
    // Optionally store any error message if sending fails
    errorMessage: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)

queueSchema.plugin(toJSON)

export default mongoose.models.Queue || mongoose.model('Queue', queueSchema)
