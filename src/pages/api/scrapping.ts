// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import puppeteer from 'puppeteer'
import { load } from 'cheerio'

const testUrl = 'https://www.kabum.com.br/hardware/processadores'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method
  if (method === 'GET') {
    const browser = await puppeteer.launch();
    const page = await browser.newPage()
    await page.goto(testUrl)
    const html = await page.content()

    const $ = load(html)

    const products: any[] = []

    $('.productCard').each((i, el) => {
      const title = $('.nameCard', el).text()
      const price = $('.priceCard', el).text()
      const link = 'https://www.kabum.com.br' + $('.htpbqG', el).attr('href')
      products.push({title, price, link})
    })

    res.status(200).json(products)
  } else {
    res.send('Method not allowed')
  }
}
