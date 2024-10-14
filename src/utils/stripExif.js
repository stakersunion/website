import dynamic from 'next/dynamic'

const heic2any = dynamic(() => import('heic2any'), { ssr: false })

const stripEXIF = async (file) => {
  try {
    let convertedFile = file

    // Check if the file is .heic and convert it
    if (file.type === 'image/heic' || file.name.endsWith('.heic')) {
      const blob = await heic2any({ blob: file, toType: 'image/jpeg' })
      convertedFile = new File([blob], file.name.replace('.heic', '.jpg'), {
        type: 'image/jpeg',
      })
    }

    // Step 1: Read the file using FileReader
    const reader = new FileReader()
    const dataURL = await new Promise((resolve, reject) => {
      reader.onload = (event) => resolve(event.target.result)
      reader.onerror = () => reject(new Error('Failed to read file'))
      reader.readAsDataURL(convertedFile)
    })

    // Step 2: Load the image
    const img = new Image()
    img.src = dataURL
    await new Promise((resolve, reject) => {
      img.onload = resolve
      img.onerror = () => reject(new Error('Failed to load image'))
    })

    // Step 3: Draw the image onto a canvas
    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0)

    // Step 4: Convert the canvas content to a Blob
    const blob = await new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob)
        else reject(new Error('Failed to create blob from canvas'))
      }, 'image/jpeg') // Ensure consistent output format
    })

    // Step 5: Return the new File with stripped metadata
    return new File([blob], convertedFile.name, { type: 'image/jpeg' })
  } catch (error) {
    console.error('Error stripping EXIF:', error)
    throw error
  }
}

export default stripEXIF
