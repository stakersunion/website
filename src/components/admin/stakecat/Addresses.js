'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { Loader2, Trash2 } from 'lucide-react'

const Addresses = () => {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState(null)
  const [deleteSuccess, setDeleteSuccess] = useState(false)

  const fetchCount = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/stakecat')
      if (!response.ok) {
        throw new Error('Failed to fetch address count')
      }
      const data = await response.json()
      setCount(data.count || 0)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAll = async () => {
    setDeleting(true)
    setDeleteError(null)
    setDeleteSuccess(false)

    try {
      const response = await fetch('/api/admin/stakecat', {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Delete failed')
      }

      setDeleteSuccess(true)
      setCount(0)
    } catch (err) {
      setDeleteError(err.message)
    } finally {
      setDeleting(false)
    }
  }

  useEffect(() => {
    fetchCount()
  }, [])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Eligible Addresses</CardTitle>
          <CardDescription>Addresses uploaded from CSV files</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className='h-4 w-full' />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Eligible Addresses</CardTitle>
          <CardDescription>Addresses uploaded from CSV files</CardDescription>
        </CardHeader>
        <CardContent>
          <p className='text-red-500'>Error: {error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Eligible Addresses</CardTitle>
        <CardDescription>
          {count.toLocaleString()} addresses uploaded from CSV files
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {deleteError && (
          <Alert variant="destructive">
            <AlertDescription>{deleteError}</AlertDescription>
          </Alert>
        )}

        {deleteSuccess && (
          <Alert>
            <AlertDescription>All addresses deleted successfully!</AlertDescription>
          </Alert>
        )}

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" disabled={deleting || count === 0}>
              {deleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete All Addresses
                </>
              )}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete all {count.toLocaleString()} eligible addresses from the database.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteAll} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Delete All
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  )
}

export default Addresses