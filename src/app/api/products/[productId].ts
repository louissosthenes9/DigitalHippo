// pages/api/products/[productId].ts
import { NextApiRequest, NextApiResponse } from 'next'
import { getPayloadClient } from '@/get-payload'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { productId } = req.query

  try {
    const payload = await getPayloadClient({})
    const response = await payload.find({
      collection: "products",
      limit: 1,
      where: {
        id: {
          equals: productId
        },
        approvedForSale: {
          equals: "approved",
        }
      }
    })

    const [product] = response.docs

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.status(200).json(product)
  } catch (error) {
    console.error('Error fetching product:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}