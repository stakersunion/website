'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Upload } from 'lucide-react'

const UploadCSV = () => {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState([])
  const [columns, setColumns] = useState([])
  const [selectedColumn, setSelectedColumn] = useState('')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [progress, setProgress] = useState(null)

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0]
    if (!selectedFile) return

    setFile(selectedFile)
    setError(null)
    setSuccess(false)

    // Read and preview the CSV with auto-detection
    const reader = new FileReader()
    reader.onload = (event) => {
      const csv = event.target.result
      const lines = csv.split('\n')
      
      // Auto-detect separator (comma or tab)
      const firstLine = lines[0]
      let separator = ','
      if (firstLine.includes('\t')) {
        separator = '\t'
      }
      
      const headers = lines[0].split(separator).map(h => h.trim().replace(/"/g, ''))
      const previewData = lines.slice(1, 6).map(line => {
        const values = line.split(separator).map(v => v.trim().replace(/"/g, ''))
        const row = {}
        headers.forEach((header, index) => {
          row[header] = values[index] || ''
        })
        return row
      })

      setColumns(headers)
      setPreview(previewData)
      setSelectedColumn(headers[0] || '')
    }
    reader.readAsText(selectedFile)
  }

  const handleUpload = async () => {
    if (!file || !selectedColumn) {
      setError('Please select a file and column')
      return
    }

    setUploading(true)
    setError(null)
    setSuccess(false)
    setProgress('Processing CSV...')

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('column', selectedColumn)

      const response = await fetch('/api/admin/stakecat/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Upload failed')
      }

      const result = await response.json()
      setSuccess(true)
      setProgress(null)
      setFile(null)
      setPreview([])
      setColumns([])
      setSelectedColumn('')
      
      // Refresh the table
      window.location.reload()
    } catch (err) {
      setError(err.message)
      setProgress(null)
    } finally {
      setUploading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload CSV</CardTitle>
        <CardDescription>Upload a CSV file to add eligible addresses</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="csv-file">CSV File</Label>
          <Input
            id="csv-file"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </div>

        {columns.length > 0 && (
          <div>
            <Label htmlFor="column-select">Select Address Column</Label>
            <Select value={selectedColumn} onValueChange={setSelectedColumn}>
              <SelectTrigger>
                <SelectValue placeholder="Select a column" />
              </SelectTrigger>
              <SelectContent>
                {columns.map((column) => (
                  <SelectItem key={column} value={column}>
                    {column}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {preview.length > 0 && (
          <div>
            <Label>Preview (first 5 rows)</Label>
            <div className="mt-2 border rounded p-2 max-h-40 overflow-y-auto">
              {preview.map((row, index) => (
                <div key={index} className="text-sm font-mono">
                  {row[selectedColumn] || '(empty)'}
                </div>
              ))}
            </div>
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {progress && (
          <Alert>
            <AlertDescription>{progress}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert>
            <AlertDescription>CSV uploaded successfully!</AlertDescription>
          </Alert>
        )}

        <Button
          onClick={handleUpload}
          disabled={!file || !selectedColumn || uploading}
          className="w-full"
        >
          {uploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload CSV
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

export default UploadCSV 