import { JSDOM } from 'jsdom'
import { NextApiRequest, NextApiResponse } from 'next'
const getDownloads = async (req: NextApiRequest, res: NextApiResponse) => {
  // Receive the input from the req body, parse from json
  // const body = JSON.parse(req.body)
  // const { input } = body

  const response = await fetch(`https://www.npmjs.com/package/react`)
  const html = await response.text()

  const dom = new JSDOM(html)
  const document = dom.window.document
  
  const downloads = document.querySelector( '._9ba9a726')?.textContent

  // Send downloads back to client
  res.status(200).json({downloads})
}

export default getDownloads;