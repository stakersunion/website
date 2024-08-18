import mongoose from 'mongoose'
import toJSON from '@/models/plugins/toJSON'

const newsSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    link: {
      type: String,
    },
    linkTitle: {
      type: String,
      default: 'Read More',
    },
    archived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)

newsSchema.plugin(toJSON)
export default mongoose.models.News || mongoose.model('News', newsSchema)
