import mongoose from 'mongoose'
import User from '@/models/user'

mongoose.connect(process.env.MONGO_URI)

async function migrateExecutionAndConsensusToClients() {
  try {
    // Fetch all users with existing execution and consensus fields
    const users = await User.find({
      'profile.execution': { $exists: true },
      'profile.consensus': { $exists: true },
    })

    // Iterate over each user and update their profile.clients array
    for (const user of users) {
      const execution = user.profile.execution
      const consensus = user.profile.consensus

      // Update the profile.clients array
      user.profile.clients = [
        {
          execution: execution || '',
          consensus: consensus || '',
        },
      ]

      // Remove the old fields
      user.profile.execution = undefined
      user.profile.consensus = undefined

      // Save the updated user document
      await user.save()
    }

    console.log(`Migrated ${users.length} users successfully.`)
  } catch (error) {
    console.error('Error during migration:', error)
  } finally {
    // Close the database connection
    mongoose.connection.close()
  }
}

migrateExecutionAndConsensusToClients()
