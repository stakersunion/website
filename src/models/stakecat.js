import mongoose from 'mongoose'
import toJSON from '@/models/plugins/toJSON'

const stakecatSchema = mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    source: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)

// Create compound index for address uniqueness
stakecatSchema.index({ address: 1 }, { unique: true })

stakecatSchema.plugin(toJSON)

export default mongoose.models.StakeCat || mongoose.model('StakeCat', stakecatSchema) 